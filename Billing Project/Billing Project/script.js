        // Initialize menu items (stored in localStorage)
        let menuItems = [];
        let cart = [];
        let orders = [];

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            initializeMenu();
            loadCartFromStorage();
            loadOrdersFromStorage();
            displayMenu();
            setCurrentMonth();
        });

        // Initialize default menu items
        function initializeMenu() {
            const savedMenu = localStorage.getItem('menuItems');
            if (savedMenu) {
            //     menuItems = JSON.parse(savedMenu);
            // } else {
                // Default menu items without external images
                menuItems = [
                    { id: 1, name: 'Tea', price: 10.0, image_url: 'https://cdn2.foodviva.com/static-content/food-images/tea-recipes/milk-tea-recipe/milk-tea-recipe.jpg' },
                    { id: 2, name: 'Coffee', price: 15.0, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgqpEjWZM4UwJMAWrJkeSuyhnrWYfHvMdIKQ&s' },
                    { id: 3, name: 'Chocolate Biscuit', price: 20.0, image_url: 'https://www.healthyfood.com/wp-content/uploads/2016/11/Dark-hot-chocolate-1.jpg' },
                    { id: 4, name: 'Ragi Biscuit', price: 25.0, image_url: 'https://kiipfit.com/wp-content/uploads/2025/03/ragi-cookies-3.jpg' },
                    { id: 5, name: 'Vada', price: 15.0, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJ8OwO3WYSrA2AIQCn7xsKnUba-_BBOlWRg&s' },
                    { id: 6, name: 'Samosa', price: 20.0, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeYXBG4c4BsyyssXKix3ctaQy1JLC9DjYAiw&s' },
                    { id: 7, name: 'Aalu Samosa', price: 25.0, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjJeIJBo1GSphmXDx6h2z-7cfee7TYSDnHhA&s' },
                    { id: 8, name: 'Bajji', price: 30.0, image_url: 'https://www.shutterstock.com/image-photo/indian-food-raw-banana-bajji-600nw-1851016573.jpg' },
                    { id: 9, name: 'Horlics', price: 35.0, image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Mug_of_Horlicks.jpg' },
                    { id: 10, name: 'Boost', price: 25.0, image_url: 'https://b.zmtcdn.com/data/dish_photos/3e2/2ab5880e89701dfd9e9b367e6c0213e2.jpeg' }
                ];
                saveMenuToStorage();
            }
        }

        // Save menu to localStorage
        function saveMenuToStorage() {
            localStorage.setItem('menuItems', JSON.stringify(menuItems));
        }

        // Display menu items
        function displayMenu() {
            const menuGrid = document.getElementById('menuGrid');
            menuGrid.innerHTML = '';
            
            menuItems.forEach(item => {
                const menuCard = document.createElement('div');
                menuCard.className = 'menu-card';
                menuCard.onclick = () => addToCart(item);
                
                menuCard.innerHTML = `
                    <div class="menu-image">
                        ${item.image_url || item.image_path ? 
                            `<img src="${item.image_url || item.image_path}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                            ''}
                        <div class="menu-image-placeholder" style="${item.image_url || item.image_path ? 'display: none;' : 'display: flex;'} align-items: center; justify-content: center; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3)); border-radius: 10px; font-size: 2em; color: #667eea; font-weight: bold;">
                            ${item.name.charAt(0)}
                        </div>
                    </div>
                    <div class="menu-info">
                        <h3>${item.name}</h3>
                        <p class="menu-price">₹${item.price.toFixed(2)}</p>
                    </div>
                `;
                
                menuGrid.appendChild(menuCard);
            });
        }

        // Add item to cart
        function addToCart(item) {
            const existingItem = cart.find(cartItem => cartItem.id === item.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1
                });
            }
            
            updateCart();
            saveCartToStorage();
        }

        // Remove item from cart
        function removeFromCart(itemId) {
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
            saveCartToStorage();
        }

        // Update item quantity
        function updateQuantity(itemId, change) {
            const item = cart.find(cartItem => cartItem.id === itemId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(itemId);
                    return;
                }
                updateCart();
                saveCartToStorage();
            }
        }

        // Update cart display
        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Cart is empty</p>';
                cartTotal.textContent = '0.00';
                return;
            }
            
            let total = 0;
            cartItems.innerHTML = '';
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price.toFixed(2)} × ${item.quantity}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="btn-qty" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="btn-qty" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="btn-remove" onclick="removeFromCart(${item.id})">×</button>
                    </div>
                    <div class="cart-item-total">
                        ₹${itemTotal.toFixed(2)}
                    </div>
                `;
                
                cartItems.appendChild(cartItem);
            });
            
            cartTotal.textContent = total.toFixed(2);
        }

        // Clear cart
        function clearCart() {
            if (cart.length === 0) return;
            
            if (confirm('Are you sure you want to clear the cart?')) {
                cart = [];
                updateCart();
                saveCartToStorage();
            }
        }

        // Show QR code modal
        function showQRCode() {
            if (cart.length === 0) {
                alert('Cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('paymentAmount').textContent = total.toFixed(2);
            document.getElementById('qrModal').style.display = 'block';
        }

        // Close QR code modal
        function closeQRModal() {
            document.getElementById('qrModal').style.display = 'none';
        }

        // Complete payment
        function completePayment() {
            if (cart.length === 0) return;
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Save order
            const order = {
                id: Date.now(),
                date: new Date().toISOString(),
                items: JSON.parse(JSON.stringify(cart)),
                total: total
            };
            
            orders.push(order);
            saveOrdersToStorage();
            
            alert('Payment completed successfully!');
            cart = [];
            updateCart();
            saveCartToStorage();
            closeQRModal();
        }

        // Print bill
        function printBill() {
            if (cart.length === 0) {
                alert('Cart is empty!');
                return;
            }
            
            const billPrint = document.getElementById('billPrint');
            const billItems = document.getElementById('billItems');
            const billTotal = document.getElementById('billTotal');
            const billDate = document.getElementById('billDate');
            const billTime = document.getElementById('billTime');
            
            // Set date and time
            const now = new Date();
            billDate.textContent = now.toLocaleDateString();
            billTime.textContent = now.toLocaleTimeString();
            
            // Populate bill items
            billItems.innerHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price.toFixed(2)}</td>
                    <td>₹${itemTotal.toFixed(2)}</td>
                `;
                billItems.appendChild(row);
            });
            
            billTotal.textContent = total.toFixed(2);
            
            // Show and print
            billPrint.style.display = 'block';
            window.print();
            billPrint.style.display = 'none';
        }

        // Download bill as PDF
        function downloadBillPDF() {
            if (cart.length === 0) {
                alert('Cart is empty!');
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Colors
            const primaryColor = [102, 126, 234];
            const textColor = [51, 51, 51];

            // Get current date and time
            const now = new Date();
            const dateStr = now.toLocaleDateString();
            const timeStr = now.toLocaleTimeString();

            let yPos = 20;

            // Header
            doc.setFillColor(...primaryColor);
            doc.rect(0, 0, 210, 40, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('RG TEA SHOP', 105, 20, { align: 'center' });
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            doc.text('Bill Receipt', 105, 30, { align: 'center' });

            yPos = 50;

            // Bill Information
            doc.setTextColor(...textColor);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Date: ${dateStr}`, 20, yPos);
            doc.text(`Time: ${timeStr}`, 120, yPos);
            yPos += 15;

            // Table Header
            doc.setFillColor(...primaryColor);
            doc.roundedRect(20, yPos - 5, 170, 8, 0, 0, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('Item', 25, yPos);
            doc.text('Qty', 100, yPos);
            doc.text('Price', 130, yPos);
            doc.text('Total', 160, yPos);
            
            yPos += 8;

            // Bill Items
            doc.setTextColor(...textColor);
            doc.setFont('helvetica', 'normal');
            let total = 0;

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                // Alternate row colors
                if (index % 2 === 0) {
                    doc.setFillColor(248, 249, 250);
                } else {
                    doc.setFillColor(255, 255, 255);
                }
                doc.roundedRect(20, yPos - 3, 170, 7, 0, 0, 'F');

                doc.setFontSize(9);
                // Truncate long item names
                const itemName = doc.splitTextToSize(item.name, 60);
                doc.text(itemName, 25, yPos);
                doc.text(item.quantity.toString(), 100, yPos);
                doc.text(`₹${item.price.toFixed(2)}`, 130, yPos);
                doc.text(`₹${itemTotal.toFixed(2)}`, 160, yPos);
                
                yPos += 7;

                // Check if we need a new page
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
            });

            yPos += 5;

            // Total Line
            doc.setFillColor(240, 240, 240);
            doc.roundedRect(20, yPos - 3, 170, 8, 0, 0, 'F');
            
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('Grand Total', 25, yPos);
            doc.text(`₹${total.toFixed(2)}`, 160, yPos);
            
            yPos += 15;

            // Footer
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text('Thank you for your visit!', 105, yPos, { align: 'center' });

            // Generate filename
            const filename = `Bill_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}.pdf`;
            
            // Save the PDF
            doc.save(filename);
        }

        // Save cart to localStorage
        function saveCartToStorage() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Load cart from localStorage
        function loadCartFromStorage() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
                updateCart();
            }
        }

        // Save orders to localStorage
        function saveOrdersToStorage() {
            localStorage.setItem('orders', JSON.stringify(orders));
        }

        // Load orders from localStorage
        function loadOrdersFromStorage() {
            const savedOrders = localStorage.getItem('orders');
            if (savedOrders) {
                orders = JSON.parse(savedOrders);
            }
        }

        // Navigation functions
        function showBilling() {
            document.getElementById('billingSection').style.display = 'grid';
            document.getElementById('manageMenuSection').style.display = 'none';
            document.getElementById('salesReportSection').style.display = 'none';
            updateNavLinks('billing');
        }

        function showManageMenu() {
            document.getElementById('billingSection').style.display = 'none';
            document.getElementById('manageMenuSection').style.display = 'block';
            document.getElementById('salesReportSection').style.display = 'none';
            updateNavLinks('menu');
            displayMenuTable();
        }

        function showSalesReport() {
            document.getElementById('billingSection').style.display = 'none';
            document.getElementById('manageMenuSection').style.display = 'none';
            document.getElementById('salesReportSection').style.display = 'block';
            updateNavLinks('report');
        }

        function updateNavLinks(active) {
            const links = document.querySelectorAll('.nav-link');
            links.forEach(link => link.classList.remove('active'));
            if (active === 'billing') links[0].classList.add('active');
            if (active === 'menu') links[1].classList.add('active');
            if (active === 'report') links[2].classList.add('active');
        }

        // Menu Management
        function displayMenuTable() {
            const container = document.getElementById('menuTableContainer');
            let html = '<div style="overflow-x: auto;"><table style="width: 100%; min-width: 600px; border-collapse: collapse; background: rgba(255, 255, 255, 0.6); border-radius: 10px; overflow: hidden;"><thead><tr style="background: rgba(102, 126, 234, 0.8);"><th style="padding: 12px; color: #fff; text-align: left;">Icon</th><th style="padding: 12px; color: #fff; text-align: left;">Name</th><th style="padding: 12px; color: #fff; text-align: left;">Price</th><th style="padding: 12px; color: #fff; text-align: left;">Actions</th></tr></thead><tbody>';
            menuItems.forEach(item => {
                const hasImage = item.image_url || item.image_path;
                html += `<tr style="border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
                    <td style="padding: 12px;">
                        ${hasImage ? 
                            `<img src="${item.image_url || item.image_path}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                            ''}
                        <div style="width: 60px; height: 60px; ${hasImage ? 'display: none;' : 'display: flex;'} align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3)); border-radius: 8px; font-size: 24px; color: #667eea; font-weight: bold;">
                            ${item.name.charAt(0)}
                        </div>
                    </td>
                    <td style="padding: 12px; color: #000;">${item.name}</td>
                    <td style="padding: 12px; color: #d4af37;">₹${item.price.toFixed(2)}</td>
                    <td style="padding: 12px;">
                        <button class="btn btn-primary" onclick="editMenuItem(${item.id})" style="padding: 6px 12px; font-size: 0.85em; margin-right: 5px;">Edit</button>
                        <button class="btn" onclick="deleteMenuItem(${item.id})" style="padding: 6px 12px; font-size: 0.85em; background: rgba(220, 53, 69, 0.7); color: white; border: 1px solid rgba(255, 255, 255, 0.3);">Delete</button>
                    </td>
                </tr>`;
            });
            html += '</tbody></table></div>';
            container.innerHTML = html;
        }

        function showAddItemForm() {
            const name = prompt('Enter item name:');
            if (!name) return;
            const price = parseFloat(prompt('Enter price:'));
            if (isNaN(price)) return;
            const imageUrl = prompt('Enter image URL (or leave blank for no image):') || '';
            
            const newItem = {
                id: Date.now(),
                name: name,
                price: price,
                image_url: imageUrl
            };
            menuItems.push(newItem);
            saveMenuToStorage();
            displayMenu();
            displayMenuTable();
        }

        function editMenuItem(id) {
            const item = menuItems.find(i => i.id === id);
            if (!item) return;
            
            const name = prompt('Enter item name:', item.name);
            if (!name) return;
            const price = parseFloat(prompt('Enter price:', item.price));
            if (isNaN(price)) return;
            const imageUrl = prompt('Enter image URL (or leave blank to remove image):', item.image_url || item.image_path || '');
            
            item.name = name;
            item.price = price;
            if (imageUrl) {
                item.image_url = imageUrl;
            } else {
                item.image_url = '';
                item.image_path = '';
            }
            saveMenuToStorage();
            displayMenu();
            displayMenuTable();
        }

        function deleteMenuItem(id) {
            if (!confirm('Are you sure you want to delete this item?')) return;
            menuItems = menuItems.filter(i => i.id !== id);
            saveMenuToStorage();
            displayMenu();
            displayMenuTable();
        }

        // Sales Report
        function setCurrentMonth() {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            
            document.getElementById('startDate').value = formatDate(firstDay);
            document.getElementById('endDate').value = formatDate(lastDay);
        }

        function formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        function loadSalesReport() {
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            
            if (!startDate || !endDate) {
                alert('Please select start and end dates');
                return;
            }
            
            const filteredOrders = orders.filter(order => {
                const orderDate = new Date(order.date).toISOString().split('T')[0];
                return orderDate >= startDate && orderDate <= endDate;
            });
            
            let totalRevenue = 0;
            let itemWise = {};
            
            filteredOrders.forEach(order => {
                totalRevenue += order.total;
                order.items.forEach(item => {
                    if (!itemWise[item.name]) {
                        itemWise[item.name] = { quantity: 0, revenue: 0 };
                    }
                    itemWise[item.name].quantity += item.quantity;
                    itemWise[item.name].revenue += item.price * item.quantity;
                });
            });
            
            let html = `<div style="margin-bottom: 20px; background: rgba(255, 255, 255, 0.6); padding: 15px; border-radius: 10px;">
                <h3 style="color: #d4af37; margin-bottom: 10px; font-weight: 700;">Total Revenue: ₹${totalRevenue.toFixed(2)}</h3>
                <h3 style="color: #000; font-weight: 600;">Total Orders: ${filteredOrders.length}</h3>
            </div>`;
            
            html += '<h3 style="color: #000; margin-bottom: 15px; font-weight: 600;">Item-wise Sales:</h3><div style="overflow-x: auto;"><table style="width: 100%; min-width: 300px; border-collapse: collapse; margin-top: 10px; background: rgba(255, 255, 255, 0.6); border-radius: 10px; overflow: hidden;"><thead><tr style="background: rgba(102, 126, 234, 0.8);"><th style="padding: 12px; color: #fff; text-align: left;">Item</th><th style="padding: 12px; color: #fff; text-align: left;">Quantity</th><th style="padding: 12px; color: #fff; text-align: left;">Revenue</th></tr></thead><tbody>';
            
            Object.entries(itemWise).forEach(([name, data]) => {
                html += `<tr style="border-bottom: 1px solid rgba(0, 0, 0, 0.1);"><td style="padding: 12px; color: #000;">${name}</td><td style="padding: 12px; color: #000;">${data.quantity}</td><td style="padding: 12px; color: #d4af37; font-weight: 600;">₹${data.revenue.toFixed(2)}</td></tr>`;
            });
            
            html += '</tbody></table></div>';
            document.getElementById('salesReportContent').innerHTML = html;
            
            // Enable print and PDF download buttons and store report data
            document.getElementById('printReportBtn').disabled = false;
            document.getElementById('downloadPDFBtn').disabled = false;
            window.currentReportData = {
                startDate: startDate,
                endDate: endDate,
                totalRevenue: totalRevenue,
                totalOrders: filteredOrders.length,
                itemWise: itemWise
            };
        }

        // Print sales report
        function printSalesReport() {
            if (!window.currentReportData) {
                alert('Please generate a report first');
                return;
            }

            const data = window.currentReportData;
            const reportPrint = document.getElementById('salesReportPrint');
            const reportPeriod = document.getElementById('reportPeriod');
            const reportGeneratedDate = document.getElementById('reportGeneratedDate');
            const printTotalRevenue = document.getElementById('printTotalRevenue');
            const printTotalOrders = document.getElementById('printTotalOrders');
            const printItemWiseTable = document.getElementById('printItemWiseTable');

            // Format dates for display
            const startDateObj = new Date(data.startDate);
            const endDateObj = new Date(data.endDate);
            const formattedStart = startDateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedEnd = endDateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            
            reportPeriod.textContent = `${formattedStart} to ${formattedEnd}`;
            reportGeneratedDate.textContent = new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            
            printTotalRevenue.textContent = data.totalRevenue.toFixed(2);
            printTotalOrders.textContent = data.totalOrders;

            // Populate item-wise table
            printItemWiseTable.innerHTML = '';
            
            // Sort items by revenue descending
            const sortedItems = Object.entries(data.itemWise)
                .sort((a, b) => b[1].revenue - a[1].revenue);

            if (sortedItems.length === 0) {
                printItemWiseTable.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px;">No sales data available for this period</td></tr>';
            } else {
                sortedItems.forEach(([name, itemData]) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${name}</td>
                        <td>${itemData.quantity}</td>
                        <td>₹${itemData.revenue.toFixed(2)}</td>
                    `;
                    printItemWiseTable.appendChild(row);
                });
            }

            // Show and print
            reportPrint.style.display = 'block';
            window.print();
            reportPrint.style.display = 'none';
        }

        // Download PDF sales report
        function downloadPDFReport() {
            if (!window.currentReportData) {
                alert('Please generate a report first');
                return;
            }

            const data = window.currentReportData;
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Colors
            const primaryColor = [102, 126, 234];
            const textColor = [51, 51, 51];
            const lightGray = [248, 249, 250];

            // Format dates
            const startDateObj = new Date(data.startDate);
            const endDateObj = new Date(data.endDate);
            const formattedStart = startDateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedEnd = endDateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const generatedDate = new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

            let yPos = 20;

            // Header
            doc.setFillColor(...primaryColor);
            doc.rect(0, 0, 210, 40, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('RG TEA SHOP', 105, 20, { align: 'center' });
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            doc.text('Sales Report', 105, 30, { align: 'center' });

            yPos = 50;

            // Report Information
            doc.setTextColor(...textColor);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Report Period: ${formattedStart} to ${formattedEnd}`, 20, yPos);
            yPos += 7;
            doc.text(`Generated On: ${generatedDate}`, 20, yPos);
            yPos += 15;

            // Summary Box
            doc.setFillColor(...lightGray);
            doc.roundedRect(20, yPos - 5, 170, 20, 3, 3, 'F');
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Summary', 25, yPos + 3);
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(`Total Revenue: ₹${data.totalRevenue.toFixed(2)}`, 25, yPos + 10);
            doc.text(`Total Orders: ${data.totalOrders}`, 120, yPos + 10);
            
            yPos += 30;

            // Item-wise Sales Table Header
            doc.setFillColor(...primaryColor);
            doc.roundedRect(20, yPos - 5, 170, 8, 3, 3, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('Item-wise Sales', 25, yPos);
            
            yPos += 10;

            // Table Headers
            doc.setFillColor(...primaryColor);
            doc.roundedRect(20, yPos - 5, 170, 8, 0, 0, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('Item Name', 25, yPos);
            doc.text('Quantity', 100, yPos);
            doc.text('Revenue', 150, yPos);
            
            yPos += 8;

            // Table Rows
            doc.setTextColor(...textColor);
            doc.setFont('helvetica', 'normal');
            
            // Sort items by revenue descending
            const sortedItems = Object.entries(data.itemWise)
                .sort((a, b) => b[1].revenue - a[1].revenue);

            if (sortedItems.length === 0) {
                doc.setFontSize(10);
                doc.text('No sales data available for this period', 25, yPos + 5);
            } else {
                sortedItems.forEach(([name, itemData], index) => {
                    // Alternate row colors
                    if (index % 2 === 0) {
                        doc.setFillColor(255, 255, 255);
                    } else {
                        doc.setFillColor(...lightGray);
                    }
                    doc.roundedRect(20, yPos - 3, 170, 7, 0, 0, 'F');
                    
                    doc.setFontSize(9);
                    // Truncate long item names
                    const itemName = doc.splitTextToSize(name, 60);
                    doc.text(itemName, 25, yPos);
                    doc.text(itemData.quantity.toString(), 100, yPos);
                    doc.text(`₹${itemData.revenue.toFixed(2)}`, 150, yPos);
                    
                    yPos += 7;
                    
                    // Check if we need a new page
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                });
            }

            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
                doc.text('RG TEA SHOP Sales Report', 105, 295, { align: 'center' });
            }

            // Generate filename
            const filename = `Sales_Report_${data.startDate}_to_${data.endDate}.pdf`;
            
            // Save the PDF
            doc.save(filename);
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('qrModal');
            if (event.target === modal) {
                closeQRModal();
            }
        }
