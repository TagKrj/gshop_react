import React, { useState, useRef, useEffect } from 'react';
import EditDeleteBox from '../../editDeleteBox';
import DeletePopup from '../../deletePopup';
import EditListProduct from './editListProduct';
import AddListProduct from './AddListProduct';
import DetailListPrice from './detailListPrice';
import MoreIcon from '../../../assets/icons/more.svg';
import arrowDown from '../../../assets/icons/arrow-down-2.svg';
import eyeIcon from '../../../assets/icons/eye.svg';

const ListProductTableRow = ({
    id,
    img,
    code,
    name,
    productType: { id: productTypeId, name: productTypeName } = {},
    InputTaxRate,
    OutputTaxRate,
    unit,
    unitPerBox,
    inventoryThreshold,
    lastUpdate,
    updatedBy,
    length,
    width,
    height,
    nameImgProduct = [],
    priceList = [],
    isSelected = false,
    onSelect,
    onEdit,
    onDelete
}) => {
    // Build products for the expanded section from incoming priceList
    const products = (priceList ?? []).map((pl) => ({
        productCode: code,
        productName: name,
        price: pl.price,
        inputTax: InputTaxRate,
        outputTax: OutputTaxRate,
        description: pl.name
    }));

    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAddfast, setShowAddfast] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailPrice, setShowDetailPrice] = useState(false);
    const [expanded, setExpanded] = useState(false);
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
        setShowDropdown(false);
        setShowEditModal(true);
        if (onEdit) {
            onEdit(id);
        }
    };

    const handleAdd = () => {
        setShowDropdown(false);
        setShowAddModal(true);
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
            {/* Main row */}
            <div className={`flex items-center px-3 py-3 rounded-[8px] mt-2 transition-colors cursor-pointer hover:bg-indigo-50  ${expanded ? 'bg-indigo-50 rounded-b-none border border-[#E5E5E5]' : ''} ${isSelected ? 'bg-indigo-50' : expanded ? 'bg-indigo-50' : 'bg-[#FAFAFA]'}`}>
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

                {/* Ảnh sản phẩm */}
                <div className="flex items-center justify-center w-25">
                    {img && (
                        <img src={img} alt={name} className="w-[55px] h-[55px] object-cover rounded-[4px]" />
                    )}
                </div>

                {/* Mã sản phẩm */}
                <div className="flex items-center px-4 py-3 w-40">
                    <span className="text-sm font-medium text-[#161413]">{code}</span>
                </div>

                {/* Tên sản phẩm */}
                <div className="flex items-center px-4 py-3 w-45">
                    <span className="text-sm font-medium text-[#161413]">{name}</span>
                </div>

                {/* Loại sản phẩm */}
                <div className="flex items-center px-4 py-3 w-50">
                    <div className="px-3 rounded-[8px] border text-center"
                        style={{ borderColor: colorBorder[id % colorBorder.length] }}>
                        <span className="text-sm font-normal text-[#2E319E]">{productTypeName}</span>
                    </div>
                </div>

                {/* Thuế suất đầu vào */}
                <div className="flex items-center justify-end px-4 py-3 w-45">
                    <div className="px-3 py-1">
                        <span className="text-sm font-normal text-[#2E319E]">{InputTaxRate}</span>
                    </div>
                </div>

                {/* Thuế suất đầu ra */}
                <div className="flex items-center justify-end px-4 py-3 w-40">
                    <div className="px-3 py-1 ">
                        <span className="text-sm font-normal text-[#2E319E]">{OutputTaxRate}</span>
                    </div>
                </div>

                {/* Đơn vị */}
                <div className="flex items-center px-4 py-3 w-25">
                    <span className="text-sm font-light text-[#161413]">{unit}</span>
                </div>

                {/* Đơn vị/thùng */}
                <div className="flex items-center justify-end px-4 py-3 w-25">
                    <span className="text-sm font-medium text-[#2E319E]">{unitPerBox || 0}</span>
                </div>

                {/* Ngưỡng tồn kho */}
                <div className="flex items-center justify-end px-4 py-3 w-40">
                    <span className="text-sm font-medium text-[#2E319E]">{inventoryThreshold || 0}</span>
                </div>

                {/* Cập nhật lần cuối */}
                <div className="flex items-center px-4 py-3 flex-1">
                    <span className="text-xs font-normal text-gray-500">{lastUpdate}{updatedBy ? <> bởi <span className="text-xs font-semibold text-[#2E319E]">{updatedBy}</span></> : null}</span>
                </div>

                {/* Action column - More button */}
                <div className="flex items-center justify-center w-12 px-2 relative">
                    <button
                        ref={moreButtonRef}
                        onClick={handleMoreClick}
                        className="flex items-center justify-center w-6 h-6 rounded-full transition-colors cursor-pointer hover:bg-gray-100"
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
                    <div className="rounded-b-[8px] bg-white mt-0 mb-2 overflow-hidden border border-[#E5E5E5] border-t-0">
                        {/* Chi tiết sản phẩm */}
                        <div className="flex flex-row flex-wrap items-start gap-3 p-6">
                            {/* Cột 1: Dài + Giá sản phẩm */}
                            <div className=" flex-1 ">
                                {/* Dài (cm) */}
                                <div className="flex flex-col gap-1 mb-4">
                                    <span className="text-[13px] font-normal text-[#737373]">Dài (cm)</span>
                                    <span className="text-[16px] font-normal text-[#161413]">{length || 0}</span>
                                </div>

                                {/* Giá sản phẩm */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-[13px] font-normal text-[#737373]">Giá sản phẩm</span>
                                    <div
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => setShowDetailPrice(true)}
                                    >
                                        <span className="text-[14px] font-semibold text-[#2E319E]">Xem chi tiết</span>
                                        <img src={eyeIcon} alt="Xem chi tiết" className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Cột 2: Rộng + Hình ảnh sản phẩm */}
                            <div className=" flex-1 ">
                                {/* Rộng (cm) */}
                                <div className="flex flex-col gap-1 mb-4">
                                    <span className="text-[13px] font-normal text-[#737373]">Rộng (cm)</span>
                                    <span className="text-[16px] font-normal text-[#161413]">{width || 0}</span>
                                </div>

                                {/* Hình ảnh sản phẩm */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-[13px] font-normal text-[#737373]">Hình ảnh sản phẩm</span>
                                    <div className="flex flex-row gap-2 mt-1">
                                        {nameImgProduct && nameImgProduct.length > 0 ? (
                                            nameImgProduct.map(imgObj => (
                                                <div
                                                    key={imgObj.id}
                                                    className="bg-[#F3F4F6] border border-[#F5F5F5] rounded-[99px] px-3 py-2"
                                                >
                                                    <span className="text-[13px] font-semibold text-[#2E319E]">{imgObj.name}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-xs text-gray-400">Không có ảnh</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Cột 3: Cao */}
                            <div className=" flex-1 ">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[13px] font-normal text-[#737373]">Cao (cm)</span>
                                    <span className="text-[16px] font-normal text-[#161413]">{height || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Delete Confirmation Modal */}
            <DeletePopup
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                itemName={name}
                itemType="sản phẩm"
                onConfirm={handleConfirmDelete}
            />

            {/* Chi tiết giá sản phẩm */}
            <DetailListPrice
                isOpen={showDetailPrice}
                onClose={() => setShowDetailPrice(false)}
                productData={{
                    id,
                    code,
                    name,
                    category: productTypeName,
                    inputTax: InputTaxRate,
                    outputTax: OutputTaxRate,
                    unit,
                    unitsPerBox: unitPerBox,
                    lastUpdated: {
                        date: lastUpdate,
                        by: updatedBy
                    },
                    pricingList: priceList?.map(price => ({
                        code: price.code || 'PC001',
                        name: price.name || 'Bảng giá mặc định',
                        price: price.price || 0
                    })) || []
                }}
                onSave={(updatedData) => {
                    console.log('Chi tiết giá sản phẩm:', updatedData);
                    setShowDetailPrice(false);
                }}
            />

            {/* Chỉnh sửa sản phẩm Popup */}
            <EditListProduct
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                productData={{
                    id,
                    code,
                    name,
                    products
                }}
                onSave={(updatedData) => {
                    console.log('Saved updated data:', updatedData);
                    // Thực hiện lưu dữ liệu đã cập nhật
                    setShowEditModal(false);
                }}
            />

            {/* Thêm sản phẩm mới Popup */}
            <AddListProduct
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
        </div>
    );
};

export default ListProductTableRow;
