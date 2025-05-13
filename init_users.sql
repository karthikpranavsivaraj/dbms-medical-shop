-- Initialize Users table with default admin user
-- Password: admin123 (hashed)

-- Check if Users table exists


-- Insert default admin user if not exists
INSERT INTO Users (Username, HashedPassword, Role)
SELECT 'admin', '$pbkdf2-sha256$29000$PIdwDqH03hvjXAuhlLL2Pg$1t8iyB2A.WF/Z5JZv.lfCBPNM3nscfAko1IaRbjVN7I', 'Admin'
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE Username = 'admin');

-- Insert default pharmacist user if not exists
INSERT INTO Users (Username, HashedPassword, Role)
SELECT 'pharmacist', '$pbkdf2-sha256$29000$PIdwDqH03hvjXAuhlLL2Pg$1t8iyB2A.WF/Z5JZv.lfCBPNM3nscfAko1IaRbjVN7I', 'Pharmacist'
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE Username = 'pharmacist');

-- Note: Both users have the password 'admin123'
-- In a production environment, you should use different passwords for each user