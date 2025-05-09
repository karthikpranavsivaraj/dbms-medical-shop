from flask import Flask, render_template, request, redirect, flash, jsonify
from db_config import get_connection

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def index():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Get medicines for inventory display
    cursor.execute("SELECT * FROM Medicines")
    medicines = cursor.fetchall()
    
    # Get low stock count
    cursor.execute("SELECT COUNT(*) as count FROM Medicines WHERE StockQuantity < 10")
    low_stock = cursor.fetchone()['count']
    
    # Get expiring soon count
    cursor.execute("SELECT COUNT(*) as count FROM Medicines WHERE ExpiryDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)")
    expiring_soon = cursor.fetchone()['count']
    
    # Get recent sales (limit to 5)
    cursor.execute("""
        SELECT s.SaleID, c.CustomerName, s.DateTime, s.TotalAmount, 
               COUNT(si.SaleItemID) as ItemCount
        FROM Sales s
        JOIN Customers c ON s.CustomerID = c.CustomerID
        JOIN SaleItems si ON s.SaleID = si.SaleID
        GROUP BY s.SaleID
        ORDER BY s.DateTime DESC
        LIMIT 5
    """)
    recent_sales = cursor.fetchall()
    
    conn.close()
    return render_template("index.html", 
                          medicines=medicines, 
                          low_stock=low_stock,
                          expiring_soon=expiring_soon,
                          recent_sales=recent_sales)

@app.route('/sale', methods=['GET', 'POST'])
def make_sale():
    conn = get_connection()
    cursor = conn.cursor()

    if request.method == 'POST':
        customerID = int(request.form['customerID'])
        medicineID = int(request.form['medicineID'])
        quantity = int(request.form['quantity'])
        unitPrice = float(request.form['unitPrice'])
        discount = float(request.form['discount'])
        tax = float(request.form['tax'])
        paymentMethod = request.form['paymentMethod']

        try:
            cursor.callproc("MakeSale", [
                customerID, medicineID, quantity,
                unitPrice, discount, tax, paymentMethod
            ])
            conn.commit()
            flash("Sale completed successfully!", "success")
        except Exception as e:
            conn.rollback()
            flash(f"Error: {e}", "danger")

        conn.close()
        return redirect('/sale')

    # GET: load form
    cursor.execute("SELECT CustomerID, CustomerName FROM Customers")
    customers = cursor.fetchall()
    cursor.execute("SELECT MedicineID, title, UnitPrice FROM Medicines WHERE StockQuantity > 0")
    medicines = cursor.fetchall()
    conn.close()
    return render_template("sale_form.html", customers=customers, medicines=medicines)

@app.route('/inventory')
def inventory():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Get all medicines
    cursor.execute("SELECT * FROM Medicines")
    medicines = cursor.fetchall()
    
    # Get low stock count
    cursor.execute("SELECT COUNT(*) as count FROM Medicines WHERE StockQuantity < 10")
    low_stock = cursor.fetchone()['count']
    
    # Get expiring soon count
    cursor.execute("SELECT COUNT(*) as count FROM Medicines WHERE ExpiryDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)")
    expiring_soon = cursor.fetchone()['count']
    
    conn.close()
    return render_template("inventory.html", 
                          medicines=medicines,
                          low_stock=low_stock,
                          expiring_soon=expiring_soon)

@app.route('/reports')
def reports():
    # In a real application, you would fetch actual report data here
    return render_template("reports.html")

@app.route('/api/medicine/<int:medicine_id>')
def get_medicine(medicine_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM Medicines WHERE MedicineID = %s", (medicine_id,))
    medicine = cursor.fetchone()
    
    conn.close()
    
    if medicine:
        return jsonify(medicine)
    else:
        return jsonify({"error": "Medicine not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
