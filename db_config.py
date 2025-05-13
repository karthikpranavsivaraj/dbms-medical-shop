# db_config.py

import mysql.connector
from mysql.connector import Error

def get_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',       # Change if your DB is hosted elsewhere
            user='karthik',   # Replace with your MySQL username
            password='karthik2005',  # Replace with your MySQL password
            database='medicalshopdb'    # Replace with your database name
        )
        if connection.is_connected():
            print("✅ Successfully connected to the database")
            return connection
    except Error as e:
        print("❌ Error while connecting to MySQL", e)
        return None
