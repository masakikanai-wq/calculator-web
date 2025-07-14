import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  isVisible, 
  onClose, 
  duration = 2000 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-center z-50">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
        <div className="flex items-center space-x-2">
          <span>✓</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};