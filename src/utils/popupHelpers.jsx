import closeIcon from '../assets/icons/close_icon.svg';

/**
 * Các hàm tiện ích được sử dụng lại trong các popup/modal
 */
import { useEffect, useRef } from 'react';

/**
 * Hook để xử lý click outside của popup
 * @param {Function} onClose - Hàm xử lý đóng popup
 * @param {boolean} isOpen - Trạng thái mở của popup
 * @returns {Object} - Tham chiếu ref để gắn vào phần tử container của popup
 */
export const useClickOutside = (onClose, isOpen) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return modalRef;
};

/**
 * Component nút đóng (X) cho popup
 * @param {Function} onClose - Hàm xử lý đóng popup
 * @param {string} className - Class bổ sung (optional)
 * @returns {JSX.Element} - Component nút đóng
 */

export const renderCloseButton = (onClose, className = '') => {
    return (
        <button
            onClick={onClose}
            className={`w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer ${className}`}
        >
            <div className="w-4 h-4 flex items-center justify-center relative">
                <img src={closeIcon} alt="Close" className="w-4 h-4" />
            </div>
        </button>
    );
};
