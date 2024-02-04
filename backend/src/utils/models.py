from typing import Annotated
from fastapi import Body
from pydantic import BaseModel


class RequestBody(BaseModel):
    cipher_text: Annotated[
        str,
        Body(
            description="The cryptogram to be deciphered.",
            min_length=4,
        ),
    ]
    max_iter: Annotated[
        int,
        Body(
            description=(
                "The maximum number of iterations for the genetic "
                "algorithm."
            ),
            ge=0,
        ),
    ] = 20
    n_population: Annotated[
        int,
        Body(
            description=(
                "The size of the candidate population for each " "iteration."
            ),
            ge=1,
        ),
    ] = 100
    tolerance: Annotated[
        float,
        Body(
            description=(
                "The algorithm stops when the fitness is within this "
                "tolerance."
            ),
            ge=0,
            le=1,
        ),
    ] = 0.02
    mutation_type: Annotated[
        str,
        Body(
            description=(
                "The type of mutation to be applied in the genetic algorithm."
            ),
            examples=["insert", "swap", "inversion", "scramble"],
        ),
    ] = "scramble"
    crossover_type: Annotated[
        str,
        Body(
            description=(
                "The type of crossover to be applied in the genetic algorithm."
            ),
            examples=["order-one", "partially-mapped", "cycle", "full"],
        ),
    ] = "full"
    mutation_rate: Annotated[
        float,
        Body(
            description=(
                "The mutation rate, affecting the likelihood of "
                "applying mutation."
            ),
            ge=0,
            le=1,
        ),
    ] = 0.01
    crossover_rate: Annotated[
        float,
        Body(
            description=(
                "The crossover rate, affecting the likelihood of "
                "applying crossover."
            ),
            ge=0,
            le=1,
        ),
    ] = 0.6


class ResponseBody(BaseModel):
    plain_text: str
    key: str
    fitness: float
