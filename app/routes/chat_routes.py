from fastapi import APIRouter, HTTPException
from app.models import ChatRequest
from app.services.chat_service import ChatService
from app.config import OPENAI_API_KEY

# Initialize router and service
router = APIRouter()
chat_service = ChatService(openai_api_key=OPENAI_API_KEY)

@router.post("/chat")
async def chat(request: ChatRequest):
    # Construct user query
    user_query = (
        f"Generate a policy taking reference from the following details:\n"
        f"- Organization Name: {request.orgName}\n"
        f"- Location: {request.location}\n"
        f"- Organization Category: {request.orgCategory}\n"
        f"- Policy Category: {request.policyCategory}\n"
        f"- Policy should be compliant with the following compliances: {request.compliance}\n"
        f"- Additional Information: {request.additionalInfo}\n"
    )
    return chat_service.generate_policy(request.session_id, user_query)
