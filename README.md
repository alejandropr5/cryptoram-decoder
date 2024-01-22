# Cryptogram Decoder 🧩

Cryptogram Decoder is a web application for decoding cryptograms. It consists of both frontend and backend components.

## Structure

The project structure is as follows:

- **backend**: The backend is built with Python and FastAPI. It includes the following files:
  - `api.py`: Contains the API routes for the application.
  - `main.py`: The main FastAPI application entry point.
  - `pyproject.toml`: The configuration file for Python dependencies.

- **frontend**: The frontend is a simple web page that receives cryptograms and decodes them. It currently uses Streamlit, but the plan is to migrate to React. The frontend folder includes:
  - `home.py`: The frontend code for displaying and decoding cryptograms.
  - `pyproject.toml`: The configuration file for Python dependencies.
  - `run_streamlit.sh`: A script to run the Streamlit frontend.

- [**Repository for Genetic Decipher Package**](https://github.com/alejandropr5/genetic-decipher.git): The backend uses a custom package available in this repository. The package uses genetic algorithms to decode cryptograms.

## Backend

The backend of this application is responsible for decoding cryptograms using a genetic algorithm. It provides an endpoint to decode the cryptogram. The core functionality is powered by the custom "genetic-decipher" package available in the linked repository.

## Frontend

The frontend is a user-friendly interface for users to input cryptograms and view the deciphered results. While it currently uses Streamlit in Python, there are plans to migrate to a React-based frontend with TypeScript. The frontend also aims to explain the genetic algorithm used in the decryption process.

## Contribution 🤝

If you wish to contribute to this project or have any suggestions, please feel free to do so. Your contributions are welcomed for both the frontend and backend. Help us improve the cryptogram decoding experience!

---

This project showcases the use of genetic algorithms for cryptogram decryption. If you have any questions or need more information, don't hesitate to ask.
