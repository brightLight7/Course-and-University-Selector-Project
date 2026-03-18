
from dotenv import load_dotenv
import psycopg2
import os

load_dotenv() # Load environment variables from .env file

def get_db_connection(): # Establish a connection to the PostgreSQL database using credentials from environment variables
    return psycopg2.connect(
        host=os.getenv('DB_HOST'),
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        port=os.getenv('DB_PORT')
    )