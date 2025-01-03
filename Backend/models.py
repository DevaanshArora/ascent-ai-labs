import psycopg2
from psycopg2 import sql

# Database connection details (DB_CONFIG)
# DB_CONFIG = {
#     "host": "localhost",
#     "database": "postgres",
#     "user": "postgres",
#     "password": "Post@0099",
#     "port": "5432"
# }
DB_CONFIG = {
    "host": "grc-rdbms-sql.ascentbusiness.com",       
    "database": "postgres",  
    "user": "grc_dev_db_user",      
    "password": "ISTinEouTEGF",  
    "port": "5432"               
}

# Define your Item class as a data container, without SQLAlchemy's ORM layer
class Item:
    def __init__(self, name: str, description: str, id: int = None):
        self.id = id
        self.name = name
        self.description = description

# Function to connect to the database using psycopg2 with DB_CONFIG
def get_db_connection():
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
        print(f"Error: {e}")
        return None

# Function to create the table
def create_table():
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            # Create the table if it doesn't exist
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS items (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    description TEXT
                );
            """)
            conn.commit()
            cursor.close()
            conn.close()
        except Exception as e:
            print(f"Error creating table: {e}")

# Function to insert a new item
def insert_item(item: Item):
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            # Insert the item data into the database
            cursor.execute(
                "INSERT INTO items (name, description) VALUES (%s, %s) RETURNING id;",
                (item.name, item.description)
            )
            item.id = cursor.fetchone()[0]  # Get the ID of the newly inserted item
            conn.commit()
            cursor.close()
            conn.close()
            print(f"Inserted item with ID: {item.id}")
        except Exception as e:
            print(f"Error inserting item: {e}")

# Function to fetch items
def get_items():
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM items;")
            rows = cursor.fetchall()
            items = [Item(id=row[0], name=row[1], description=row[2]) for row in rows]
            cursor.close()
            conn.close()
            return items
        except Exception as e:
            print(f"Error fetching items: {e}")
            return []
    return []

# Create table
create_table()

# Example: Insert and fetch items
# new_item = Item(name="Test Item", description="A description of the test item.")
new_items = Item(name="Test Item 3", description="A description of the test item 3.")

# insert_item(new_item)
insert_item(new_items)


# Fetch and print all items
items = get_items()
for item in items:
    print(f"ID: {item.id}, Name: {item.name}, Description: {item.description}")
