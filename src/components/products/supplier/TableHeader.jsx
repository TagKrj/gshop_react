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

            {/* Mã NCC */}
            <div className="flex items-center px-4 py-3 w-28">
                <span className="text-xs font-normal text-gray-500">Mã NCC</span>
            </div>

            {/* Tên nhà cung cấp */}
            <div className="flex items-center flex-1 px-4 py-3 ">
                <span className="text-xs font-normal text-gray-500">Nhà cung cấp</span>
            </div>

            {/* Người liên hệ */}
            <div className="flex items-center flex-1 px-4 py-3 ">
                <span className="text-xs font-normal text-gray-500">Người liên hệ</span>
            </div>

            {/* Số điện thoại */}
            <div className="flex items-center px-4 py-3 w-32 ">
                <span className="text-xs font-normal text-gray-500">SĐT</span>
            </div>

            {/* Email */}
            <div className="flex items-center px-4 py-3 w-64 ">
                <span className="text-xs font-normal text-gray-500">Email</span>
            </div>
            {/* Địa chỉ */}
            <div className="flex items-center flex-1 px-4 py-3 ">
                <span className="text-xs font-normal text-gray-500">Địa chỉ</span>
            </div>

            {/* Cập nhật lần cuối */}
            <div className="flex items-center flex-1 px-4 py-3 ">
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
