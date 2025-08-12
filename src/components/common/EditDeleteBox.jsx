import React, { useState, useRef, useEffect } from 'react';

const EditDeleteBox = ({
    isOpen = false,
    onClose,
    onEdit,
    onDelete,
    position = { top: 0, left: 0 },
    className = ''
}) => {
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose?.();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleEditClick = () => {
        onEdit?.();
        onClose?.();
    };

    const handleDeleteClick = () => {
        onDelete?.();
        onClose?.();
    };

    return (
        <div
            ref={menuRef}
            className={`fixed z-50 bg-white rounded-[8px] shadow-lg border border-gray-100 ${className}`}
            style={{
                top: position.top,
                left: position.left,
                width: '166px',
                boxShadow: '0px 4px 12px 2px rgba(0, 0, 0, 0.08)'
            }}
        >
            {/* Menu Actions Container */}
            <div className="py-2">
                {/* Edit Option */}
                <div
                    onClick={handleEditClick}
                    className="flex items-center px-3 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                    <span className="text-sm font-normal text-[#6366F1] leading-tight">
                        Chỉnh sửa
                    </span>
                </div>

                {/* Delete Option */}
                <div
                    onClick={handleDeleteClick}
                    className="flex items-center px-3 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                    <span className="text-sm font-normal text-[#EB3838] leading-tight">
                        Xóa
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EditDeleteBox;
