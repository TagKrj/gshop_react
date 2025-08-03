import React from 'react';

const TableHeader = ({
    allSelected = false,
    someSelected = false,
    onSelectAll
}) => {
    return (
        <div className="flex items-center px-3">
            {/* Checkbox column */}
            <div className="flex items-center justify-center w-12 px-2 py-3">
                <div className="flex items-center justify-center w-6 h-6">
                    <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(el) => {
                            if (el) el.indeterminate = someSelected && !allSelected;
                        }}
                        onChange={onSelectAll}
                        className="w-4 h-4 border border-gray-300 rounded focus:ring-[#6366F1] cursor-pointer"
                        style={{ accentColor: '#6366F1' }}
                    />
                </div>
            </div>

            {/* Mã loại phiếu */}
            <div className="flex items-center px-4 py-3 w-28">
                <span className="text-xs font-normal text-gray-500">Mã loại phiếu</span>
            </div>

            {/* Tên loại phiếu thu */}
            <div className="flex items-center flex-1 px-4 py-3">
                <span className="text-xs font-normal text-gray-500">Tên loại phiếu thu</span>
            </div>

            {/* Mô tả */}
            <div className="flex items-center flex-1 px-4 py-3">
                <span className="text-xs font-normal text-gray-500">Mô tả</span>
            </div>

            {/* Hoạch toán kết quả kinh doanh */}
            <div className="flex items-center w-40 px-4 py-3">
                <span className="text-xs font-normal text-gray-500 leading-tight">
                    Hoạch toán kết quả<br />kinh doanh
                </span>
            </div>

            {/* Cập nhật lần cuối */}
            <div className="flex items-center flex-1 px-4 py-3">
                <span className="text-xs font-normal text-gray-500">Cập nhật lần cuối</span>
            </div>

            {/* Action column */}
            <div className="flex items-center justify-center w-12 px-2 py-3">
                {/* Empty for action buttons */}
            </div>
        </div>
    );
};

export default TableHeader;
