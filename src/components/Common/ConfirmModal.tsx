import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
    variant?: 'danger' | 'warning' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    isLoading = false,
    variant = 'danger',
}) => {
    if (!isOpen) return null;

    const variantStyles = {
        danger: 'bg-red-500 hover:bg-red-600',
        warning: 'bg-orange-500 hover:bg-orange-600',
        info: 'bg-primary hover:bg-primary-dark',
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onCancel}
        >
            <div
                className="bg-white border border-gray-300 shadow-lg max-w-md w-full mx-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Red top border    */}
                <div className="h-1 bg-red-500"></div>

                {/* Content */}
                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
                            <span className="material-symbols-outlined text-white !text-[24px]">close</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text-main mb-3">{title}</h3>

                    {/* Message */}
                    <p className="text-text-secondary text-sm mb-6">{message}</p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 px-6 py-3 text-sm font-medium text-text-main bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 px-6 py-3 text-sm font-bold text-white ${variantStyles[variant]} transition-colors disabled:opacity-50`}
                        >
                            {isLoading ? 'Processing...' : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
