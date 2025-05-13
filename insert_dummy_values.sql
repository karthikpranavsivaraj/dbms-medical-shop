INSERT INTO Medicines (title, Specification, CompanyName, BatchNumber, ExpiryDate, StockQuantity, UnitPrice, Form, RackLocation)
VALUES 
('Paracetamol', '500mg', 'Cipla', 'B001', '2026-05-30', 200, 1.50, 'Tablet', 'R1'),
('Amoxicillin', '250mg', 'Sun Pharma', 'B002', '2025-11-15', 150, 2.00, 'Capsule', 'R2'),
('Cough Syrup', '100ml', 'Himalaya', 'B003', '2025-09-01', 80, 3.75, 'Syrup', 'R3'),
('Ibuprofen', '400mg', 'Pfizer', 'B004', '2026-01-10', 120, 1.80, 'Tablet', 'R1'),
('Metformin', '500mg', 'Abbott', 'B005', '2027-03-20', 90, 2.10, 'Tablet', 'R2');

INSERT INTO Customers (CustomerName, PhoneNumber, CustomerAddress, Email)
VALUES 
('Ravi Kumar', '9876543210', 'Chennai, TN', 'ravi@example.com'),
('Sita Devi', '7894561230', 'Coimbatore, TN', 'sita@example.com'),
('John Paul', '9873214560', 'Delhi, DL', 'john@example.com'),
('Meera Das', '7891236540', 'Mumbai, MH', 'meera@example.com'),
('Ajay Varma', '7654321098', 'Bangalore, KA', 'ajay@example.com');

INSERT INTO Suppliers (SupplierName, ContactNumber, SupplierAddress, Email, SupplierRating)
VALUES 
('Cipla Distributors', '9988776655', 'Chennai, TN', 'cipla@supply.com', 4.5),
('Sun Pharma Distributors', '8877665544', 'Delhi, DL', 'sun@supply.com', 4.2),
('Himalaya Medicals', '7766554433', 'Bangalore, KA', 'himalaya@supply.com', 4.7),
('Pfizer Pharma', '6655443322', 'Hyderabad, TS', 'pfizer@supply.com', 4.8),
('Abbott Agents', '5544332211', 'Pune, MH', 'abbott@supply.com', 4.3);

INSERT INTO Purchases (SupplierID, TotalPurchaseAmount)
VALUES 
(1, 300.00),
(2, 250.00),
(3, 150.00),
(4, 220.00),
(5, 180.00);

INSERT INTO PurchaseItems (PurchaseID, MedicineID, Quantity, PurchasePrice)
VALUES 
(1, 1, 100, 1.20),
(2, 2, 80, 1.60),
(3, 3, 50, 3.00),
(4, 4, 70, 1.50),
(5, 5, 60, 1.80);

INSERT INTO Purchases (SupplierID, TotalPurchaseAmount)
VALUES 
(1, 300.00),
(2, 250.00),
(3, 150.00),
(4, 220.00),
(5, 180.00);

INSERT INTO Sales (CustomerID, Discount, Tax, TotalAmount, PaymentMethod)
VALUES 
(1, 2.00, 1.50, 20.00, 'UPI'),
(2, 0.00, 2.00, 30.00, 'Cash'),
(3, 1.50, 1.00, 25.00, 'Card'),
(4, 0.00, 0.00, 15.00, 'Cash'),
(5, 2.00, 1.00, 18.00, 'UPI');


INSERT INTO SaleItems (SaleID, MedicineID, Quantity, UnitPrice)
VALUES 
(1, 1, 5, 1.50),
(2, 2, 4, 2.00),
(3, 3, 2, 3.75),
(4, 4, 3, 1.80),
(5, 5, 4, 2.10);
