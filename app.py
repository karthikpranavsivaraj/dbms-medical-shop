<<<<<<< HEAD
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
=======
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import functools
from db_config import get_connection

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Please log in to access this page.'
login_manager.login_message_category = 'warning'

# User class for Flask-Login
class User(UserMixin):
    def __init__(self, id, username, role):
        self.id = id
        self.username = username
        self.role = role

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Users WHERE UserID = %s", (user_id,))
    user_data = cursor.fetchone()
    conn.close()
    
    if user_data:
        return User(user_data['UserID'], user_data['Username'], user_data['Role'])
    return None

# Role-based access control decorator
def role_required(roles):
    def decorator(f):
        @functools.wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated:
                return redirect(url_for('login'))
            if current_user.role not in roles:
                flash('You do not have permission to access this page.', 'danger')
                return redirect(url_for('index'))
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
        
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        remember = 'remember' in request.form
        
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Users WHERE Username = %s", (username,))
        user_data = cursor.fetchone()
        
        if user_data and check_password_hash(user_data['HashedPassword'], password):
            # Update last login time
            cursor.execute("UPDATE Users SET LastLogin = %s WHERE UserID = %s", 
                          (datetime.now(), user_data['UserID']))
            conn.commit()
            
            # Create user object and log in
            user = User(user_data['UserID'], user_data['Username'], user_data['Role'])
            login_user(user, remember=remember)
            
            # Store user role in session for easy access
            session['user_role'] = user_data['Role']
            
            flash(f'Welcome back, {user_data["Username"]}!', 'success')
            
            # Redirect to the page the user was trying to access
            next_page = request.args.get('next')
            if next_page and next_page.startswith('/'):
                return redirect(next_page)
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password. Please try again.', 'danger')
        
        conn.close()
    
    return render_template('login.html')

# Logout route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    session.pop('user_role', None)
    flash('You have been logged out successfully.', 'success')
    return redirect(url_for('login'))

# Register route (for admin to create new users)
@app.route('/register', methods=['GET', 'POST'])
@login_required
@role_required(['Admin'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        role = request.form['role']
        
        # Hash the password
        hashed_password = generate_password_hash(password)
        
        conn = get_connection()
        cursor = conn.cursor()
        
        try:
            cursor.execute(
                "INSERT INTO Users (Username, HashedPassword, Role) VALUES (%s, %s, %s)",
                (username, hashed_password, role)
            )
            conn.commit()
            flash(f'User {username} created successfully!', 'success')
            return redirect(url_for('index'))
        except Exception as e:
            conn.rollback()
            flash(f'Error creating user: {e}', 'danger')
        finally:
            conn.close()
    
    return render_template('register.html')

# Home route
@app.route('/')
@login_required
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
@login_required
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
        return redirect(url_for('make_sale'))

    # GET: load form
    cursor.execute("SELECT CustomerID, CustomerName FROM Customers")
    customers = cursor.fetchall()
    cursor.execute("SELECT MedicineID, title, UnitPrice FROM Medicines WHERE StockQuantity > 0")
    medicines = cursor.fetchall()
    conn.close()
    return render_template("sale_form.html", customers=customers, medicines=medicines)

@app.route('/inventory')
@login_required
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
@login_required
def reports():
    # In a real application, you would fetch actual report data here
    return render_template("reports.html")

@app.route('/api/medicine/<int:medicine_id>')
@login_required
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

# Create a user management page (admin only)
@app.route('/users')
@login_required
@role_required(['Admin'])
def manage_users():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT UserID, Username, Role, CreatedAt, LastLogin FROM Users")
    users = cursor.fetchall()
    
    conn.close()
    return render_template("users.html", users=users)

# Initialize the database with a default admin user if none exists
def init_db():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Check if any users exist
    cursor.execute("SELECT COUNT(*) as count FROM Users")
    user_count = cursor.fetchone()['count']
    
    # If no users exist, create a default admin user
    if user_count == 0:
        admin_password = generate_password_hash('admin123')
        cursor.execute(
            "INSERT INTO Users (Username, HashedPassword, Role) VALUES (%s, %s, %s)",
            ('admin', admin_password, 'Admin')
        )
        conn.commit()
        print("Default admin user created. Username: admin, Password: admin123")
    
    conn.close()

if __name__ == '__main__':
    # Initialize the database with default admin user
    init_db()
    app.run(debug=True)
>>>>>>> 03a9479 (hi)
