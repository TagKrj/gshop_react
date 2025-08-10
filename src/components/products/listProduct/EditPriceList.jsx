import React, { useState, useRef } from 'react';
import arrowDown from '../../../assets/icons/arrow-down.svg';
import trashIcon from '../../../assets/icons/trash.svg';
import addIcon from '../../../assets/icons/add-indigo.svg';
import Portal from '../../Portal';
import Button from '../../button';

const EditPriceList = ({ isOpen, onClose, priceListData, onSave }) => {
    const [name, setName] = useState(priceListData?.name || '');
    const [productRows, setProductRows] = useState(priceListData?.products || []);
    const [newProductRow, setNewProductRow] = useState({
        productCode: '',
        productName: '',
        price: '',
        inputTax: '',
        outputTax: '',
        description: ''
    });
    const productCodeRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSave = () => {
        const updatedData = {
            ...priceListData,
            name,
            products: productRows
        };
        onSave(updatedData);
    };

    const handleAddProduct = () => {
        if (newProductRow.productCode) {
            setProductRows([...productRows, { ...newProductRow, id: Date.now() }]);
            setNewProductRow({
                productCode: '',
                productName: '',
                price: '',
                inputTax: '',
                outputTax: '',
                description: ''
            });
        }
    };

    const handleDeleteProduct = (index) => {
        const updatedRows = [...productRows];
        updatedRows.splice(index, 1);
        setProductRows(updatedRows);
    };

    const handleDeleteAll = () => {
        setProductRows([]);
    };

    if (!isOpen) return null;

    return (
        <Portal>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/50 ">
                <div className="bg-white rounded-xl shadow-lg w-[1260px] max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-6">
                        <h2 className="text-xl font-bold text-gray-800">Chỉnh sửa bảng giá</h2>
                        <div
                            onClick={onClose}
                            className="w-4 h-4 flex items-center justify-center relative cursor-pointer">
                            <span className="absolute w-4 h-0.5 bg-gray-500 rotate-45"></span>
                            <span className="absolute w-4 h-0.5 bg-gray-500 -rotate-45"></span>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-auto p-6">
                        <div className="flex flex-col gap-6">
                            {/* Thông tin chung */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-base font-semibold text-[#6366F1]">Thông tin chung</h3>
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                                            Tên bảng giá <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-4 text-sm border border-gray-200 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            placeholder="Nhập tên bảng giá"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                                            Mã bảng giá
                                        </label>
                                        <input
                                            type="text"
                                            value={priceListData?.code || ''}
                                            disabled
                                            className="w-full px-4 py-4 text-[#A3A3A3] text-sm bg-gray-100 border border-gray-200 rounded-[8px]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Chi tiết giá sản phẩm */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-base font-semibold text-[#6366F1]">Chi tiết giá sản phẩm</h3>

                                {/* Table */}
                                <div className="border border-gray-200 rounded-[8px] overflow-hidden">
                                    {/* Header */}
                                    <div className="flex bg-[#F3F4F6]">
                                        <div className="w-[60px] py-3 px-1 text-xs text-[#737373] text-center">STT</div>
                                        <div className="w-[120px] py-3 px-1 text-xs text-[#737373] ">Mã sản phẩm</div>
                                        <div className="w-[150px] py-3 px-1 text-xs text-[#737373] ">Tên sản phẩm</div>
                                        <div className="w-[220px] py-3 px-1 text-xs text-[#737373] text-right">Giá bán (VND)</div>
                                        <div className="w-[170px] py-3 px-1 text-xs text-[#737373] text-right">Thuế suất đầu vào (%)</div>
                                        <div className="w-[170px] py-3 pl-1 pr-5 text-xs text-[#737373] text-right">Thuế suất đầu ra (%)</div>
                                        <div className="w-[270px] py-3 px-1 text-xs text-[#737373]">Mô tả</div>
                                        <div className="flex-1 py-3 text-xs text-[#737373]"></div>
                                    </div>

                                    {/* Delete all button */}
                                    <div className="flex justify-end bg-red-50 py-2 px-5">
                                        <button
                                            onClick={handleDeleteAll}
                                            className="flex items-center text-sm font-semibold text-red-600 cursor-pointer "
                                        >
                                            <span className='mr-2'>Xóa tất cả</span>
                                            <img src={trashIcon} alt="Delete" className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Product rows */}
                                    <div className="max-h-[400px] overflow-y-auto">
                                        {productRows.map((row, index) => (
                                            <div key={row.id || index} className="flex bg-[#FAFAFA]">
                                                <div className="w-[60px] py-3 px-1 text-xs text-center">{index + 1}</div>
                                                <div className="w-[120px] py-3 px-1 text-xs">{row.productCode}</div>
                                                <div className="w-[150px] py-3 px-1 text-xs">{row.productName}</div>
                                                <div className="w-[220px] py-3 px-1 text-xs text-indigo-700 text-right">
                                                    {typeof row.price === 'number' ? row.price.toLocaleString() : row.price}
                                                </div>
                                                <div className="w-[170px] py-3 px-1 text-xs text-indigo-700 text-right">{row.inputTax}</div>
                                                <div className="w-[170px] py-3 pl-1 pr-5 text-xs text-indigo-700 text-right">{row.outputTax}</div>
                                                <div className="w-[270px] py-3 px-1 text-xs">{row.description}</div>
                                                <div className="flex-1 py-3 px-1 flex justify-center ">
                                                    <button
                                                        onClick={() => handleDeleteProduct(index)}
                                                        className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                                                    >
                                                        <img src={trashIcon} alt="Delete" className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add new product row */}
                                        <div className="flex bg-gray-50 py-2">
                                            <div className="w-[60px] py-3 px-1 text-xs text-center">
                                                {productRows.length + 1}
                                            </div>
                                            <div className="w-[120px] text-xs relative bg">
                                                <div
                                                    className="relative"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                >
                                                    <div
                                                        ref={productCodeRef}
                                                        className="flex items-center justify-between w-full px-4 py-3 text-sm border border-gray-200 rounded-[8px] cursor-pointer bg-white"
                                                    >
                                                        <span className="text-gray-600">Chọn</span>
                                                        <img
                                                            src={arrowDown}
                                                            alt="arrow"
                                                            className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                                        />
                                                    </div>
                                                    {isDropdownOpen && (
                                                        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                                            <ul className="py-1 max-h-48 overflow-y-auto">
                                                                <li
                                                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                    onClick={() => {
                                                                        setNewProductRow({
                                                                            ...newProductRow,
                                                                            productCode: '123456789',
                                                                            productName: 'Tên sản phẩm 1'
                                                                        });
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                >
                                                                    OP3456789
                                                                </li>
                                                                <li
                                                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                    onClick={() => {
                                                                        setNewProductRow({
                                                                            ...newProductRow,
                                                                            productCode: '987654321',
                                                                            productName: 'Tên sản phẩm 2'
                                                                        });
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                >
                                                                    OP98765432
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-[150px] px-4 text-xs">
                                                <span className="block py-3">
                                                    {newProductRow.productName || '-'}
                                                </span>
                                            </div>

                                            <div className="w-[220px] text-xs flex justify-end">
                                                <div className='w-[100px]'>
                                                    <input
                                                        type="text"
                                                        value={newProductRow.inputTax}
                                                        onChange={(e) => setNewProductRow({ ...newProductRow, inputTax: e.target.value })}
                                                        className="w-full px-4 py-3 text-sm text-right border border-gray-200 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                                                        placeholder="Nhập số"
                                                    />
                                                </div>
                                            </div>
                                            <div className='w-[170px] '>

                                            </div>
                                            <div className="w-[170px] flex justify-end pr-5 text-xs">
                                                <div className='w-[100px]'></div>
                                                <input
                                                    type="text"
                                                    value={newProductRow.outputTax}
                                                    onChange={(e) => setNewProductRow({ ...newProductRow, outputTax: e.target.value })}
                                                    className="w-full px-4 py-3 text-sm text-right border border-gray-200 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                                                    placeholder="Nhập số"
                                                />
                                            </div>
                                            <div className="w-[270px] text-xs">
                                                <input
                                                    type="text"
                                                    value={newProductRow.description}
                                                    onChange={(e) => setNewProductRow({ ...newProductRow, description: e.target.value })}
                                                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                                                    placeholder="Nhập nội dung"
                                                />
                                            </div>
                                            <div className="flex-1 px-1 flex justify-center">
                                                <button
                                                    onClick={handleDeleteProduct}
                                                    className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                                                >
                                                    <img src={trashIcon} alt="Delete" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Add new product button */}
                                    <div className="flex items-center justify-center py-3 bg-indigo-50 border-t border-gray-200 cursor-pointer hover:bg-indigo-100"
                                        onClick={handleAddProduct}>
                                        <img src={addIcon} alt="Add" className="w-5 h-5" />
                                        <span className="ml-2 text-sm font-semibold text-[#6366F1]">Thêm sản phẩm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 px-6 py-4 ">
                        <Button
                            type="secondary"
                            size="medium"
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            size="medium"
                            onClick={handleSave}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </div>
        </Portal>

    );
};

export default EditPriceList;
