# StockFlow – Inventory Management System

A responsive Inventory Management Web Application built using Next.js, React, TypeScript, and Tailwind CSS.

## 1. Project Overview

StockFlow is a web-based inventory management application designed to help businesses manage products, monitor stock levels, track sales and purchases, and maintain customer and supplier information.

The application provides a centralized dashboard and separate modules for managing daily inventory operations.

**Live Demo:** https://stockflow-inventory-management-two.vercel.app/dashboard

**GitHub Repository:** https://github.com/DivyaMaddineni14/stockflow-inventory-management

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework and routing |
| React.js | Component-based UI development |
| TypeScript | Type safety |
| Tailwind CSS | Responsive styling |
| Lucide React | Icons |
| Recharts | Dashboard charts |
| Browser localStorage | Client-side data persistence |
| Git & GitHub | Version control |
| Vercel | Deployment |

## 3. Application Modules

### Dashboard
- Displays key business statistics.
- Shows total products and stock value.
- Displays sales and purchase overview charts.
- Shows low-stock alerts.
- Displays recent activity.

### Inventory Management
- Add new products.
- Edit existing products.
- Delete products.
- Search products by name or SKU.
- Manage product categories.
- Track stock quantities and minimum stock levels.
- Identify in-stock, low-stock, and out-of-stock products.

### Sales Management
- Create sales invoices.
- Select products and quantities.
- Calculate sale totals.
- Track completed and pending sales.
- Automatically reduce inventory when a sale is completed.

### Purchase Management
- Create purchase records.
- Select products and quantities.
- Calculate purchase totals.
- Track received and pending purchases.
- Automatically increase inventory when a purchase is received.

### Reports
- Display sales and purchase summaries.
- Show monthly sales charts.
- Display current stock reports.
- Identify low-stock and out-of-stock products.

### Customer Management
- Add customer information.
- Edit customer details.
- Delete customer records.
- Search customers.
- Validate email addresses and phone numbers.

### Supplier Management
- Add supplier information.
- Edit supplier details.
- Delete supplier records.
- Search suppliers.
- Validate email addresses and phone numbers.

## 4. Project Folder Structure

```text
stockflow/
│
├── app/
│   ├── dashboard/
│   ├── inventory/
│   ├── sales/
│   ├── purchases/
│   ├── reports/
│   ├── customers/
│   ├── suppliers/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── inventory/
│   ├── sales/
│   ├── purchases/
│   ├── reports/
│   ├── customers/
│   └── suppliers/
│
├── context/
│   └── InventoryContext.tsx
│
├── data/
│   └── mockData.ts
│
├── lib/
│   └── useLocalStorage.ts
│
├── types/
│   └── index.ts
│
├── public/
├── package.json
└── README.md
```

## 5. Key Features

- Reusable React components.
- Responsive user interface.
- Modular application architecture.
- Search and filtering functionality.
- Form validation.
- Add, Edit, and Delete operations.
- Shared inventory state using React Context.
- Automatic stock updates for completed sales and received purchases.
- Client-side data persistence using localStorage.
- Interactive charts and summary cards.

## 6. Installation and Setup

### Prerequisites

- Node.js installed.
- npm installed.
- Git installed.

### Step 1: Clone the repository

```bash
git clone https://github.com/DivyaMaddineni14/stockflow-inventory-management.git
```

### Step 2: Navigate to the project

```bash
cd stockflow-inventory-management
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the development server

```bash
npm run dev
```

### Step 5: Open the application

Visit:

```text
http://localhost:3000
```

### Step 6: Build for production

```bash
npm run build
```

## 7. Data Management

The application uses centralized mock data stored in `data/mockData.ts`.

React Context is used to share inventory data between modules.

Browser localStorage is used to persist products, sales, purchases, customers, and suppliers across page refreshes.

**Note:** This is a frontend demonstration application. It does not currently use a backend API or database. Data is stored locally in the user's browser and is not automatically synchronized across devices or users.

## 8. Application Routes

| Route | Module |
|---|---|
| `/dashboard` | Dashboard |
| `/inventory` | Inventory Management |
| `/sales` | Sales Management |
| `/purchases` | Purchase Management |
| `/reports` | Reports |
| `/customers` | Customer Management |
| `/suppliers` | Supplier Management |

## 9. Deployment

The application is deployed using Vercel and connected to GitHub.

**Production URL:** https://stockflow-inventory-management-two.vercel.app

**Source Code:** https://github.com/DivyaMaddineni14/stockflow-inventory-management

## 10. Future Enhancements

- Backend API integration.
- Database integration using PostgreSQL or MySQL.
- User authentication and role-based access control.
- Advanced sales and purchase analytics.
- PDF invoice generation.
- Export reports to Excel and PDF.
- Receive pending purchase orders.
- Improved dashboard metrics connected to live transaction data.

## 11. Conclusion

StockFlow demonstrates a modular approach to building an inventory management application using modern frontend technologies.

It brings together inventory tracking, sales, purchases, customer management, supplier management, and reporting in one responsive application.

---

**Project:** StockFlow – Inventory Management System  
**Developer:** Divya Jyothi Maddineni  
**Status:** Deployed