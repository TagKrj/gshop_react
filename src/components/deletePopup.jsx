import React, { useRef, useEffect } from 'react';
import Button from './button';

const DeletePopup = ({
    isOpen,
    onClose,
    itemName,
    itemType = 'item',
    onConfirm,
    confirmMessage,
    width = '452px'
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 transition-all">
            <div
                ref={modalRef}
                className="bg-white rounded-[12px] shadow-lg flex flex-col"
                style={{ width: width }}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6">
                    <h2 className="text-xl font-bold text-[#161413]">
                        {`Bạn có chắc chắn muốn xóa "${itemName || itemType}" ?`}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-5 h-5 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                    >
                        <div className="w-5 h-5 flex items-center justify-center relative">
                            <span className="absolute w-5 h-0.5 bg-[#737373] rotate-45"></span>
                            <span className="absolute w-5 h-0.5 bg-[#737373] -rotate-45"></span>
                        </div>
                    </button>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-4 px-6 pb-4">
                    <div className="flex flex-col gap-3">
                        <p className="text-sm text-[#161413]">
                            {confirmMessage || `Thông tin ${itemType} sẽ bị xóa sau khi bạn xác nhận.`}
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end items-center gap-2 pt-3">
                        <Button
                            type="secondary"
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <button
                            className="bg-[#EB3838] text-white font-normal px-4 py-2 text-sm rounded-[8px] h-11 flex items-center justify-center cursor-pointer hover:bg-[#C72C2C]"
                            onClick={onConfirm}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DeletePopup;
