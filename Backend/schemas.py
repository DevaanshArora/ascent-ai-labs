# app/schemas.py

from pydantic import BaseModel

class PolicyRequest(BaseModel):
    input_text: str

class PolicyResponse(BaseModel):
    policy_text: str
    id: int
