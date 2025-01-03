import psycopg2
from fastapi import APIRouter, Depends, HTTPException
from psycopg2 import sql
from app import models, schemas
from app.database import DB_CONFIG  # Make sure DB_CONFIG is imported from the correct module

router = APIRouter()

# Database connection helper using DB_CONFIG
def get_db():
    try:
        connection = psycopg2.connect(
            host=DB_CONFIG["host"],
            database=DB_CONFIG["database"],
            user=DB_CONFIG["user"],
            password=DB_CONFIG["password"],
            port=DB_CONFIG["port"]
        )
        return connection
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {e}")

# Create an item
@router.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: psycopg2.extensions.connection = Depends(get_db)):
    try:
        cursor = db.cursor()
        # Insert a new item
        cursor.execute(
            "INSERT INTO items (name, description) VALUES (%s, %s) RETURNING id;",
            (item.name, item.description)
        )
        item_id = cursor.fetchone()[0]  # Get the ID of the newly inserted item
        db.commit()  # Commit the transaction
        cursor.close()

        # Fetch the newly created item
        cursor = db.cursor()
        cursor.execute("SELECT id, name, description FROM items WHERE id = %s;", (item_id,))
        db_item = cursor.fetchone()
        cursor.close()

        if db_item:
            return schemas.Item(id=db_item[0], name=db_item[1], description=db_item[2])
        else:
            raise HTTPException(status_code=404, detail="Item not found")
    
    except Exception as e:
        db.rollback()  # Rollback in case of error
        raise HTTPException(status_code=500, detail=f"Failed to create item: {e}")

# Read an item by its ID
@router.get("/items/{item_id}", response_model=schemas.Item)
def read_item(item_id: int, db: psycopg2.extensions.connection = Depends(get_db)):
    try:
        cursor = db.cursor()
        cursor.execute("SELECT id, name, description FROM items WHERE id = %s;", (item_id,))
        db_item = cursor.fetchone()
        cursor.close()

        if db_item:
            return schemas.Item(id=db_item[0], name=db_item[1], description=db_item[2])
        else:
            raise HTTPException(status_code=404, detail="Item not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve item: {e}")
