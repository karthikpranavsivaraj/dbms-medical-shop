DELIMITER $$

CREATE PROCEDURE MakeSale(
    IN in_customerID INT,
    IN in_medicineID INT,
    IN in_quantity INT,
    IN in_unitPrice DECIMAL(10, 2),
    IN in_discount DECIMAL(10, 2),
    IN in_tax DECIMAL(10, 2),
    IN in_paymentMethod VARCHAR(50)
)
BEGIN
    DECLARE sale_total DECIMAL(10, 2);
    DECLARE current_stock INT;

    START TRANSACTION;

    SELECT StockQuantity INTO current_stock
    FROM Medicines
    WHERE MedicineID = in_medicineID FOR UPDATE;

    IF current_stock < in_quantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock';
    END IF;

    SET sale_total = (in_quantity * in_unitPrice) - in_discount + in_tax;

    INSERT INTO Sales (CustomerID, Discount, Tax, TotalAmount, PaymentMethod)
    VALUES (in_customerID, in_discount, in_tax, sale_total, in_paymentMethod);

    SET @lastSaleID = LAST_INSERT_ID();

    INSERT INTO SaleItems (SaleID, MedicineID, Quantity, UnitPrice)
    VALUES (@lastSaleID, in_medicineID, in_quantity, in_unitPrice);

    UPDATE Medicines
    SET StockQuantity = StockQuantity - in_quantity
    WHERE MedicineID = in_medicineID;

    COMMIT;
END$$

DELIMITER ;
