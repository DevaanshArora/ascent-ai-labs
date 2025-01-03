import psycopg2
from psycopg2 import sql, OperationalError

# Database connection details
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

# Function to create a database connection
def create_connection():
    try:
        # Connect to the PostgreSQL database using DB_CONFIG
        connection = psycopg2.connect(
            host=DB_CONFIG["host"],
            database=DB_CONFIG["database"],
            user=DB_CONFIG["user"],
            password=DB_CONFIG["password"],
            port=DB_CONFIG["port"]
        )
        return connection
    except OperationalError as e:
        print(f"Error: {e}")
        return None

# Function to create the 'items' table if it doesn't exist
def create_table():
    connection = create_connection()
    if connection:
        try:
            cursor = connection.cursor()
            # Create table SQL query
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS items (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    description TEXT
                );
            """)
            connection.commit()  # Commit the transaction
            print("Table 'items' created successfully.")
            cursor.close()
            connection.close()
        except OperationalError as e:
            print(f"Error creating table: {e}")
            connection.rollback()
            cursor.close()
            connection.close()

# Test the connection (optional)
def test_connection():
    connection = create_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute("SELECT version();")
        db_version = cursor.fetchone()
        print(f"Connected to the database: {db_version}")
        cursor.close()
        connection.close()
