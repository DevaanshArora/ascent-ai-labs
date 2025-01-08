# app/db.py

import psycopg2
from psycopg2 import sql
from contextlib import contextmanager

DB_CONFIG = {
    "host": "localhost",
    "database": "postgres",
    "user": "postgres",
    "password": "root",
    "port": "5432"
}
# Context manager for managing the database connection
@contextmanager
def get_db_connection():
    conn = psycopg2.connect(**DB_CONFIG)
    try:
        yield conn
    finally:
        conn.close()

# Function to insert policy data into PostgreSQL
def insert_policy_data(policy_data):
    query = sql.SQL("INSERT INTO policies (policy_text) VALUES (%s) RETURNING id;")
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (policy_data,))
            conn.commit()
            policy_id = cursor.fetchone()[0]
            return policy_id

# Function to fetch all policies
def get_all_policies():
    query = "SELECT * FROM policies;"
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()
            return rows
