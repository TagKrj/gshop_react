import React, { useState, useRef } from 'react';
import EditDeleteBox from '../../editDeleteBox';
import EditSupplier from './EditSupplier';
import DeletePopup from '../../deletePopup';
import MoreIcon from '../../../assets/icons/more.svg';

const SupplierTableRow = ({
    id,
    code,
    name,
    contactPerson,
    phone,
    email,
    address,
    updateTime,
    updateBy,
    isSelected = false,
    onSelect,
    onEdit,
    onDelete
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [showEditSupplier, setShowEditSupplier] = useState(false);
    const [showDeleteSupplier, setShowDeleteSupplier] = useState(false);
    const moreButtonRef = useRef(null);

    const handleMoreClick = (e) => {
        e.stopPropagation();
        if (moreButtonRef.current) {
            const rect = moreButtonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 8,
                left: rect.left - 140 // Offset to show dropdown to the left of button
            });
        }
        setShowDropdown(!showDropdown);
    };

    const handleCloseDropdown = () => {
        setShowDropdown(false);
    };

    const handleEdit = () => {
        setShowEditSupplier(true);
        setShowDropdown(false);

        if (onEdit) {
            onEdit(id);
        }
    };

    const handleDelete = () => {
        setShowDeleteSupplier(true);
        setShowDropdown(false);
    };

    const handleConfirmDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
        setShowDeleteSupplier(false);
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

            {/* Mã NCC */}
            <div className="flex items-center px-4 py-3 w-28">
                <span className="text-xs font-normal text-gray-900">{code}</span>
            </div>

            {/* Tên NCC */}
            <div className="flex items-center flex-1 px-4 py-3">
                <span className="text-xs font-normal text-gray-900">{name}</span>
            </div>

            {/* Người liên hệ */}
            <div className="flex items-center flex-1 px-4 py-3 ">
                <span className="text-xs font-normal text-gray-900 ">{contactPerson}</span>
            </div>

            {/* Điện thoại */}
            <div className="flex items-center px-4 py-3 w-32 ">
                <span className="text-xs font-normal text-gray-900">{phone}</span>
            </div>

            {/* Email */}
            <div className="flex items-center px-4 py-3 w-64 ">
                <span className="text-xs font-normal text-gray-900">{email}</span>
            </div>

            {/* Địa chỉ */}
            <div className="flex items-center flex-1 px-4 py-3 ">
                <span className="text-xs font-normal text-gray-900">{address}</span>
            </div>

            {/* Cập nhật lần cuối */}
            <div className="flex items-center w-48 px-4 py-3 ">
                <div className="flex items-center gap-1">
                    <span className="text-xs font-normal text-gray-500">{updateTime} bởi <span className="text-xs font-semibold text-[#2E319E]">{updateBy}</span></span>
                </div>
            </div>

            {/* Action column - More button */}
            <div className="flex items-center justify-center w-12 px-2 relative">
                <button
                    ref={moreButtonRef}
                    onClick={handleMoreClick}
                    className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors cursor-pointer ${isSelected ? 'bg-[#6366F1] text-white hover:bg-[#6366F1]' : 'text-gray-500 hover:bg-gray-200'
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

                {/* Edit Delete Dropdown */}
                <EditDeleteBox
                    isOpen={showDropdown}
                    onClose={handleCloseDropdown}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    position={dropdownPosition}
                />
            </div>

            {/* Edit Supplier Modal */}
            <EditSupplier
                isOpen={showEditSupplier}
                onClose={() => setShowEditSupplier(false)}
                supplierData={{
                    id,
                    code,
                    name,
                    contactPerson,
                    phone,
                    email,
                    address
                }}
            />

            {/* Delete Supplier Modal */}
            <DeletePopup
                isOpen={showDeleteSupplier}
                onClose={() => setShowDeleteSupplier(false)}
                itemName={name}
                itemType="nhà cung cấp"
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default SupplierTableRow;
