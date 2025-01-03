from fastapi import FastAPI
from .routes import items_routes
from .database import create_connection, create_table

app = FastAPI()

# Create the tables using raw SQL
create_table()

app.include_router(items_routes.router)
