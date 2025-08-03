import React, { useState } from 'react';
import ButtonOnOff from '../buttonOnOff';
import MoreIcon from '../../assets/icons/more.svg';

const TableRow = ({
    id,
    code,
    name,
    description,
    isActive,
    updateTime,
    updateBy,
    isSelected = false,
    onSelect,
    onToggleActive
}) => {
    const [isToggleOn, setIsToggleOn] = useState(isActive);

    const handleToggleChange = (newState) => {
        setIsToggleOn(newState);
        if (onToggleActive) {
            onToggleActive(id, newState);
        }
    };

    return (
        <div className={`flex items-center px-3 py-3 rounded-lg mt-2 transition-colors cursor-pointer hover:bg-indigo-50 ${isSelected ? 'bg-indigo-50' : 'bg-gray-50'}`}>
            {/* Checkbox column */}
            <div className="flex items-center justify-center w-12 px-2">
                <div className="flex items-center justify-center w-6 h-6">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelect && onSelect(id)}
                        className="w-4 h-4 border border-gray-300 rounded focus:ring-[#6366F1] cursor-pointer"
                        style={{ accentColor: '#6366F1' }}
                    />
                </div>
            </div>

            {/* Mã loại phiếu */}
            <div className="flex items-center px-4 py-3 w-28">
                <span className="text-sm font-normal text-gray-900">{code}</span>
            </div>

            {/* Tên loại phiếu thu */}
            <div className="flex items-center flex-1 px-4 py-3">
                <span className="text-sm font-normal text-gray-900">{name}</span>
            </div>

            {/* Mô tả */}
            <div className="flex items-center flex-1 px-4 py-3">
                <span className="text-sm font-normal text-gray-900">{description}</span>
            </div>

            {/* Hoạch toán kết quả kinh doanh - Toggle */}
            <div className="flex items-center justify-center w-40 px-4 py-3">
                <div className="flex items-center justify-center">
                    <ButtonOnOff
                        isOn={isToggleOn}
                        onToggle={handleToggleChange}
                    />
                </div>
            </div>

            {/* Cập nhật lần cuối */}
            <div className="flex items-center flex-1 px-4 py-3">
                <div className="flex items-center gap-1">
                    <span className="text-sm font-normal text-gray-500">{updateTime} bởi</span>
                    <span className="text-sm font-semibold text-[#2E319E]">{updateBy}</span>
                </div>
            </div>

            {/* Action column - More button */}
            <div className="flex items-center justify-center w-12 px-2">
                <button className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors cursor-pointer ${isSelected ? 'bg-[#6366F1] text-white hover:bg-[#6366F1]' : 'text-gray-500 hover:bg-gray-200'
                    }`}>
                    <img
                        src={MoreIcon}
                        alt="More actions"
                        className="w-4 h-4"
                        style={{
                            filter: isSelected ? 'brightness(0) invert(1)' : 'none'
                        }}
                    />
                </button>
            </div>
        </div>
    );
};

export default TableRow;
