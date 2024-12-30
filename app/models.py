from pydantic import BaseModel

class ChatRequest(BaseModel):
    session_id: str
    additionalInfo: str
    compliance: str
    location: str
    orgCategory: str
    orgName: str
    policyCategory: str
