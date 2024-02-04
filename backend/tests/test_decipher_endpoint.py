from fastapi.testclient import TestClient

from app.api import app


def test_method():
    with TestClient(app) as client:
        response = client.post(
            "/decipher",
            headers={"Content-Type": "application/json"},
            json={"cipher_text": "cipher text for testing"},
        )

        assert response.status_code == 200

        dict_response: dict = response.json()
        assert dict_response.get("plain_text") is not None
        assert dict_response.get("key") is not None
        assert dict_response.get("fitness") is not None


def test_cipher_text_arg():
    with TestClient(app) as client:
        response = client.post(
            "/decipher",
            headers={"Content-Type": "application/json"},
            json={"cipher_text": "abc"},
        )

        assert response.status_code == 422
        assert response.json() == {
            "detail": [
                {
                    "loc": ["body", "cipher_text"],
                    "msg": "ensure this value has at least 4 characters",
                    "type": "value_error.any_str.min_length",
                    "ctx": {"limit_value": 4},
                }
            ]
        }


def test_max_iter_arg():
    with TestClient(app) as client:
        response = client.post(
            "/decipher",
            headers={"Content-Type": "application/json"},
            json={"cipher_text": "abcd", "max_iter": -1},
        )

        assert response.status_code == 422
        assert response.json() == {
            "detail": [
                {
                    "loc": ["body", "max_iter"],
                    "msg": "ensure this value is greater than or equal to 0",
                    "type": "value_error.number.not_ge",
                    "ctx": {"limit_value": 0},
                }
            ]
        }


def test_n_population_arg():
    with TestClient(app) as client:
        response = client.post(
            "/decipher",
            headers={"Content-Type": "application/json"},
            json={"cipher_text": "abcd", "n_population": 0},
        )

        assert response.status_code == 422
        assert response.json() == {
            "detail": [
                {
                    "loc": ["body", "n_population"],
                    "msg": "ensure this value is greater than or equal to 1",
                    "type": "value_error.number.not_ge",
                    "ctx": {"limit_value": 1},
                }
            ]
        }


def test_mutation_type_arg():
    with TestClient(app) as client:
        response = client.post(
            "/decipher",
            headers={"Content-Type": "application/json"},
            json={"cipher_text": "abcd", "mutation_type": "test"},
        )

        assert response.status_code == 422
        assert response.json() == {
            "detail": ("Invalid mutation: test. It should be one of "
                       "[insert, swap, inversion, scramble].")
        }


def test_crossover_type_arg():
    with TestClient(app) as client:
        response = client.post(
            "/decipher",
            headers={"Content-Type": "application/json"},
            json={"cipher_text": "abcd", "crossover_type": "test"},
        )

        assert response.status_code == 422
        assert response.json() == {
            "detail": ("Invalid crossover: test. It should be one of "
                       "[order-one, partially-mapped, cycle, full].")
        }


def test_mutation_rate_0_arg():
    with TestClient(app) as client:
        response = client.post(
            "/decipher",
            headers={"Content-Type": "application/json"},
            json={"cipher_text": "abcd", "mutation_rate": -1},
        )

        assert response.status_code == 422
        assert response.json() == {
            "detail": [
                {
                    "loc": ["body", "mutation_rate"],
                    "msg": "ensure this value is greater than or equal to 0",
                    "type": "value_error.number.not_ge",
                    "ctx": {"limit_value": 0},
                }
            ]
        }


def test_mutation_rate_1_arg():
    with TestClient(app) as client:
        response = client.post(
            "/decipher",
            headers={"Content-Type": "application/json"},
            json={"cipher_text": "abcd", "mutation_rate": 2},
        )

        assert response.status_code == 422
        assert response.json() == {
            "detail": [
                {
                    "loc": ["body", "mutation_rate"],
                    "msg": "ensure this value is less than or equal to 1",
                    "type": "value_error.number.not_le",
                    "ctx": {"limit_value": 1},
                }
            ]
        }


def test_crossover_rate_0_arg():
    with TestClient(app) as client:
        response = client.post(
            "/decipher",
            headers={"Content-Type": "application/json"},
            json={"cipher_text": "abcd", "crossover_rate": -1},
        )

        assert response.status_code == 422
        assert response.json() == {
            "detail": [
                {
                    "loc": ["body", "crossover_rate"],
                    "msg": "ensure this value is greater than or equal to 0",
                    "type": "value_error.number.not_ge",
                    "ctx": {"limit_value": 0},
                }
            ]
        }


def test_crossover_rate_1_arg():
    with TestClient(app) as client:
        response = client.post(
            "/decipher",
            headers={"Content-Type": "application/json"},
            json={"cipher_text": "abcd", "crossover_rate": 2},
        )

        assert response.status_code == 422
        assert response.json() == {
            "detail": [
                {
                    "loc": ["body", "crossover_rate"],
                    "msg": "ensure this value is less than or equal to 1",
                    "type": "value_error.number.not_le",
                    "ctx": {"limit_value": 1},
                }
            ]
        }
