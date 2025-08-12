import React from 'react';

const DeleteBoxHeader = ({ selectedCount, onDelete, onDeselect }) => {
    if (selectedCount <= 0) return null;

    return (
        <div className="flex items-center gap-3 bg-[#FDECEC] px-3 py-2 rounded-[8px]">
            <span className="text-[#8B8C99] text-sm">
                {`Đã chọn ${selectedCount} mục`}
            </span>
            <div className="flex items-center gap-2">
                <button
                    className="bg-[#EB3838] text-white font-normal px-4 py-2 text-sm rounded-[8px] h-8 flex items-center justify-center cursor-pointer"
                    onClick={onDelete}
                >
                    Xóa
                </button>
                <button
                    className="bg-white text-[#6366F1] border border-[#E5E5E5] font-normal px-4 py-2 text-sm rounded-[8px] h-8 flex items-center justify-center cursor-pointer"
                    onClick={onDeselect}
                >
                    Bỏ chọn
                </button>
            </div>
        </div>
    );
};

export default DeleteBoxHeader;
