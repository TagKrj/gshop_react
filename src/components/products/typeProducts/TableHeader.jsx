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

            {/* Mã loại SP */}
            <div className="flex items-center px-4 py-3 w-40">
                <span className="text-xs font-normal text-gray-500">Mã loại SP</span>
            </div>

            {/* Tên loại sản phẩm */}
            <div className="flex items-center flex-1 px-4 py-3">
                <span className="text-xs font-normal text-gray-500">Tên loại sản phẩm</span>
            </div>

            {/* Mô tả */}
            <div className="flex items-center flex-1 px-4 py-3 ">
                <span className="text-xs font-normal text-gray-500">Mô tả</span>
            </div>

            {/* Cập nhật lần cuối */}
            <div className="flex items-center px-4 py-3 w-100 ">
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
