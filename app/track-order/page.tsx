"use client"
  import {useState } from "react";

export default function TrackOrder() {
  const [trackingId, setTrackingId] = useState<string>("");
  const [trackingInfo, setTrackingInfo] = useState<string | null>(null);

  const handleTrack = () => {
    if (trackingId.trim()) {
      setTrackingInfo(`Order ${trackingId} is out for delivery!`);
    } else {
      setTrackingInfo("Please enter a valid tracking ID.");
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl text-white font-semibold mb-4">Track Your Order</h2>
      <input
        type="text"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        className="p-3 border border-gray-300 text-black bg-white caret-black cursor-text rounded-lg mb-4 mx-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
        placeholder="Enter Tracking ID"
      />
      <button
        onClick={handleTrack}
        className="bg-orange-600 hover:bg-white hover:text-orange-600 transition duration-300 text-white p-3 rounded-lg"
      >
        Track Now
      </button>
      {trackingInfo && <p className="mt-6 text-xl text-orange-600">{trackingInfo}</p>}
    </div>
  );
}
