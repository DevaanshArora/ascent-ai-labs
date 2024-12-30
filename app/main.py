from fastapi import FastAPI
from app.routes.chat_routes import router as chat_router

app = FastAPI()

# Register routers
app.include_router(chat_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=11010)
