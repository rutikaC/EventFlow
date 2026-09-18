import React from 'react'
import { IoMdClose } from "react-icons/io";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative bg-gray-50 p-6 rounded w-96  shadow-lg dark:bg-gray-900">
        
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300"
        >
          <IoMdClose size={20} />
        </button>

        
        {children}
      </div>
    </div>
  )
}

export default Modal
