import os
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def load_config():
    config_path = "config.json"
    if not os.path.exists(config_path):
        raise FileNotFoundError(f"Configuration file {config_path} not found.")
    
    with open(config_path, 'r') as config_file:
        return json.load(config_file)

config = load_config()
openai_api_key = os.getenv("OPENAI_API_KEY")

# Constants
OPENAI_API_KEY = openai_api_key
