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
