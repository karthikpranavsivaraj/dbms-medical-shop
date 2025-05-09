from flask import Flask, render_template, request, redirect, flash
from db_config import get_connection

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def index():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Medicines")
    medicines = cursor.fetchall()
    conn.close()
    return render_template("index.html", medicines=medicines)

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
            flash("Sale successful!", "success")
        except Exception as e:
            conn.rollback()
            flash(f"Error: {e}", "danger")

        conn.close()
        return redirect('/sale')

    # GET: load form
    cursor.execute("SELECT * FROM Customers")
    customers = cursor.fetchall()
    cursor.execute("SELECT * FROM Medicines")
    medicines = cursor.fetchall()
    conn.close()
    return render_template("sale_form.html", customers=customers, medicines=medicines)

if __name__ == '__main__':
    app.run(debug=True)
