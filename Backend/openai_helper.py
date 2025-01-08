# app/openai_helper.py

import openai

def generate_policy(input_text, model="gpt-3.5-turbo", api_key="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"):
    """
    Connects to OpenAI's API to generate a policy based on the given input text.
    """
    try:
        openai.api_key = api_key

        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": """You are a GRC policy generator. Based on the provided input, generate a detailed and structured "
                    "organizational policy in JSON format. The output must be comprehensive, practical, and ready to use, "
                    "Ensure the JSON format is flat, and do not wrap the content under a "
                    "single parent key such as 'Policy'. Each section should stand alone as a top-level key.Please take reference from the input fields entered by the user, The policy should be around 1200 words.
                    
                 """},
                {"role": "user", "content": f"Generate a policy based on this input: {input_text}"}
            ]
        )
        return response['choices'][0]['message']['content']

    except openai.error.OpenAIError as e:
        return f"An error occurred: {e}"
