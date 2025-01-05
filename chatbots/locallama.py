from langchain_ollama import ChatOllama  #to run ollama model
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import streamlit as st
import os

from dotenv import load_dotenv

#load environment variables from .env file
load_dotenv(dotenv_path="C:\LLM\langchain\myenv\.env")

os.environ["LANGCHAIN_API_KEY"]=os.getenv("LANGCHAIN_API_KEY")
os.environ["LANGCHAIN_TRACING_V2"]="true"

# Initialize Ollama LLM
llm = ChatOllama(model="smollm2:135m")  # Replace "chatGPT" with your model of choice


# Define prompt template
prompt_template = PromptTemplate(
    input_variables=["question"],
    template="You are a helpful assistant. Answer the question: {question}"
)

# Create a chain
chain = LLMChain(llm=llm, prompt=prompt_template)

# Streamlit interface
st.title('LangChain with Ollama Demo')
input_text = st.text_input("Enter your question:")

if input_text:
    result = chain.run({"question": input_text})
    st.write(result)



