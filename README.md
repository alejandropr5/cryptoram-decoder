# Gencipher Page

This repository contains both frontend and backend components of a tool designed to solve monoalphabetic substitution ciphers, also known as cryptograms.

## Backend 
[![Backend_Tests](https://github.com/alejandropr5/gencipher-page/actions/workflows/backend_tests.yml/badge.svg?branch=main)](https://github.com/alejandropr5/gencipher-page/actions/workflows/backend_tests.yml)  
The backend, powered by Python and FastAPI, utilizes genetic algorithms from a custom Python package named genetic-decipher. It provides two endpoints documented in Swagger UI.

`/decipher` endpoint accepts parameters and returns final results via HTTP request.  
`/decipher_stream` endpoint utilizes Server-Sent Events (SSE) to send results of each iteration of the genetic algorithm to the client. This allows the frontend to display the progress of the algorithm until the best solution is reached.

> [**API documentation**](https://gencipher-api.azurewebsites.net/docs)  
[**genetic-decipher repository**](https://github.com/alejandropr5/genetic-decipher.git) 

## Frontend

The frontend, built with Next.js and Tailwind CSS, provides an intuitive user interface for interacting with the deciphering tool.

## Contribution

If you wish to contribute to this project or have any suggestions, please feel free to do so. Your contributions are welcomed for both the frontend and backend.
