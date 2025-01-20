"use client";
import React, { useState } from "react";
import PopupMessage from "../components/PopupMessage";

// Sample data for items. You can replace this with dynamic data from an API or a database.
const sampleItems = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 150 },
  { id: 3, name: "Product C", price: 200 },
];

export default function CreateOrderPage() {
  // State to manage orders for each item
  const [orders, setOrders] = useState(
    sampleItems.reduce((acc, item) => {
      acc[item.id] = { quantity: 1, customerName: "", address: "" };
      return acc;
    }, {})
  );
  
  

  // State to manage popup visibility and message
  const [popup, setPopup] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Handle input changes for each item
  const handleChange = (e, itemId) => {
    const { name, value } = e.target;
    setOrders((prevOrders) => ({
      ...prevOrders,
      [itemId]: {
        ...prevOrders[itemId],
        [name]: value,
      },
    }));
  };

  // Handle order submission
  const handleSubmit = async (e, itemId) => {
    e.preventDefault();
    const orderData = orders[itemId];

    // Prepare the payload with customerName and items
    const payload = {
      PartitionKey: "Orders", // Default partition key for all orders
    RowKey: "", // Let the backend generate the unique order ID
    CustomerName: orderData.customerName,
    Status: "Created", // Default status
    };

    try {
      const response = await fetch("https://localhost:7272/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Order Created:", result);
      // Set success message for popup
      setPopup({ message: 'Order successfully created!', type: 'success' });

    } catch (error) {
      console.error("Error creating order:", error);
      // Set error message for popup
      setPopup({ message: 'Failed to create order. Please try again.', type: 'error' });
    
    }

    // Optional: Reset form after submission
    setOrders((prevOrders) => ({
      ...prevOrders,
      [itemId]: { quantity: 1, customerName: "", address: "" },
    }));
  };

  return (
    <div className="create-order-page text-center p-8">
      <h2 className="text-2xl text-orange-600 font-semibold mb-8">Place Order</h2>
      {/* Show PopupMessage if there's a popup */}
      {popup && (
        <PopupMessage
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}  // Close the popup when it's dismissed
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sampleItems.map((item) => (
          <div
            key={item.id}
            className="order-item bg-white bg-opacity-20 backdrop-blur-xl border border-gray-200 p-6 rounded-lg shadow-xl flex flex-col"
          >
            <h3 className="text-xl font-semibold text-orange-600">{item.name}</h3>
            <p className="text-lg text-white">Price: ${item.price}</p>

            <form
              onSubmit={(e) => handleSubmit(e, item.id)}
              className="space-y-4 mt-4"
            >
              {/* Customer Name Field */}
              <div>
                <label className="block text-sm font-medium text-orange-600">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={orders[item.id].customerName}
                  onChange={(e) => handleChange(e, item.id)}
                  required
                  className="mt-1 p-4 w-full border border-gray-300 rounded-lg bg-white bg-opacity-60 focus:outline-none focus:ring-4 focus:ring-orange-600 text-black placeholder-gray-500 transition-all ease-in-out duration-300"
                  placeholder="Enter your name"
                />
              </div>

              {/* Quantity Field */}
              <div>
                <label className="block text-sm font-medium text-orange-600">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={orders[item.id].quantity}
                  onChange={(e) => handleChange(e, item.id)}
                  required
                  className="mt-1 p-4 w-full border border-gray-300 rounded-lg bg-white bg-opacity-60 focus:outline-none focus:ring-4 focus:ring-orange-600 text-black placeholder-gray-500 transition-all ease-in-out duration-300"
                  min="1"
                  placeholder="Quantity"
                />
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-orange-600">Address</label>
                <textarea
                  name="address"
                  value={orders[item.id].address}
                  onChange={(e) => handleChange(e, item.id)}
                  required
                  className="mt-1 p-4 w-full border border-gray-300 rounded-lg bg-white bg-opacity-60 focus:outline-none focus:ring-4 focus:ring-orange-600 text-black placeholder-gray-500 transition-all ease-in-out duration-300"
                  placeholder="Enter your address"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition duration-300 ease-in-out"
              >
                Order {item.name}
              </button>
            </form>
          </div>
        ))}
        <ul>
        {orderUpdates.map((update, index) => (
          <li key={index}>
            Order ID: {update.orderId}, Status: {update.status}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
