
import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon } from './icons/Icons';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircleIcon : XCircleIcon;

  return (
    <div className={`fixed bottom-5 right-5 ${bgColor} text-white py-3 px-5 rounded-xl shadow-lg flex items-center space-x-3 z-50`}>
      <Icon className="h-6 w-6" />
      <span>{message}</span>
      <button onClick={onClose} className="font-bold text-xl ml-4">&times;</button>
    </div>
  );
};

export default Toast;
