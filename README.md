# MedShop Zenith - Pharmacy Management System

MedShop Zenith is a comprehensive pharmacy management system designed to streamline the operations of medical shops and pharmacies. The application provides an intuitive interface for managing inventory, suppliers, sales, and generating reports.

## Features

- **User Authentication**: Secure login and registration system with role-based access control
- **Dashboard**: Overview of key metrics and recent activities
- **Inventory Management**: 
  - Add, edit, and delete medicines
  - Track stock levels and expiry dates
  - Filter and search functionality
- **Supplier Management**:
  - Maintain supplier information
  - Track supplier performance and ratings
  - Manage supplier orders
- **Sales Management**:
  - Process sales transactions
  - Generate invoices
  - Apply discounts
- **Reporting**:
  - Sales reports
  - Inventory reports
  - Supplier performance reports
- **User Management** (Admin only):
  - Add, edit, and delete users
  - Assign roles and permissions

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python with Flask framework
- **Database**: MySQL
- **Authentication**: Flask-Login
- **UI Components**: Custom CSS with responsive design

## Installation

### Prerequisites

- Python 3.7 or higher
- MySQL 5.7 or higher
- pip (Python package manager)

### Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/medshop-zenith.git
   cd medshop-zenith
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Set up the database:
   - Create a MySQL database named `medshop_zenith`
   - Import the database schema from `database/schema.sql`
   - Update the database connection details in `db_config.py`

6. Run the application:
   ```
   python app.py
   ```

7. Access the application in your web browser at `http://localhost:5000`

## Project Structure

```
medshop_zenith/
├── app.py                  # Main application file
├── db_config.py            # Database configuration
├── requirements.txt        # Python dependencies
├── static/                 # Static files
│   ├── styles.css          # Main CSS file
│   ├── supplier-styles.css # Supplier-specific styles
│   ├── inventory-styles.css # Inventory-specific styles
│   ├── notifications.css   # Notification styles
│   ├── script.js           # Main JavaScript file
│   └── crud.js             # CRUD operations JavaScript
├── templates/              # HTML templates
│   ├── base.html           # Base template
│   ├── dashboard.html      # Dashboard template
│   ├── inventory_crud.html # Inventory management template
│   ├── login.html          # Login template
│   ├── register.html       # Registration template
│   ├── reports.html        # Reports template
│   ├── sale.html           # Sales template
│   ├── suppliers.html      # Supplier management template
│   └── users.html          # User management template
└── database/               # Database files
    └── schema.sql          # Database schema
```

## API Endpoints

### Medicine Endpoints

- `GET /api/medicines` - Get all medicines
- `GET /api/medicine/<id>` - Get a specific medicine
- `POST /api/medicine` - Add a new medicine
- `PUT /api/medicine/<id>` - Update a medicine
- `DELETE /api/medicine/<id>` - Delete a medicine

### Supplier Endpoints

- `GET /api/suppliers` - Get all suppliers
- `GET /api/supplier/<id>` - Get a specific supplier
- `POST /api/supplier` - Add a new supplier
- `PUT /api/supplier/<id>` - Update a supplier
- `DELETE /api/supplier/<id>` - Delete a supplier

## Usage

### Login

- Use the default admin account:
  - Username: admin
  - Password: admin123
- Or register a new user account

### Inventory Management

1. Navigate to the Inventory page
2. Use the "Add Medicine" button to add new medicines
3. Use the edit and delete buttons to modify existing medicines
4. Use the search and filter options to find specific medicines

### Supplier Management

1. Navigate to the Suppliers page
2. Use the "Add Supplier" button to add new suppliers
3. Use the view, edit, and delete buttons to manage existing suppliers
4. Use the search functionality to find specific suppliers

### Sales Processing

1. Navigate to the Sales page
2. Select medicines from the inventory
3. Add customer details
4. Apply discounts if needed
5. Process the sale and generate an invoice

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request
##done by :
karthik pranav sivaraj
in an attempt of academic project 

## Acknowledgements

- Font Awesome for icons
- MySQL for database management
- Flask for the web framework
