from pydantic import BaseModel


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
    key: str
    fitness: float
