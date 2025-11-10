# Tea Shop Billing Website

A complete billing system for a tea shop with menu management, cart functionality, billing, payment QR code, bill printing, and monthly sales reports.

## Features

- **Menu Display**: View all menu items with images
- **Cart Management**: Add items to cart, adjust quantities, remove items
- **Billing**: Generate bills with itemized lists
- **Payment**: QR code payment integration
- **Bill Printing**: Print bills directly from the browser
- **Menu Management**: Full CRUD operations for menu items
- **Sales Reports**: Monthly sales reports with item-wise breakdown
- **Image Upload**: Upload images for menu items

## Technology Stack

- **Backend**: Python Flask
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Database**: SQLite
- **Image Storage**: Local file system

## Installation

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Create placeholder images (optional):**
   ```bash
   python create_placeholders.py
   ```
   Note: This requires Pillow. Install it with: `pip install Pillow`
   
   Alternatively, you can manually add images to the `static/images/` folder:
   - tea.jpg
   - coffee.jpg
   - chocolate_biscuit.jpg
   - ragi_biscuit.jpg
   - vada.jpg
   - samosa.jpg
   - aalu_samosa.jpg
   - bujji.jpg
   - horlis.jpg
   - boost.jpg
   - placeholder.jpg (fallback image)

3. **Add QR Code:**
   Place your payment QR code image as `static/qr-code.png`

4. **Run the application:**
   ```bash
   python app.py
   ```

5. **Access the website:**
   Open your browser and go to: `http://localhost:5000`

## Usage

### Billing Page
- Click on any menu item to add it to the cart
- Adjust quantities using +/- buttons
- Click "Pay Now" to show the payment QR code
- Click "Print Bill" to print the bill
- Click "Clear Cart" to empty the cart

### Manage Menu
- Click "Add New Item" to create a new menu item
- Click "Edit" to modify an existing item
- Click "Delete" to remove an item
- Upload images when creating/editing items

### Sales Report
- Select date range (start and end dates)
- Click "Generate Report" to view sales data
- Click "This Month" to quickly select current month
- View total revenue, total orders, item-wise sales, and daily breakdown

## Database

The application uses SQLite database (`tea_shop.db`) which is automatically created on first run. The database contains:

- **menu_items**: Stores menu item information
- **orders**: Stores order transactions
- **order_items**: Stores detailed order item information for reporting

## File Structure

```
billing-website/
├── app.py                 # Flask application
├── models.py              # Database models
├── requirements.txt       # Python dependencies
├── create_placeholders.py # Script to generate placeholder images
├── static/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   ├── main.js        # Billing page JavaScript
│   │   ├── manage_menu.js # Menu management JavaScript
│   │   └── sales_report.js # Sales report JavaScript
│   ├── images/            # Menu item images
│   └── qr-code.png        # Payment QR code
├── templates/
│   ├── index.html         # Main billing page
│   ├── manage_menu.html   # Menu management page
│   └── sales_report.html  # Sales report page
└── README.md              # This file
```

## API Endpoints

- `GET /` - Main billing page
- `GET /manage-menu` - Menu management page
- `GET /sales-report` - Sales report page
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create menu item
- `PUT /api/menu/<id>` - Update menu item
- `DELETE /api/menu/<id>` - Delete menu item
- `POST /api/order` - Create order
- `GET /api/sales-report` - Get sales data

## Notes

- The cart is stored in browser localStorage for persistence
- Images should be in JPG, PNG, JPEG, or GIF format
- Maximum image size is 16MB
- The database is automatically initialized with default menu items on first run

## Customization

- Replace placeholder images with actual product images
- Update the QR code image with your payment QR code
- Modify prices and menu items through the Manage Menu interface
- Customize colors and styling in `static/css/style.css`

## License

This project is open source and available for personal and commercial use.





