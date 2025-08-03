import React, { useState } from 'react';

const ButtonOnOff = ({
    isOn = false,
    onToggle,
    disabled = false,
    className = '',
    ...props
}) => {
    const [internalState, setInternalState] = useState(isOn);

    const handleToggle = () => {
        if (disabled) return;

        const newState = !internalState;
        setInternalState(newState);

        if (onToggle) {
            onToggle(newState);
        }
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={disabled}
            className={`relative inline-flex items-center w-8 h-4 rounded-lg transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${internalState
                ? 'bg-[#6366F1]' // Màu tím khi bật
                : 'bg-gray-300'   // Màu xám khi tắt
                } ${className}`}
            {...props}
        >
            {/* Toggle circle - căn giữa */}
            <span
                className={`inline-block w-3 h-3 rounded-full bg-white shadow transform transition-transform duration-200 ${internalState
                    ? 'translate-x-4' // Bật: di chuyển sang phải
                    : 'translate-x-0.5' // Tắt: ở bên trái
                    }`}
            />
        </button>
    );
};

export default ButtonOnOff;
