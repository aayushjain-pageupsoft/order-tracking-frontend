# Next.js Orders Management System

## Overview

This project is a Next.js-based frontend application for managing orders in an e-commerce or logistics setting. It provides functionality to:

- Fetch and display a list of orders with details.
- Update the status of orders through various stages.
- Notify users of real-time updates using SignalR.
- Create new orders with a streamlined form.

The application employs modern UI design principles, including animated backgrounds, glassmorphism, and responsive layouts.

---

## Features

### 1. **Orders Management**
- Fetches orders from a backend API and displays them.
- Supports status updates through predefined stages (e.g., Created, Processing, Delivered).
- Real-time notifications for order updates via SignalR.

### 2. **Order Creation**
- Allows users to create new orders for predefined products.
- Validates user input and provides feedback through popups.

### 3. **Real-Time Notifications**
- Integrates SignalR to receive live updates for order statuses.

### 4. **User-Friendly Design**
- Responsive design with a sidebar navigation.
- Glassmorphism UI for enhanced aesthetics.
- Popup messages for status updates and error handling.

---

## Tech Stack

- **Framework**: Next.js
- **State Management**: React Hooks
- **Real-Time Updates**: SignalR
- **Styling**: Tailwind CSS

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repository
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Folder Structure

```
.
├── components
│   ├── PopupMessage.tsx       # Reusable popup message component
│   ├── Sidebar.tsx            # Sidebar navigation component
│   ├── AnimatedBackground.tsx # Background animation component
│   └── Notification.tsx       # Real-time notifications component
├── pages
│   ├── index.tsx              # Home page
│   ├── create-order           # Order creation page
│   └── orders                 # Orders list page
├── utils
│   ├── signalr.js             # SignalR utilities for real-time updates
├── globals.css                # Global CSS styles
└── README.md                  # Project documentation
```

---

## Key Components

### 1. **Orders List (`pages/orders/page.tsx`)**
- Fetches orders from a backend API and maps the data for display.
- Updates order status and prevents further updates once delivered.
- Displays status messages using `PopupMessage`.

### 2. **Order Creation (`pages/create-order/page.tsx`)**
- Provides an interface to create orders with customer details and quantity.
- Includes validation and feedback via popups.

### 3. **Real-Time Updates (`utils/signalr.js`)**
- Connects to a SignalR hub to receive live updates.
- Notifies the user of order status changes.

### 4. **Popup Message (`components/PopupMessage.tsx`)**
- Displays success, error, and loading messages.

### 5. **Sidebar (`components/Sidebar.tsx`)**
- Navigation sidebar with active page tracking.

### 6. **Animated Background (`components/AnimatedBackground.tsx`)**
- Adds a visually appealing animated background.

---

## Backend API Endpoints

### 1. **Fetch Orders**
- **URL**: `https://localhost:7272/api/orders`
- **Method**: GET

### 2. **Update Order Status**
- **URL**: `https://localhost:7272/api/orders/update-status/{orderId}`
- **Method**: PUT

---

## Running the Project

1. Ensure the backend API is running at `https://localhost:7272`.
2. Start the frontend by running:
   ```bash
   npm run dev
   ```
3. Access the application at `http://localhost:3000`.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push your changes:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Future Enhancements

- Add authentication and authorization.
- Enhance error handling and user feedback.
- Extend SignalR functionality for other real-time updates.

