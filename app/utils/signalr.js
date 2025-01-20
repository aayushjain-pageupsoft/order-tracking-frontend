import * as signalR from "@microsoft/signalr";

let connection;

export const startSignalRConnection = async () => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7272/orderHub") // Replace with your backend SignalR hub URL
      .withAutomaticReconnect()
      .build();
  }

  if (connection.state === signalR.HubConnectionState.Disconnected) {
    try {
      await connection.start();
      console.log("SignalR Connected.");
    } catch (error) {
      console.error("SignalR Connection Error: ", error);
    }
  }

  return connection;
};

export const listenToOrderUpdates = async (callback) => {
  const conn = await startSignalRConnection();

  conn.on("ReceiveOrderUpdate", (orderId, status) => {
    console.log(`Order Updated: ID: ${orderId}, Status: ${status}`);
    if (callback) callback(orderId, status);
  });
};

export const disconnectSignalR = async () => {
  if (connection && connection.state === signalR.HubConnectionState.Connected) {
    await connection.stop();
    console.log("SignalR Disconnected.");
  }
};
