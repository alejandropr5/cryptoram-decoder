import io
import json
from typing import Any, Union
from sse_starlette.sse import (
    EventSourceResponse,
    _log,
    SendTimeoutError,
    ServerSentEvent
)
import anyio
from starlette.types import Send


class JsonServerSentEvent(ServerSentEvent):
    def encode(self) -> bytes:
        buffer = io.StringIO()
        if self.comment is not None:
            for chunk in self.LINE_SEP_EXPR.split(str(self.comment)):
                buffer.write(f": {chunk}")
                buffer.write(self._sep)

        if self.id is not None:
            buffer.write(self.LINE_SEP_EXPR.sub("", f"id: {self.id}"))
            buffer.write(self._sep)

        if self.event is not None:
            buffer.write(self.LINE_SEP_EXPR.sub("", f"event: {self.event}"))
            buffer.write(self._sep)

        if self.data is not None:
            json_data = json.dumps(self.data)
            for chunk in self.LINE_SEP_EXPR.split(json_data):
                buffer.write(f"data: {chunk}")
                buffer.write(self._sep)

        if self.retry is not None:
            if not isinstance(self.retry, int):
                raise TypeError("retry argument must be int")
            buffer.write(f"retry: {self.retry}")
            buffer.write(self._sep)

        buffer.write(self._sep)
        return buffer.getvalue().encode("utf-8")


def ensure_bytes(
    data: Union[bytes, dict, JsonServerSentEvent, Any], sep: str
) -> bytes:
    if isinstance(data, bytes):
        return data
    elif isinstance(data, JsonServerSentEvent):
        return data.encode()
    elif isinstance(data, dict):
        data["sep"] = sep
        return JsonServerSentEvent(**data).encode()
    else:
        return JsonServerSentEvent(str(data), sep=sep).encode()


class JsonEventSourceResponse(EventSourceResponse):
    async def stream_response(self, send: Send) -> None:
        await send(
            {
                "type": "http.response.start",
                "status": self.status_code,
                "headers": self.raw_headers,
            }
        )
        async for data in self.body_iterator:
            chunk = ensure_bytes(data, self.sep)
            _log.debug(f"chunk: {chunk.decode()}")
            with anyio.move_on_after(self.send_timeout) as timeout:
                await send(
                    {
                        "type": "http.response.body",
                        "body": chunk,
                        "more_body": True,
                    }
                )
            if timeout.cancel_called:
                await self.body_iterator.aclose()
                raise SendTimeoutError()

        async with self._send_lock:
            self.active = False
            await send(
                {"type": "http.response.body", "body": b"", "more_body": False}
            )
