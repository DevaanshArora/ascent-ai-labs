from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate   #to run chat bot 
from langchain_core.output_parsers import StrOutputParser  #default output parser


import streamlit as st 
import os
from dotenv import load_dotenv

#load environment variables from .env file
load_dotenv(dotenv_path="C:\LLM\langchain\myenv\.env")

#set environment variables 
os.environ["OPENAI_API_KEY"]=os.getenv("OPENAI_API_KEY")
#langsmith_tracking
os.environ["LANGCHAIN_API_KEY"]=os.getenv("LANGCHAIN_API_KEY")
os.environ["LANGCHAIN_TRACING_V2"]="true"


##PROMPT TEMPLATE       #Is used to define how the conversation between the user and the assistant should be structured. It sets up a template that will guide the LLM (language model) in generating the response based on the user's input.
prompt =ChatPromptTemplate.from_messages(
    [
        ("system","You are a helpful assistant. Please response to the user queries"),
        ("user","Question:{question}")
    ]
)


#streamlit framework
st.title('Langchain Demo with OPEN API')
input_text = st.text_input("Search the topic u want")

#openai llm
llm= ChatOpenAI(model="gpt-4o-mini")
output_parser=StrOutputParser()

#chain define
chain = prompt | llm | output_parser

if input_text:
    #run the chain and display result
    result = chain.invoke({'question':input_text})
    st.write(result)
