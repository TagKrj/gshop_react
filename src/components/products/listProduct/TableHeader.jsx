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

            {/* Ảnh */}
            <div className="flex items-center px-4 py-3 w-30 bg-accent">
            </div>

            {/* Mã SKU */}
            <div className="flex items-center px-4 py-3 w-40 bg-amber-200">
                <span className="text-xs font-normal text-gray-500">Mã SKU</span>
            </div>

            {/* Tên sản phẩm*/}
            <div className="flex items-center px-4 py-3 w-40 bg-accent-hover ">
                <span className="text-xs font-normal text-gray-500">Tên sản phẩm</span>
            </div>

            {/* Loại sản phẩm */}
            <div className="flex items-center px-4 py-3 w-50 bg-amber-300 ">
                <span className="text-xs font-normal text-gray-500">Loại sản phẩm</span>
            </div>

            {/* Thuế suất đầu vào (%) */}
            <div className="flex items-center px-4 py-3 w-45 bg-amber-200">
                <span className="text-xs font-normal text-gray-500">Thuế suất đầu vào (%)</span>
            </div>

            {/* Thuế suất đầu ra (%*/}
            <div className="flex items-center px-4 py-3 w-40 bg-amber-300">
                <span className="text-xs font-normal text-gray-500">Thuế suất đầu ra (%)</span>
            </div>

            {/* Đơn vị tính */}
            <div className="flex items-center px-4 py-3 w-25 bg-amber-700">
                <span className="text-xs font-normal text-gray-500">Đơn vị tính</span>
            </div>

            {/* Đơn vị/thùng */}
            <div className="flex items-center px-4 py-3 ">
                <span className="text-xs font-normal text-gray-500">Đơn vị/thùng</span>
            </div>

            {/* Ngưỡng cảnh báo tồn kho (đơn vị) */}
            <div className="flex items-center px-4 py-3 w-40 bg-amber-500">
                <span className="text-xs font-normal text-gray-500 text-end ">Ngưỡng cảnh báo tồn kho (đơn vị)</span>
            </div>

            {/* Cập nhật lần cuối*/}
            <div className="flex items-center px-4 py-3 ">
                <span className="text-xs font-normal text-gray-500">Cập nhật lần cuối</span>
            </div>

            {/* Action column */}
            <div className="flex items-center justify-center w-12 px-2 py-3">
                {/* Empty for action buttons */}
            </div>

            <div className="flex items-center justify-center w-12 px-2 py-3">
                {/* Empty for action buttons */}
            </div>

        </div>
    );
};

export default TableHeader;
