import React, { useState, useRef, useEffect } from 'react';
import EditDeleteBox from '../../editDeleteBox';
import DeletePopup from '../../deletePopup';
import Addfast from './Addfast';
import MoreIcon from '../../../assets/icons/more.svg';
import arrowDown from '../../../assets/icons/arrow-down-2.svg';

const PriceListTableRow = ({
    id,
    code,
    name,
    creationDate,
    createdBy,
    updateTime,
    updateBy,
    products = [],
    isSelected = false,
    onSelect,
    onEdit,
    onDelete
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAddfast, setShowAddfast] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const moreButtonRef = useRef(null);

    // Debug: Log when showAddfast changes
    useEffect(() => {
        console.log('showAddfast state changed:', showAddfast);
    }, [showAddfast]);

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
        setShowDropdown(false);
        setShowAddfast(true);
        if (onEdit) {
            onEdit(id);
        }
    };

    const handleDelete = () => {
        setShowDropdown(false);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
        setShowDeleteConfirm(false);
    };

    const toggleExpand = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    return (
        <div className="flex flex-col">
            <div className={`flex items-center px-3 py-3 rounded-[8px] mt-2 transition-colors cursor-pointer hover:bg-indigo-50 ${expanded ? 'bg-indigo-50 rounded-b-none border border-[#E5E5E5]' : ''} ${isSelected ? 'bg-indigo-50' : expanded ? 'bg-indigo-50' : 'bg-gray-50'}`}>
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

                {/* Tên bảng giá */}
                <div className="flex items-center px-4 py-3 w-122">
                    <span className="text-xs font-normal text-gray-900">{name}</span>
                </div>

                {/* Mã bảng giá */}
                <div className="flex items-center flex-1 px-4 py-3">
                    <span className="text-xs font-normal text-gray-900">{code}</span>
                </div>

                {/* Ngày tạo */}
                <div className="flex items-center flex-1 px-4 py-3">
                    <span className="text-xs font-normal text-gray-500">{creationDate} bởi <span className="text-xs font-semibold text-[#2E319E]">{createdBy}</span></span>
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
                        className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors cursor-pointer ${isSelected ? 'bg-[#6366F1] text-white hover:bg-[#6366F1]' : 'text-gray-500 hover:bg-gray-200'}`}
                    >
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

                {/* Toggle expand button */}
                <div className="flex items-center justify-center w-12 px-2">
                    <button
                        onClick={toggleExpand}
                        className="flex items-center justify-center w-6 h-6 rounded-full transition-colors cursor-pointer"
                    >
                        <img
                            src={arrowDown}
                            alt={expanded ? "Collapse" : "Expand"}
                            className={`w-4 h-4 text-[#6366F1] transition-transform ${expanded ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>


            </div>

            {/* Expanded detail section */}
            {
                expanded && (
                    <div className="rounded-b-[8px] bg-indigo-50 mt-0 mb-2 overflow-hidden border border-[#E5E5E5] border-t-0">
                        {/* Header */}
                        <div className="flex items-center bg-[#F3F4F6] px-3 border-t border-indigo-100">
                            <div className="w-12 px-4 py-3 text-center">
                                <span className="text-xs font-normal text-gray-500">STT</span>
                            </div>
                            <div className="px-4 py-3 w-40">
                                <span className="text-xs font-normal text-gray-500 ">Mã sản phẩm</span>
                            </div>
                            <div className=" px-4 py-3 w-40">
                                <span className="text-xs font-normal text-gray-500">Tên sản phẩm</span>
                            </div>
                            <div className=" px-4 py-3 text-right w-70">
                                <span className="text-xs font-normal text-gray-500">Giá bán (VND)</span>
                            </div>
                            <div className=" px-4 py-3 text-right w-70">
                                <span className="text-xs font-normal text-gray-500">Thuế suất đầu vào (%)</span>
                            </div>
                            <div className=" px-4 py-3 text-right w-70 ">
                                <span className="text-xs font-normal text-gray-500">Thuế suất đầu ra (%)</span>
                            </div>
                            <div className="flex-1 px-4 py-3">
                                <span className="text-xs font-normal text-gray-500">Mô tả</span>
                            </div>
                        </div>

                        {/* Product rows - chỉ phần này scroll */}
                        <div className="max-h-64 overflow-y-auto">
                            {products.map((product, index) => (
                                <div key={index} className="flex items-center bg-white px-3">
                                    <div className="w-12 px-4 py-3 text-center">
                                        <span className="text-xs font-normal text-gray-900">{index + 1}</span>
                                    </div>
                                    <div className="w-40 px-4 py-3">
                                        <span className="text-xs font-normal text-gray-900">{product.productCode}</span>
                                    </div>
                                    <div className=" px-4 py-3 w-40">
                                        <span className="text-xs font-normal text-gray-900">{product.productName}</span>
                                    </div>
                                    <div className=" px-4 py-3 text-right w-70">
                                        <span className="text-xs font-normal text-indigo-700">
                                            {product.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className=" px-4 py-3 text-right w-70">
                                        <span className="text-xs font-normal text-indigo-700">{product.inputTax}</span>
                                    </div>
                                    <div className="px-4 py-3 text-right w-70">
                                        <span className="text-xs font-normal text-indigo-700">{product.outputTax}</span>
                                    </div>
                                    <div className="flex-1 px-4 py-3">
                                        <span className="text-xs font-normal text-gray-900">{product.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add product button */}
                        <div
                            className="flex items-center justify-center py-2 bg-indigo-50 cursor-pointer hover:bg-indigo-100 border-t border-gray-200"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAddfast(true);
                            }}
                        >
                            <div className="w-5 h-5 flex items-center justify-center text-[#6366F1]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </div>
                            <span className="ml-2 text-sm font-semibold text-[#6366F1]">Thêm sản phẩm</span>
                        </div>
                    </div>
                )
            }

            {/* Delete Confirmation Modal */}
            <DeletePopup
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                itemName={name}
                itemType="bảng giá"
                onConfirm={handleConfirmDelete}
            />

            {/* Chi tiết bảng giá Popup */}
            <Addfast
                isOpen={showAddfast}
                onClose={() => setShowAddfast(false)}
                priceListCode={code}
                onSave={(data) => {
                    console.log('Saved:', data);
                    // Thực hiện lưu dữ liệu
                    setShowAddfast(false);
                }}
            />
        </div >
    );
};

export default PriceListTableRow;
