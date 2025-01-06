# app/openai_helper.py

import openai

def generate_policy(input_text, model="gpt-3.5-turbo", api_key="api key here"):
    """
    Connects to OpenAI's API to generate a policy based on the given input text.
    """
    try:
        openai.api_key = api_key

        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are an expert in drafting policies."},
                {"role": "user", "content": f"Generate a policy based on this input: {input_text}"}
            ]
        )
        return response['choices'][0]['message']['content'].strip()

    except openai.error.OpenAIError as e:
        return f"An error occurred: {e}"
