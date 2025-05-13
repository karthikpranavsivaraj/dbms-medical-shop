/**
 * MedShop Zenith - CRUD Operations
 * This file contains functions for Create, Read, Update, and Delete operations
 * for the main entities in the medical shop management system.
 */

// Create a namespace for our CRUD operations
const MedShopCRUD = {
    // Medicine CRUD operations
    getAllMedicines: async function() {
        try {
            const response = await fetch('/api/medicines');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching medicines:', error);
            this.showNotification('Error fetching medicines', 'error');
            return [];
        }
    },
    
    getMedicine: async function(id) {
        try {
            const response = await fetch(`/api/medicine/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching medicine ${id}:`, error);
            this.showNotification(`Error fetching medicine details`, 'error');
            return null;
        }
    },
    
    addMedicine: async function(medicineData) {
        try {
            const response = await fetch('/api/medicine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(medicineData),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || `HTTP error! Status: ${response.status}`);
            }
            
            this.showNotification('Medicine added successfully', 'success');
            return result;
        } catch (error) {
            console.error('Error adding medicine:', error);
            this.showNotification(`Error adding medicine: ${error.message}`, 'error');
            throw error;
        }
    },
    
    updateMedicine: async function(id, medicineData) {
        try {
            const response = await fetch(`/api/medicine/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(medicineData),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || `HTTP error! Status: ${response.status}`);
            }
            
            this.showNotification('Medicine updated successfully', 'success');
            return result;
        } catch (error) {
            console.error(`Error updating medicine ${id}:`, error);
            this.showNotification(`Error updating medicine: ${error.message}`, 'error');
            throw error;
        }
    },
    
    deleteMedicine: async function(id) {
        try {
            const response = await fetch(`/api/medicine/${id}`, {
                method: 'DELETE',
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || `HTTP error! Status: ${response.status}`);
            }
            
            this.showNotification('Medicine deleted successfully', 'success');
            return result;
        } catch (error) {
            console.error(`Error deleting medicine ${id}:`, error);
            this.showNotification(`Error deleting medicine: ${error.message}`, 'error');
            throw error;
        }
    },
    
    // Supplier CRUD operations
    getAllSuppliers: async function() {
        try {
            const response = await fetch('/api/suppliers');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            this.showNotification('Error fetching suppliers', 'error');
            return [];
        }
    },
    
    getSupplier: async function(id) {
        try {
            const response = await fetch(`/api/supplier/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching supplier ${id}:`, error);
            this.showNotification(`Error fetching supplier details`, 'error');
            return null;
        }
    },
    
    addSupplier: async function(supplierData) {
        try {
            const response = await fetch('/api/supplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplierData),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || `HTTP error! Status: ${response.status}`);
            }
            
            this.showNotification('Supplier added successfully', 'success');
            return result;
        } catch (error) {
            console.error('Error adding supplier:', error);
            this.showNotification(`Error adding supplier: ${error.message}`, 'error');
            throw error;
        }
    },
    
    updateSupplier: async function(id, supplierData) {
        try {
            const response = await fetch(`/api/supplier/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplierData),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || `HTTP error! Status: ${response.status}`);
            }
            
            this.showNotification('Supplier updated successfully', 'success');
            return result;
        } catch (error) {
            console.error(`Error updating supplier ${id}:`, error);
            this.showNotification(`Error updating supplier: ${error.message}`, 'error');
            throw error;
        }
    },
    
    deleteSupplier: async function(id) {
        try {
            const response = await fetch(`/api/supplier/${id}`, {
                method: 'DELETE',
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || `HTTP error! Status: ${response.status}`);
            }
            
            this.showNotification('Supplier deleted successfully', 'success');
            return result;
        } catch (error) {
            console.error(`Error deleting supplier ${id}:`, error);
            this.showNotification(`Error deleting supplier: ${error.message}`, 'error');
            throw error;
        }
    },
    
    // Utility functions
    showNotification: function(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Add icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="close-notification"><i class="fas fa-times"></i></button>
        `;
        
        // Add to document
        const notificationContainer = document.querySelector('.notification-container') || (() => {
            const container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
            return container;
        })();
        
        notificationContainer.appendChild(notification);
        
        // Add close button functionality
        notification.querySelector('.close-notification').addEventListener('click', function() {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
};

// For backward compatibility
async function getAllMedicines() {
    return await MedShopCRUD.getAllMedicines();
}

async function getMedicine(id) {
    return await MedShopCRUD.getMedicine(id);
}

async function addMedicine(medicineData) {
    return await MedShopCRUD.addMedicine(medicineData);
}

async function updateMedicine(id, medicineData) {
    return await MedShopCRUD.updateMedicine(id, medicineData);
}

async function deleteMedicine(id) {
    return await MedShopCRUD.deleteMedicine(id);
}

// ==================== Customers CRUD Operations ====================

/**
 * Fetch all customers from the API
 * @returns {Promise} Promise object representing the customers data
 */
async function getAllCustomers() {
    try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching customers:', error);
        showNotification('Error fetching customers', 'error');
        return [];
    }
}

/**
 * Fetch a single customer by ID
 * @param {number} id - The customer ID
 * @returns {Promise} Promise object representing the customer data
 */
async function getCustomer(id) {
    try {
        const response = await fetch(`/api/customer/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching customer ${id}:`, error);
        showNotification(`Error fetching customer details`, 'error');
        return null;
    }
}

/**
 * Add a new customer
 * @param {Object} customerData - The customer data
 * @returns {Promise} Promise object representing the result of the operation
 */
async function addCustomer(customerData) {
    try {
        const response = await fetch('/api/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Customer added successfully', 'success');
        return result;
    } catch (error) {
        console.error('Error adding customer:', error);
        showNotification(`Error adding customer: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Update an existing customer
 * @param {number} id - The customer ID
 * @param {Object} customerData - The updated customer data
 * @returns {Promise} Promise object representing the result of the operation
 */
async function updateCustomer(id, customerData) {
    try {
        const response = await fetch(`/api/customer/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Customer updated successfully', 'success');
        return result;
    } catch (error) {
        console.error(`Error updating customer ${id}:`, error);
        showNotification(`Error updating customer: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Delete a customer
 * @param {number} id - The customer ID
 * @returns {Promise} Promise object representing the result of the operation
 */
async function deleteCustomer(id) {
    try {
        const response = await fetch(`/api/customer/${id}`, {
            method: 'DELETE',
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Customer deleted successfully', 'success');
        return result;
    } catch (error) {
        console.error(`Error deleting customer ${id}:`, error);
        showNotification(`Error deleting customer: ${error.message}`, 'error');
        throw error;
    }
}

// ==================== Suppliers CRUD Operations ====================

/**
 * Fetch all suppliers from the API
 * @returns {Promise} Promise object representing the suppliers data
 */
async function getAllSuppliers() {
    try {
        const response = await fetch('/api/suppliers');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        showNotification('Error fetching suppliers', 'error');
        return [];
    }
}

/**
 * Fetch a single supplier by ID
 * @param {number} id - The supplier ID
 * @returns {Promise} Promise object representing the supplier data
 */
async function getSupplier(id) {
    try {
        const response = await fetch(`/api/supplier/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching supplier ${id}:`, error);
        showNotification(`Error fetching supplier details`, 'error');
        return null;
    }
}

/**
 * Add a new supplier
 * @param {Object} supplierData - The supplier data
 * @returns {Promise} Promise object representing the result of the operation
 */
async function addSupplier(supplierData) {
    try {
        const response = await fetch('/api/supplier', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Supplier added successfully', 'success');
        return result;
    } catch (error) {
        console.error('Error adding supplier:', error);
        showNotification(`Error adding supplier: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Update an existing supplier
 * @param {number} id - The supplier ID
 * @param {Object} supplierData - The updated supplier data
 * @returns {Promise} Promise object representing the result of the operation
 */
async function updateSupplier(id, supplierData) {
    try {
        const response = await fetch(`/api/supplier/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Supplier updated successfully', 'success');
        return result;
    } catch (error) {
        console.error(`Error updating supplier ${id}:`, error);
        showNotification(`Error updating supplier: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Delete a supplier
 * @param {number} id - The supplier ID
 * @returns {Promise} Promise object representing the result of the operation
 */
async function deleteSupplier(id) {
    try {
        const response = await fetch(`/api/supplier/${id}`, {
            method: 'DELETE',
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Supplier deleted successfully', 'success');
        return result;
    } catch (error) {
        console.error(`Error deleting supplier ${id}:`, error);
        showNotification(`Error deleting supplier: ${error.message}`, 'error');
        throw error;
    }
}

// ==================== Sales CRUD Operations ====================

/**
 * Fetch all sales from the API
 * @returns {Promise} Promise object representing the sales data
 */
async function getAllSales() {
    try {
        const response = await fetch('/api/sales');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching sales:', error);
        showNotification('Error fetching sales', 'error');
        return [];
    }
}

/**
 * Fetch a single sale by ID
 * @param {number} id - The sale ID
 * @returns {Promise} Promise object representing the sale data
 */
async function getSale(id) {
    try {
        const response = await fetch(`/api/sale/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching sale ${id}:`, error);
        showNotification(`Error fetching sale details`, 'error');
        return null;
    }
}

/**
 * Add a new sale
 * @param {Object} saleData - The sale data
 * @returns {Promise} Promise object representing the result of the operation
 */
async function addSale(saleData) {
    try {
        const response = await fetch('/api/sale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saleData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Sale added successfully', 'success');
        return result;
    } catch (error) {
        console.error('Error adding sale:', error);
        showNotification(`Error adding sale: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Update an existing sale
 * @param {number} id - The sale ID
 * @param {Object} saleData - The updated sale data
 * @returns {Promise} Promise object representing the result of the operation
 */
async function updateSale(id, saleData) {
    try {
        const response = await fetch(`/api/sale/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saleData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Sale updated successfully', 'success');
        return result;
    } catch (error) {
        console.error(`Error updating sale ${id}:`, error);
        showNotification(`Error updating sale: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Delete a sale
 * @param {number} id - The sale ID
 * @returns {Promise} Promise object representing the result of the operation
 */
async function deleteSale(id) {
    try {
        const response = await fetch(`/api/sale/${id}`, {
            method: 'DELETE',
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Sale deleted successfully', 'success');
        return result;
    } catch (error) {
        console.error(`Error deleting sale ${id}:`, error);
        showNotification(`Error deleting sale: ${error.message}`, 'error');
        throw error;
    }
}

// ==================== Purchases CRUD Operations ====================

/**
 * Fetch all purchases from the API
 * @returns {Promise} Promise object representing the purchases data
 */
async function getAllPurchases() {
    try {
        const response = await fetch('/api/purchases');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching purchases:', error);
        showNotification('Error fetching purchases', 'error');
        return [];
    }
}

/**
 * Fetch a single purchase by ID
 * @param {number} id - The purchase ID
 * @returns {Promise} Promise object representing the purchase data
 */
async function getPurchase(id) {
    try {
        const response = await fetch(`/api/purchase/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching purchase ${id}:`, error);
        showNotification(`Error fetching purchase details`, 'error');
        return null;
    }
}

/**
 * Add a new purchase
 * @param {Object} purchaseData - The purchase data
 * @returns {Promise} Promise object representing the result of the operation
 */
async function addPurchase(purchaseData) {
    try {
        const response = await fetch('/api/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Purchase added successfully', 'success');
        return result;
    } catch (error) {
        console.error('Error adding purchase:', error);
        showNotification(`Error adding purchase: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Update an existing purchase
 * @param {number} id - The purchase ID
 * @param {Object} purchaseData - The updated purchase data
 * @returns {Promise} Promise object representing the result of the operation
 */
async function updatePurchase(id, purchaseData) {
    try {
        const response = await fetch(`/api/purchase/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Purchase updated successfully', 'success');
        return result;
    } catch (error) {
        console.error(`Error updating purchase ${id}:`, error);
        showNotification(`Error updating purchase: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Delete a purchase
 * @param {number} id - The purchase ID
 * @returns {Promise} Promise object representing the result of the operation
 */
async function deletePurchase(id) {
    try {
        const response = await fetch(`/api/purchase/${id}`, {
            method: 'DELETE',
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Purchase deleted successfully', 'success');
        return result;
    } catch (error) {
        console.error(`Error deleting purchase ${id}:`, error);
        showNotification(`Error deleting purchase: ${error.message}`, 'error');
        throw error;
    }
}

// ==================== Prescriptions CRUD Operations ====================

/**
 * Fetch all prescriptions from the API
 * @returns {Promise} Promise object representing the prescriptions data
 */
async function getAllPrescriptions() {
    try {
        const response = await fetch('/api/prescriptions');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        showNotification('Error fetching prescriptions', 'error');
        return [];
    }
}

/**
 * Fetch a single prescription by ID
 * @param {number} id - The prescription ID
 * @returns {Promise} Promise object representing the prescription data
 */
async function getPrescription(id) {
    try {
        const response = await fetch(`/api/prescription/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching prescription ${id}:`, error);
        showNotification(`Error fetching prescription details`, 'error');
        return null;
    }
}

/**
 * Add a new prescription
 * @param {Object} prescriptionData - The prescription data
 * @returns {Promise} Promise object representing the result of the operation
 */
async function addPrescription(prescriptionData) {
    try {
        const response = await fetch('/api/prescription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prescriptionData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Prescription added successfully', 'success');
        return result;
    } catch (error) {
        console.error('Error adding prescription:', error);
        showNotification(`Error adding prescription: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Update an existing prescription
 * @param {number} id - The prescription ID
 * @param {Object} prescriptionData - The updated prescription data
 * @returns {Promise} Promise object representing the result of the operation
 */
async function updatePrescription(id, prescriptionData) {
    try {
        const response = await fetch(`/api/prescription/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prescriptionData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Prescription updated successfully', 'success');
        return result;
    } catch (error) {
        console.error(`Error updating prescription ${id}:`, error);
        showNotification(`Error updating prescription: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Delete a prescription
 * @param {number} id - The prescription ID
 * @returns {Promise} Promise object representing the result of the operation
 */
async function deletePrescription(id) {
    try {
        const response = await fetch(`/api/prescription/${id}`, {
            method: 'DELETE',
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `HTTP error! Status: ${response.status}`);
        }
        
        showNotification('Prescription deleted successfully', 'success');
        return result;
    } catch (error) {
        console.error(`Error deleting prescription ${id}:`, error);
        showNotification(`Error deleting prescription: ${error.message}`, 'error');
        throw error;
    }
}

// ==================== Utility Functions ====================

/**
 * Show a notification to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning, info)
 */
function showNotification(message, type = 'info') {
    // Check if the notification container exists
    let container = document.getElementById('notification-container');
    
    // If not, create it
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '1000';
        document.body.appendChild(container);
    }
    
    // Create the notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getIconForType(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Style the notification
    notification.style.backgroundColor = getColorForType(type);
    notification.style.color = '#fff';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '4px';
    notification.style.marginBottom = '10px';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.style.display = 'flex';
    notification.style.justifyContent = 'space-between';
    notification.style.alignItems = 'center';
    notification.style.minWidth = '300px';
    notification.style.maxWidth = '400px';
    notification.style.animation = 'slideIn 0.3s ease-out forwards';
    
    // Add the notification to the container
    container.appendChild(notification);
    
    // Add click event to close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode === container) {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode === container) {
                    container.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
    
    // Add CSS animations if they don't exist
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Get the appropriate icon for the notification type
 * @param {string} type - The type of notification
 * @returns {string} The icon class
 */
function getIconForType(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'info': 
        default: return 'fa-info-circle';
    }
}

/**
 * Get the appropriate color for the notification type
 * @param {string} type - The type of notification
 * @returns {string} The color
 */
function getColorForType(type) {
    switch (type) {
        case 'success': return '#2ecc71';
        case 'error': return '#e74c3c';
        case 'warning': return '#f39c12';
        case 'info': 
        default: return '#3498db';
    }
}

// Export all functions for use in other files
window.MedShopCRUD = {
    // Medicines
    getAllMedicines,
    getMedicine,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    
    // Customers
    getAllCustomers,
    getCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    
    // Suppliers
    getAllSuppliers,
    getSupplier,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    
    // Sales
    getAllSales,
    getSale,
    addSale,
    updateSale,
    deleteSale,
    
    // Purchases
    getAllPurchases,
    getPurchase,
    addPurchase,
    updatePurchase,
    deletePurchase,
    
    // Prescriptions
    getAllPrescriptions,
    getPrescription,
    addPrescription,
    updatePrescription,
    deletePrescription,
    
    // Utilities
    showNotification
};