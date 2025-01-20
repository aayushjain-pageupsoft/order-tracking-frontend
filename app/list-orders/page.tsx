"use client";
import React, { useState, useEffect } from "react";
import PopupMessage from "../components/PopupMessage"; // Import the PopupMessage component

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [popup, setPopup] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Function to fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await fetch('https://localhost:7272/api/orders'); // Backend endpoint for fetching orders
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      console.log("Orders fetched:", data);
      // Map backend data to match frontend structure
      const mappedOrders = data.map((order) => ({
        rowKey: order.rowKey,
        customerName: order.customerName,
        quantity: order.quantity || 1, // Default to 1 if Quantity is missing
        status: order.status,
        product: "Product A", // Placeholder for product name if it's not part of backend response
      }));

      console.log("Mapped orders:", mappedOrders);
      setOrders(mappedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setPopup({ message: "Failed to load orders. Please try again.", type: "error" });
    }
  };

  // Function to handle status update of an order
  const handleStatusUpdate = async (orderId: number) => {
    try {
      const updatedOrders = orders.map(order =>
        order.rowKey === orderId ? { ...order, status: "Shipped" } : order
      );

      setOrders(updatedOrders);
      setPopup({ message: "Order status updated to Shipped!", type: "success" });

      // Send status update to the backend
      const response = await fetch(`https://localhost:7272/api/orders/update-status/${orderId}`, {
        method: 'PUT', // Ensure method matches backend (POST for updates)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("Shipped"), // Send the new status as the request body
      });

      if (!response.ok) throw new Error("Failed to update order status");
      const result = await response.json();
      console.log("Status updated on backend:", result);
    } catch (error) {
      console.error("Error updating order:", error);
      setPopup({ message: "Failed to update order status. Please try again.", type: "error" });
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, []);

  return (
    <div className="text-center p-8">
      <h2 className="text-2xl text-orange-600 font-semibold mb-8">All Orders</h2>

      {/* Show PopupMessage if there's a popup */}
      {popup && (
        <PopupMessage
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}  // Close the popup when it's dismissed
        />
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.rowKey}
            className="order-item bg-white bg-opacity-20 backdrop-blur-xl border border-gray-200 p-6 rounded-lg shadow-xl flex flex-col"
          >
            <h3 className="text-xl font-semibold text-orange-600">{order.product}</h3>
            <p className="text-xl text-white">
              Customer: <span className="text-orange-600">{order.customerName}</span>
            </p>
            <p className="text-xl text-white">
              Quantity: <span className="text-orange-600">{order.quantity}</span>
            </p>
            <p className="text-xl text-white">
              Status: <span className="text-orange-600">{order.status}</span>
            </p>

            <button
              onClick={() => handleStatusUpdate(order.rowKey)}
              className="mt-4 px-6 py-3 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition duration-300 ease-in-out"
            >
              Update Status to Shipped
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
