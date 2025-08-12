import React, { useState, useRef } from 'react';
import EditDeleteBox from '../../Common/EditDeleteBox';
import AddEditTypeProducts from './AddEditTypeProducts';
import DeletePopup from '../../Common/DeletePopup';
import MoreIcon from '../../../assets/icons/more.svg';

const TypeProductsTableRow = ({
    id,
    code,
    name,
    description,
    updateTime,
    updateBy,
    isSelected = false,
    onSelect,
    onEdit,
    onDelete
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [showEditTypeProducts, setShowEditTypeProducts] = useState(false);
    const [showDeleteSupplier, setShowDeleteSupplier] = useState(false);
    const moreButtonRef = useRef(null);
    const colorBorder = [
        '#EAB308', '#45A487', '#0066FF', '#D72677', '#F86528', '#664D7F', '#10B981'
    ];

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
        setShowEditTypeProducts(true);
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

            {/* Mã loại SP */}
            <div className="flex items-center px-4 py-3 w-40">
                <span className="text-xs font-normal text-gray-900">{code}</span>
            </div>

            {/* Tên loại sản phẩm */}
            <div className="flex items-center flex-1 px-4 py-3">
                <span className="text-xs font-normal text-[#2E319E] px-4 py-1 border rounded-[99px]"
                    style={{ borderColor: colorBorder[id % colorBorder.length] }}>{name}</span>
            </div>

            {/* Mô tả */}
            <div className="flex items-center flex-1 px-4 py-3 ">
                <span className="text-xs font-normal text-gray-900 ">{description}</span>
            </div>

            {/* Cập nhật lần cuối */}
            <div className="flex items-center w-100 px-4 py-3 ">
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

            {/* Edit Type Products Modal */}
            <AddEditTypeProducts
                isOpen={showEditTypeProducts}
                onClose={() => setShowEditTypeProducts(false)}
                mode="edit"
                initialData={{
                    name,
                    description
                }}
                onSubmit={(formData) => {
                    console.log('Updated type product:', { id, ...formData });
                    // Implement onSubmit logic here
                    setShowEditTypeProducts(false);
                }}
            />

            {/* Delete Supplier Modal */}
            <DeletePopup
                isOpen={showDeleteSupplier}
                onClose={() => setShowDeleteSupplier(false)}
                itemName={name}
                itemType="loại sản phẩm"
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default TypeProductsTableRow;
