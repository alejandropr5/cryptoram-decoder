from pydantic import BaseModel
from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware

from gencipher.model import GeneticDecipher


class RequestBody(BaseModel):
    cipher_text: str
    max_iter: int = 20
    n_population: int = 100
    tolerance: float = 0.02
    mutation_type: str = "scramble"
    crossover_type: str = "full"
    mutation_rate: float = 0.01
    crossover_rate: float = 0.6


class ResponseBody(BaseModel):
    plain_text: str
    history: dict[str, list]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
def decipher(
    body: RequestBody,
    model: GeneticDecipher = Depends(get_model)
):
    plain_text = model.decipher(**body.dict())

    return ResponseBody(plain_text=plain_text,
                        history=model.history)
