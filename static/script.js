// MedShop Zenith - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Close alert messages
    const closeButtons = document.querySelectorAll('.close-alert');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const alert = this.closest('.alert');
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.style.display = 'none';
            }, 300);
        });
    });

    // Sale form calculations
    const saleForm = document.querySelector('form');
    if (saleForm && saleForm.querySelector('#quantity') && saleForm.querySelector('#unitPrice')) {
        const quantityInput = document.getElementById('quantity');
        const unitPriceInput = document.getElementById('unitPrice');
        const discountInput = document.getElementById('discount');
        const taxInput = document.getElementById('tax');
        
        const subtotalElement = document.getElementById('subtotal');
        const discountAmountElement = document.getElementById('discount-amount');
        const taxAmountElement = document.getElementById('tax-amount');
        const totalAmountElement = document.getElementById('total-amount');
        
        // Function to calculate and update totals
        function updateTotals() {
            const quantity = parseFloat(quantityInput.value) || 0;
            const unitPrice = parseFloat(unitPriceInput.value) || 0;
            const discountPercent = parseFloat(discountInput.value) || 0;
            const taxPercent = parseFloat(taxInput.value) || 0;
            
            const subtotal = quantity * unitPrice;
            const discountAmount = (subtotal * discountPercent) / 100;
            const afterDiscount = subtotal - discountAmount;
            const taxAmount = (afterDiscount * taxPercent) / 100;
            const total = afterDiscount + taxAmount;
            
            // Update the display
            subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
            discountAmountElement.textContent = `-₹${discountAmount.toFixed(2)}`;
            taxAmountElement.textContent = `₹${taxAmount.toFixed(2)}`;
            totalAmountElement.textContent = `₹${total.toFixed(2)}`;
        }
        
        // Add event listeners to inputs
        [quantityInput, unitPriceInput, discountInput, taxInput].forEach(input => {
            input.addEventListener('input', updateTotals);
        });
        
        // Initialize medicine selection with price auto-fill
        const medicineSelect = document.getElementById('medicineID');
        if (medicineSelect) {
            medicineSelect.addEventListener('change', function() {
                // In a real application, you would fetch the price from the server
                // This is a simplified example that uses the API endpoint we created
                const selectedOption = this.options[this.selectedIndex];
                if (selectedOption && selectedOption.value) {
                    // Try to fetch the medicine price from our API
                    fetch(`/api/medicine/${selectedOption.value}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data && data.UnitPrice) {
                                unitPriceInput.value = data.UnitPrice;
                            } else {
                                // Fallback to a random price if API fails
                                const demoPrice = (Math.random() * 100 + 50).toFixed(2);
                                unitPriceInput.value = demoPrice;
                            }
                            updateTotals();
                        })
                        .catch(error => {
                            console.error('Error fetching medicine data:', error);
                            // Fallback to a random price
                            const demoPrice = (Math.random() * 100 + 50).toFixed(2);
                            unitPriceInput.value = demoPrice;
                            updateTotals();
                        });
                }
            });
        }
    }
    
    // Date range selector
    const dateRangeSelect = document.getElementById('date-range');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            // In a real application, this would trigger a data refresh
            console.log('Date range changed to:', this.value);
            // You could make an AJAX call here to update the dashboard data
        });
    }
    
    // Mobile navigation toggle
    const createMobileNav = () => {
        const header = document.querySelector('.main-header');
        if (!header) return;
        
        // Only create if it doesn't exist and we're in mobile view
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-nav-toggle')) {
            const navToggle = document.createElement('button');
            navToggle.className = 'mobile-nav-toggle';
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            const brand = document.querySelector('.brand');
            if (brand && brand.parentNode) {
                const container = document.createElement('div');
                container.className = 'header-top';
                container.appendChild(brand.cloneNode(true));
                container.appendChild(navToggle);
                
                header.insertBefore(container, header.firstChild);
                brand.style.display = 'none';
                
                const nav = document.querySelector('.main-nav');
                if (nav) {
                    nav.classList.add('mobile-hidden');
                    
                    navToggle.addEventListener('click', function() {
                        nav.classList.toggle('mobile-hidden');
                        this.innerHTML = nav.classList.contains('mobile-hidden') 
                            ? '<i class="fas fa-bars"></i>' 
                            : '<i class="fas fa-times"></i>';
                    });
                }
            }
        }
    };
    
    // Call once on load and add resize listener
    createMobileNav();
    window.addEventListener('resize', createMobileNav);
    
    // Add animation classes to cards for staggered entrance
    const animateCards = () => {
        const cards = document.querySelectorAll('.card, .action-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    };
    
    animateCards();
    
    // Inventory page - Select all checkbox functionality
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        const rowCheckboxes = document.querySelectorAll('.row-select');
        
        selectAllCheckbox.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
        
        // Update "select all" checkbox when individual checkboxes change
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
                const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
                
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = someChecked && !allChecked;
            });
        });
    }
    
    // Inventory search functionality
    const searchInput = document.querySelector('.search-input input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('.data-table tbody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Reports page - Chart type toggle
    const chartTypeButtons = document.querySelectorAll('.chart-controls .btn-icon');
    chartTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            chartTypeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real application, you would change the chart type here
            const chartType = this.querySelector('i').classList.contains('fa-chart-line') ? 'line' : 'bar';
            console.log('Chart type changed to:', chartType);
            
            // Example of how you might update a Chart.js chart
            const salesChart = Chart.getChart('salesChart');
            if (salesChart) {
                salesChart.config.type = chartType;
                salesChart.update();
            }
        });
    });
    
    // Report type change handler
    const reportTypeSelect = document.getElementById('report-type');
    if (reportTypeSelect) {
        reportTypeSelect.addEventListener('change', function() {
            console.log('Report type changed to:', this.value);
            // In a real application, you would load different report data here
        });
    }
    
    // Password validation for registration form
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm_password');
    
    if (passwordField && confirmPasswordField) {
        const validatePassword = () => {
            if (passwordField.value !== confirmPasswordField.value) {
                confirmPasswordField.setCustomValidity('Passwords do not match');
            } else {
                confirmPasswordField.setCustomValidity('');
            }
        };
        
        passwordField.addEventListener('change', validatePassword);
        confirmPasswordField.addEventListener('keyup', validatePassword);
    }
    
    // Mobile-friendly user dropdown
    const userDropdownButton = document.querySelector('.user-dropdown .btn-icon');
    if (userDropdownButton) {
        userDropdownButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('show');
            
            // Close when clicking outside
            document.addEventListener('click', function closeDropdown(event) {
                if (!event.target.closest('.dropdown-menu') && !event.target.closest('.user-dropdown .btn-icon')) {
                    dropdown.classList.remove('show');
                    document.removeEventListener('click', closeDropdown);
                }
            });
        });
    }
});// MedShop Zenith - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Close alert messages
    const closeButtons = document.querySelectorAll('.close-alert');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const alert = this.closest('.alert');
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.style.display = 'none';
            }, 300);
        });
    });

    // Sale form calculations
    const saleForm = document.querySelector('form');
    if (saleForm && saleForm.querySelector('#quantity') && saleForm.querySelector('#unitPrice')) {
        const quantityInput = document.getElementById('quantity');
        const unitPriceInput = document.getElementById('unitPrice');
        const discountInput = document.getElementById('discount');
        const taxInput = document.getElementById('tax');
        
        const subtotalElement = document.getElementById('subtotal');
        const discountAmountElement = document.getElementById('discount-amount');
        const taxAmountElement = document.getElementById('tax-amount');
        const totalAmountElement = document.getElementById('total-amount');
        
        // Function to calculate and update totals
        function updateTotals() {
            const quantity = parseFloat(quantityInput.value) || 0;
            const unitPrice = parseFloat(unitPriceInput.value) || 0;
            const discountPercent = parseFloat(discountInput.value) || 0;
            const taxPercent = parseFloat(taxInput.value) || 0;
            
            const subtotal = quantity * unitPrice;
            const discountAmount = (subtotal * discountPercent) / 100;
            const afterDiscount = subtotal - discountAmount;
            const taxAmount = (afterDiscount * taxPercent) / 100;
            const total = afterDiscount + taxAmount;
            
            // Update the display
            subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
            discountAmountElement.textContent = `-₹${discountAmount.toFixed(2)}`;
            taxAmountElement.textContent = `₹${taxAmount.toFixed(2)}`;
            totalAmountElement.textContent = `₹${total.toFixed(2)}`;
        }
        
        // Add event listeners to inputs
        [quantityInput, unitPriceInput, discountInput, taxInput].forEach(input => {
            input.addEventListener('input', updateTotals);
        });
        
        // Initialize medicine selection with price auto-fill
        const medicineSelect = document.getElementById('medicineID');
        if (medicineSelect) {
            medicineSelect.addEventListener('change', function() {
                // In a real application, you would fetch the price from the server
                // This is a simplified example that uses the API endpoint we created
                const selectedOption = this.options[this.selectedIndex];
                if (selectedOption && selectedOption.value) {
                    // Try to fetch the medicine price from our API
                    fetch(`/api/medicine/${selectedOption.value}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data && data.UnitPrice) {
                                unitPriceInput.value = data.UnitPrice;
                            } else {
                                // Fallback to a random price if API fails
                                const demoPrice = (Math.random() * 100 + 50).toFixed(2);
                                unitPriceInput.value = demoPrice;
                            }
                            updateTotals();
                        })
                        .catch(error => {
                            console.error('Error fetching medicine data:', error);
                            // Fallback to a random price
                            const demoPrice = (Math.random() * 100 + 50).toFixed(2);
                            unitPriceInput.value = demoPrice;
                            updateTotals();
                        });
                }
            });
        }
    }
    
    // Date range selector
    const dateRangeSelect = document.getElementById('date-range');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            // In a real application, this would trigger a data refresh
            console.log('Date range changed to:', this.value);
            // You could make an AJAX call here to update the dashboard data
        });
    }
    
    // Mobile navigation toggle
    const createMobileNav = () => {
        const header = document.querySelector('.main-header');
        if (!header) return;
        
        // Only create if it doesn't exist and we're in mobile view
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-nav-toggle')) {
            const navToggle = document.createElement('button');
            navToggle.className = 'mobile-nav-toggle';
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            const brand = document.querySelector('.brand');
            if (brand && brand.parentNode) {
                const container = document.createElement('div');
                container.className = 'header-top';
                container.appendChild(brand.cloneNode(true));
                container.appendChild(navToggle);
                
                header.insertBefore(container, header.firstChild);
                brand.style.display = 'none';
                
                const nav = document.querySelector('.main-nav');
                if (nav) {
                    nav.classList.add('mobile-hidden');
                    
                    navToggle.addEventListener('click', function() {
                        nav.classList.toggle('mobile-hidden');
                        this.innerHTML = nav.classList.contains('mobile-hidden') 
                            ? '<i class="fas fa-bars"></i>' 
                            : '<i class="fas fa-times"></i>';
                    });
                }
            }
        }
    };
    
    // Call once on load and add resize listener
    createMobileNav();
    window.addEventListener('resize', createMobileNav);
    
    // Add animation classes to cards for staggered entrance
    const animateCards = () => {
        const cards = document.querySelectorAll('.card, .action-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    };
    
    animateCards();
    
    // Inventory page - Select all checkbox functionality
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        const rowCheckboxes = document.querySelectorAll('.row-select');
        
        selectAllCheckbox.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
        
        // Update "select all" checkbox when individual checkboxes change
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
                const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
                
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = someChecked && !allChecked;
            });
        });
    }
    
    // Inventory search functionality
    const searchInput = document.querySelector('.search-input input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('.data-table tbody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Reports page - Chart type toggle
    const chartTypeButtons = document.querySelectorAll('.chart-controls .btn-icon');
    chartTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            chartTypeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real application, you would change the chart type here
            const chartType = this.querySelector('i').classList.contains('fa-chart-line') ? 'line' : 'bar';
            console.log('Chart type changed to:', chartType);
            
            // Example of how you might update a Chart.js chart
            const salesChart = Chart.getChart('salesChart');
            if (salesChart) {
                salesChart.config.type = chartType;
                salesChart.update();
            }
        });
    });
    
    // Report type change handler
    const reportTypeSelect = document.getElementById('report-type');
    if (reportTypeSelect) {
        reportTypeSelect.addEventListener('change', function() {
            console.log('Report type changed to:', this.value);
            // In a real application, you would load different report data here
        });
    }
});