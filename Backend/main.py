# app/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.db import insert_policy_data, get_all_policies
from app.openai_helper import generate_policy

app = FastAPI()

# Define Pydantic models
class PolicyRequest(BaseModel):
    input_text: str

class PolicyResponse(BaseModel):
    policy_text: str
    id: int

@app.post("/generate-policy/", response_model=PolicyResponse)
async def generate_and_store_policy(request: PolicyRequest):
    # Generate policy using OpenAI API
    policy = generate_policy(request.input_text)
    
    print(policy)
    if policy.startswith("An error occurred"):
        raise HTTPException(status_code=500, detail=policy)

    # Store the policy in PostgreSQL
    policy_id = insert_policy_data(policy)

    return PolicyResponse(policy_text=policy, id=policy_id)

@app.get("/policies/")
async def get_policies():
    policies = get_all_policies()
    return policies
