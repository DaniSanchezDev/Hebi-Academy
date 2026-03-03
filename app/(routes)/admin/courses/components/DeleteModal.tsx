'use client';
import { X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  loading: boolean;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  loading
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 w-full max-w-md shadow-xl transform transition-all border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-6">
          <button 
            onClick={onClose} 
            className="absolute right-0 top-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
            Delete {title}
          </h3>
        </div>
        
        <div className="py-3 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
            Are you sure you want to delete this course?
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            This action cannot be undone.
          </p>
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 flex items-center"
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
