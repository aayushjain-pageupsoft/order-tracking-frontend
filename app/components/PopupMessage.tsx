// components/PopupMessage.tsx

import React, { useEffect, useState } from 'react';

interface PopupMessageProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;  // Function to close the popup
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  // Close the popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();  // Close the popup from parent
    }, 5000);
    
    return () => clearTimeout(timer);  // Cleanup timer on component unmount
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 w-80 rounded-md shadow-lg text-white 
      ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      style={{ zIndex: 9999 }}
    >
      <p>{message}</p>
    </div>
  );
};

export default PopupMessage;
