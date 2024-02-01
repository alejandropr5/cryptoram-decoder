from fastapi import FastAPI, Request
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from gencipher.model import GeneticDecipher
from src.utils import models, constants, sse


api_models = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the ML model
    api_models["gencipher"] = GeneticDecipher()
    yield
    # Clean up the models and release the resources
    api_models.clear()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[constants.HOMEPAGE_LOCALHOST, constants.HOMEPAGE_URL],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.post("/decipher")
async def decipher(body: models.RequestBody):
    plain_text = api_models["gencipher"].decipher(**body.dict())

    return models.ResponseBody(
        plain_text=plain_text,
        key=api_models["gencipher"].history["key"][-1],
        fitness=api_models["gencipher"].history["fitness"][-1],
    )


@app.post("/decipher_stream")
async def decipher_stream(body: models.RequestBody, request: Request):
    decipher_generator = api_models["gencipher"].decipher_generator(
        **body.dict()
    )

    async def event_generator():
        for (
            best_key,
            fitness_percentage,
            deciphered_text,
        ) in decipher_generator:
            if await request.is_disconnected():
                break

            yield {
                "data": {
                    "plain_text": deciphered_text,
                    "key": best_key,
                    "fitness": fitness_percentage,
                }
            }

    return sse.JsonEventSourceResponse(event_generator())
