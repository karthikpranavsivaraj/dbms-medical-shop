-- Medical Shop Management System - Full MySQL Script
-- Generated on 2025-05-07 14:51:16

-- Create database
CREATE DATABASE IF NOT EXISTS MedicalShopDB;
USE MedicalShopDB;
-- also its safe to ensure that if any table references a foreign key in another table, that table being refered should be included first before the table that refers--
-- 1. Inventory Management
CREATE TABLE IF NOT EXISTS Medicines (
    MedicineID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    Specification VARCHAR(50),
    CompanyName VARCHAR(100),
    BatchNumber VARCHAR(50),
    ExpiryDate DATE,
    StockQuantity INT,
    UnitPrice DECIMAL(10, 2),
    Form VARCHAR(50),
    RackLocation VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerName VARCHAR(100),
    PhoneNumber VARCHAR(15),
    CustomerAddress VARCHAR(255),
    Email VARCHAR(100)
);

-- 2. Sales Management
CREATE TABLE IF NOT EXISTS Sales (
    SaleID INT AUTO_INCREMENT PRIMARY KEY,
    DateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    CustomerID INT,
    Discount DECIMAL(10,2),
    Tax DECIMAL(10,2),
    TotalAmount DECIMAL(10, 2),
    PaymentMethod VARCHAR(50),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE IF NOT EXISTS SaleItems (
    SaleItemID INT AUTO_INCREMENT PRIMARY KEY,
    SaleID INT,
    MedicineID INT,
    Quantity INT,
    UnitPrice DECIMAL(10, 2),
    FOREIGN KEY (SaleID) REFERENCES Sales(SaleID),
    FOREIGN KEY (MedicineID) REFERENCES Medicines(MedicineID)
);

-- 3. Purchase Management
CREATE TABLE IF NOT EXISTS Suppliers (
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierName VARCHAR(100),
    ContactNumber VARCHAR(15),
    SupplierAddress VARCHAR(255),
    Email VARCHAR(100),
    SupplierRating DECIMAL(3,2)
);

CREATE TABLE IF NOT EXISTS Purchases (
    PurchaseID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierID INT,
    DateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    TotalPurchaseAmount DECIMAL(10,2),
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

CREATE TABLE IF NOT EXISTS PurchaseItems (
    PurchaseItemID INT AUTO_INCREMENT PRIMARY KEY,
    PurchaseID INT,
    MedicineID INT,
    Quantity INT,
    PurchasePrice DECIMAL(10, 2),
    FOREIGN KEY (PurchaseID) REFERENCES Purchases(PurchaseID),
    FOREIGN KEY (MedicineID) REFERENCES Medicines(MedicineID)
);

-- 4. Customer Management


-- 5. Prescription Table (optional)
CREATE TABLE IF NOT EXISTS Prescriptions (
    PrescriptionID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT,
    MedicineID INT,
    Dosage VARCHAR(100),
    Instructions TEXT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (MedicineID) REFERENCES Medicines(MedicineID)
);

-- 6. Reports: Views for easy reporting
CREATE VIEW DailySalesReport AS
SELECT DATE(DateTime) AS SaleDate, SUM(TotalAmount) AS TotalSales
FROM Sales GROUP BY DATE(DateTime);

CREATE VIEW StockReport AS
SELECT * FROM Medicines
WHERE StockQuantity < 10;

CREATE VIEW ExpiryReport AS
SELECT * FROM Medicinespurchases
WHERE ExpiryDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY);

-- 7. User Management & RBAC
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    HashedPassword VARCHAR(255),
    Role ENUM('Admin', 'Pharmacist'),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastLogin TIMESTAMP NULL
);
