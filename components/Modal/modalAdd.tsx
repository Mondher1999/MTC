import React from "react";
import styles from "./Modal.module.css"; // Ensure your CSS module has appropriate styles

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full mx-4 p-6 relative">
        {/* Close button inside the modal, bigger and blue */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-blue-600 hover:text-blue-800 focus:outline-none text-3xl"
        >
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
