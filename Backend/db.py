# app/db.py

import psycopg2
from psycopg2 import sql
from contextlib import contextmanager


DB_CONFIG = {
    "host": "grc-rdbms-sql.ascentbusiness.com",       
    "database": "GRC-DEV",  
    "user": "grc_dev_db_user",      
    "password": "ISTinEouTEGF",  
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


def insert_policy_data(policy_data: str, policy_name: str, category: str, department: str, policyowner: str):
    query = sql.SQL("""
        INSERT INTO policies_gtpl (policy_text, policy_name, category, department, policy_owner) 
        VALUES (%s, %s, %s, %s, %s) 
        RETURNING id;
    """)
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (policy_data, policy_name, category, department, policyowner))
            conn.commit()
            policy_id = cursor.fetchone()[0]
            return policy_id



# Function to fetch all policies
def get_all_policies():
    query = "SELECT * FROM policies_gtpl;"
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()
            return rows

def get_policy_by_name(policy_name: str):
    query = sql.SQL("SELECT * FROM policies_gtpl WHERE policy_name = %s;")
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (policy_name,))
            rows = cursor.fetchall()
            return rows
        
def get_all_Policy_name():
    query = "Select policy_name,category,department,policy_owner from policies_gtpl;"
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()
            return rows


def get_policy_details():
    query = "SELECT * FROM public.policies_gtpl ORDER BY id ASC ;"
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()
            return rows