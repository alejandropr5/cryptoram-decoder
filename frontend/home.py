import streamlit as st
# import pandas as pd
import requests
import json
import os


API_ENDPOINT = os.environ.get("API_ENDPOINT", "http://localhost:8000")

HOME_TEXT = (
    "Welcome to our Cryptogram Decoder Page! Our platform uses a "
    "genetic algorithm through an API Endpoint to efficiently decode "
    "cryptograms. We've combined advanced techniques like crossover and "
    "mutation with n-gram frequency analysis to find the best decryption key "
    "for your ciphertext. Our Python-based tool employs "
    "state-of-the-art methods to optimize the search for the perfect solution."
    "\n\n"
    "How does it work? Simply input your cryptogram and adjust the parameters "
    "as needed. Our genetic algorithm will evolve and seek the optimal "
    "decryption key in a set number of iterations. You can track progress in "
    "real-time and see the best solutions along the way."
    "\n\n"
    "For more details, you can visit our "
    "[repository](https://github.com/alejandropr5/cryptogram_decoder_project)."
    " We hope this tool helps you uncover cryptogram mysteries quickly and "
    "effectively!"
)

CIPHER_TEXT = (
    "Rbo rpktigo vcrb bwucja wj kloj hcjd, km sktpqo, cq rbwr loklgo "
    "vcgg cjqcqr kj skhcja wgkja wjd rpycja rk ltr rbcjaq cj cr. "
    "\n"
    "-- Roppy Lpwrsborr"
)


def call_api_method(**kwargs) -> str:
    request_data_json = json.dumps(kwargs)
    headers = {"Content-Type": "application/json"}
    decipher_method_endpoint = f"{API_ENDPOINT}/decipher"

    response = requests.request(
        "POST", decipher_method_endpoint,
        headers=headers, data=request_data_json
    )
    response_json = response.json()

    return response_json["plain_text"], response_json["history"]


def display_result(plain_text: str) -> None:
    # with st.spinner("Processing..."):
    #     response = call_api_method(cipher_text, n_iter, n_pop)
    #     plain_text, history = response
    st.header("Result")
    st.text_area(label="", value=plain_text, disabled=True)

    # with st.expander("Details"):
    #     history_df = pd.DataFrame(history)
    #     st.dataframe(
    #         history_df,
    #         use_container_width=True,
    #         hide_index=False
    #     )


def app():
    st.set_page_config(
        page_title="Cryptogram Decoder",
        page_icon="🔏",
        layout="wide"
    )
    st.title("Cryptogram Genetic Decoder")

    st.header("Input")
    cipher_text = st.text_area(
        label="Cryptogram :red[*]",
        value=CIPHER_TEXT
    )

    with st.sidebar:
        st.title("Advanced options")
        n_iter = st.slider("Number of iterations", 0, 100, 25)
        n_pop = st.slider("Number of population", 0, 200, 120)
        mutation_type = st.selectbox(
            "Mutation algorithm",
            ("insert", "swap", "inversion", "scramble")
        )
        mutation_rate = st.slider("Mutation rate", 0.0, 1.0, 0.01)
        crossover_type = st.selectbox(
            "Crosover algorithm",
            ("full", "order-one", "partially-mapped", "cycle")
        )
        crossover_rate = st.slider("Crossover rate", 0.0, 1.0, 0.6)

    button_clicked = st.button("Decode")
    if button_clicked:
        with st.spinner("Processing..."):
            plaint_text, history = call_api_method(
                cipher_text=cipher_text,
                max_iter=n_iter,
                n_population=n_pop,
                mutation_type=mutation_type,
                mutation_rate=mutation_rate,
                crossover_rate=crossover_rate,
                crossover_type=crossover_type
            )
        display_result(plaint_text)


if __name__ == "__main__":
    app()
