# app/db.py

import psycopg2
from psycopg2 import sql
from contextlib import contextmanager

DB_CONFIG = {
    "host": "localhost",
    "database": "postgres",
    "user": "postgres",
    "password": "Post@0099",
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

def get_policy_by_name(policy_name: str):
    query = sql.SQL("SELECT * FROM policies WHERE policy_name = %s;")
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (policy_name,))
            rows = cursor.fetchall()
            return rows
        
def get_all_Policy_name():
    query = "Select policy_name from Policies;"
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()
            return rows
