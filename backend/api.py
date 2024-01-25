from fastapi import FastAPI, Request, Depends, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from gencipher.model import GeneticDecipher
from src.utils import models
from src.utils import constants


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[constants.HOMEPAGE_LOCALHOST, constants.HOMEPAGE_URL],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


async def get_model(request: Request):
    return request.app.state.model


@app.on_event("startup")
def load_model():
    gencipher = GeneticDecipher()
    print("Model loaded successfully!")
    app.state.model = gencipher


@app.on_event("shutdown")
def shutdown_event():
    print("Shutting down the application...")


@app.post("/decipher")
async def decipher(
    body: models.RequestBody, model: GeneticDecipher = Depends(get_model)
):
    plain_text = model.decipher(**body.dict())

    return models.ResponseBody(
        plain_text=plain_text,
        key=model.history["key"][-1],
        fitness=model.history["fitness"][-1],
    )


@app.websocket("/ws/decipher")
async def websocket_decipher(
    websocket: WebSocket,
    body: models.RequestBody,
    model: GeneticDecipher = Depends(get_model),
):
    await websocket.accept()
    decipher_generator = model.decipher_generator(**body.dict())

    for best_key, fitness_percentage, deciphered_text in decipher_generator:
        await websocket.send_json(
            models.ResponseBody(
                plain_text=deciphered_text,
                key=best_key,
                fitness=fitness_percentage,
            )
        )
