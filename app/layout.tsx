"use client";

import { useEffect, useState } from "react";
import { listenToOrderUpdates, disconnectSignalR } from "./utils/signalr";

import "./globals.css";
import Sidebar from "./components/Sidebar";
import AnimatedBackground from "./components/AnimatedBackground";

// Root layout with html, body, and other structure
export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("home"); // Track active page
  const [orderUpdates, setOrderUpdates] = useState([]);
  
    useEffect(() => {
      const handleOrderUpdates = (orderId, status) => {
        setOrderUpdates((prev) => [...prev, { orderId, status }]);
      };
  
      // Start SignalR connection and listen for updates
      listenToOrderUpdates(handleOrderUpdates);
  
      // Cleanup on component unmount
      return () => {
        disconnectSignalR();
      };
    }, []);

  return (
    <>
      {/* HTML and BODY tags */}
      <html lang="en">
        <body className="bg-gray-900 text-white font-sans">
          <div className="relative min-h-screen overflow-hidden">
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Sidebar */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              activePage={activePage}
              setActivePage={setActivePage}
            />

            <div
              className={`transition-all duration-300 ml-0 ${sidebarOpen ? "md:ml-64" : ""}`}
            >
              {/* Header */}

              {/* Main Content Area with Glassmorphism Boxes */}
              <main className="p-8 space-y-8">
                <div className="glassmorphism p-6 rounded-2xl">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </body>
      </html>
    </>
  );
}