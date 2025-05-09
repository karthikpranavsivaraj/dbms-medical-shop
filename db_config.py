import mysql.connector
__all__ = ['get_connection']

def get_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="karthik",
            password="karthik2005",
            database="MedicalShopDB"
        )
        print("✅ Database connection successful.")
        return conn
    except mysql.connector.Error as err:
        print("❌ Database connection failed:", err)
        return None
