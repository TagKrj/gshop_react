import React, { useState } from 'react';
import Portal from '../../Portal';
import closeIcon from '../../../assets/icons/close_icon.svg';
import arrowDown from '../../../assets/icons/arrow-down.svg';
import trash from '../../../assets/icons/trash.svg';
import addIndigo from '../../../assets/icons/add-indigo.svg';
import fileUpload from '../../../assets/icons/file-upload.png';

const EditListProduct = ({ isOpen, onClose, productData }) => {
    const [activeTab, setActiveTab] = useState('info'); // 'info' or 'upload'
    const [priceList, setPriceList] = useState([
        { id: 1, code: 'PC001', name: 'Bảng giá bán lẻ', price: 120000 },
        { id: 2, code: 'PC002', name: 'Bảng giá bán buôn', price: 90000 },
        // New price list row with empty values for adding new price
        { id: 3, code: '', name: '', price: 0 }
    ]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleRemovePrice = (id) => {
        setPriceList(priceList.filter(item => item.id !== id));
    };

    const handleAddPrice = () => {
        const newId = priceList.length > 0 ? Math.max(...priceList.map(item => item.id)) + 1 : 1;
        setPriceList([...priceList, { id: newId, code: '', name: '', price: 0 }]);
    };

    const handlePriceChange = (id, field, value) => {
        setPriceList(priceList.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Kiểm tra giới hạn tối đa 5 ảnh
            const totalFiles = uploadedFiles.length + files.length;
            if (totalFiles > 5) {
                alert('Bạn chỉ được phép tải lên tối đa 5 ảnh!');
                return;
            }

            const newFiles = files.map((file, index) => ({
                id: uploadedFiles.length + index + 1,
                name: file.name,
                file
            }));
            setUploadedFiles([...uploadedFiles, ...newFiles]);
        }
    };

    const handleRemoveFile = (id) => {
        setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    };

    if (!isOpen) return null;

    return (
        <Portal>
            <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg w-[1127px] max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6">
                        <h2 className="text-xl font-bold text-[#404040]">Chỉnh sửa sản phẩm - Mã PD001</h2>
                        <button onClick={onClose} className="w-5 h-5">
                            <img src={closeIcon} alt="Close" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-[#F5F5F5] px-3">
                        <button
                            className={`px-3 py-2 font-semibold text-sm ${activeTab === 'info' ? 'text-[#737373]' : 'text-[#404040] border-b-2 border-[#2E319E] cursor-pointer'}`}
                            onClick={() => handleTabChange('upload')}
                        >
                            Tải lên file
                        </button>
                        <button
                            className={`px-3 py-2 font-semibold text-sm ${activeTab === 'upload' ? 'text-[#737373]' : 'text-[#404040] border-b-2 border-[#2E319E] cursor-pointer'}`}
                            onClick={() => handleTabChange('info')}
                        >
                            Nhập thông tin
                        </button>

                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto">
                        <div className="flex gap-4">
                            {/* Left column */}
                            <div className="flex-1 flex flex-col gap-4">
                                {/* General Information */}
                                <div className="mb-6">
                                    <h3 className="text-[#6366F1] font-semibold mb-6">Thông tin chung</h3>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <div className="flex">
                                                    <label className="text-[#737373] font-semibold text-sm">Tên sản phẩm</label>
                                                    <span className="text-[#EB3838] ml-1">*</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4"
                                                    defaultValue="Đồ chơi thông minh cho trẻ em"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[#737373] font-semibold text-sm">Mã SKU</label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4"
                                                    defaultValue="PD001"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <div className="flex">
                                                    <label className="text-[#737373] font-semibold text-sm">Loại sản phẩm</label>
                                                    <span className="text-[#EB3838] ml-1">*</span>
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4 appearance-none bg-white"
                                                        defaultValue="Loại sản phẩm 1"
                                                    >
                                                        <option>Loại sản phẩm 1</option>
                                                        <option>Loại sản phẩm 2</option>
                                                        <option>Loại sản phẩm 3</option>
                                                    </select>
                                                    <img
                                                        src={arrowDown}
                                                        alt="Arrow"
                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[#737373] font-semibold text-sm">Ngưỡng cảnh báo tồn kho (đơn vị)</label>
                                                <input
                                                    type="number"
                                                    className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4 text-right"
                                                    defaultValue="100"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <label className="text-[#737373] font-semibold text-sm">Thuế suất đầu vào (%)</label>
                                                <input
                                                    type="number"
                                                    className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4 text-right"
                                                    defaultValue="8"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[#737373] font-semibold text-sm">Thuế suất đầu ra (%)</label>
                                                <input
                                                    type="number"
                                                    className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4 text-right"
                                                    defaultValue="10"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <div className="flex">
                                                    <label className="text-[#737373] font-semibold text-sm">Đơn vị tính</label>
                                                    <span className="text-[#EB3838] ml-1">*</span>
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4 appearance-none bg-white"
                                                        defaultValue="Hộp"
                                                    >
                                                        <option>Hộp</option>
                                                        <option>Cái</option>
                                                        <option>Thùng</option>
                                                    </select>
                                                    <img
                                                        src={arrowDown}
                                                        alt="Arrow"
                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[#737373] font-semibold text-sm">Đơn vị/thùng</label>
                                                <input
                                                    type="number"
                                                    className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4 text-right"
                                                    defaultValue="12"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Price List */}
                                <div>
                                    <h3 className="text-[#6366F1] font-semibold mb-6">Giá sản phẩm</h3>
                                    <div className="border rounded-[8px] overflow-hidden">
                                        {/* Table Header */}
                                        <div className="grid grid-cols-5 bg-[#F3F4F6]">
                                            <div className="p-3 text-sm font-normal text-[#737373] w-[120px]">Mã bảng giá</div>
                                            <div className="p-3 text-sm font-normal text-[#737373] flex-1">Tên bảng giá</div>
                                            <div className="p-3 text-sm font-normal text-[#737373] text-right w-[166px]">Giá bán (VND)</div>
                                            <div className="p-3 text-sm font-normal text-[#737373] w-[48px]"></div>
                                            <div className="p-3 text-sm font-normal text-[#737373] w-[8px]"></div>
                                        </div>

                                        {/* Table Body */}
                                        <div className="max-h-[250px] overflow-y-auto">
                                            {priceList.map((item) => (
                                                <div key={item.id} className="grid grid-cols-5 bg-[#FAFAFA] border-b border-[#F5F5F5]">
                                                    {item.code ? (
                                                        <>
                                                            <div className="p-3 text-sm font-normal text-[#161413] w-[120px]">{item.code}</div>
                                                            <div className="p-3 text-sm font-normal text-[#161413] flex-1">{item.name}</div>
                                                            <div className="p-3 text-sm font-normal text-[#2E319E] text-right w-[166px]">
                                                                {item.price.toLocaleString()}
                                                            </div>
                                                            <div className="p-3 flex justify-center items-center">
                                                                <button
                                                                    onClick={() => handleRemovePrice(item.id)}
                                                                    className="p-2 rounded-full hover:bg-gray-200"
                                                                >
                                                                    <img src={trash} alt="Delete" className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                            <div></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="p-3 w-[120px]">
                                                                <select
                                                                    className="w-full border border-[#E5E5E5] rounded-[8px] p-3 text-sm"
                                                                    onChange={(e) => handlePriceChange(item.id, 'code', e.target.value)}
                                                                >
                                                                    <option value="">Chọn</option>
                                                                    <option value="PC003">PC003</option>
                                                                    <option value="PC004">PC004</option>
                                                                </select>
                                                            </div>
                                                            <div className="p-3 flex-1 text-sm">-</div>
                                                            <div className="p-3 w-[166px]">
                                                                <input
                                                                    type="number"
                                                                    className="w-full border border-[#E5E5E5] rounded-[8px] p-3 text-sm text-right"
                                                                    value={item.price}
                                                                    onChange={(e) => handlePriceChange(item.id, 'price', Number(e.target.value))}
                                                                />
                                                            </div>
                                                            <div className="p-3 flex justify-center items-center">
                                                                <button
                                                                    onClick={() => handleRemovePrice(item.id)}
                                                                    className="p-2 rounded-full hover:bg-gray-200"
                                                                >
                                                                    <img src={trash} alt="Delete" className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                            <div></div>
                                                        </>
                                                    )}
                                                </div>
                                            ))}

                                            {/* Add New Price */}
                                            <div
                                                className="flex items-center justify-center gap-3 p-2 bg-[#F1F1FE] cursor-pointer"
                                                onClick={handleAddPrice}
                                            >
                                                <img src={addIndigo} alt="Add" className="w-4 h-4" />
                                                <span className="text-sm font-semibold text-[#6366F1]">Thêm bảng giá</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="w-[380px]">
                                {/* Product Dimensions */}
                                <div className="mb-6">
                                    <h3 className="text-[#6366F1] font-semibold mb-6">Kích thước sản phẩm</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="space-y-2">
                                            <label className="text-[#737373] font-semibold text-sm">Dài (cm)</label>
                                            <input
                                                type="number"
                                                className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4 text-right bg-gray-50"
                                                defaultValue="0"
                                                disabled
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[#737373] font-semibold text-sm">Rộng (cm)</label>
                                            <input
                                                type="number"
                                                className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4 text-right"
                                                defaultValue="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[#737373] font-semibold text-sm">Cao (cm)</label>
                                            <input
                                                type="number"
                                                className="w-full border border-[#E5E5E5] rounded-[8px] px-4 py-4 text-right"
                                                defaultValue="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Product Images */}
                                <div>
                                    <h3 className="text-[#6366F1] font-semibold mb-6">Hình ảnh sản phẩm</h3>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="file-upload"
                                            className="flex flex-col items-center justify-center p-6 border border-dashed border-[#6366F1] rounded-[6px] bg-[#F1F1FE] cursor-pointer"
                                        >
                                            <img src={fileUpload} alt="Upload" className="w-[45px] h-[45px] mb-4" />
                                            <div className="text-center">
                                                <p className="text-[#2E319E] font-semibold text-sm">Nhấn để tải lên file</p>
                                                <p className="text-[#737373] text-xs">Định dạng hợp lệ: .png, .jpg, .jpeg (Tối đa 5 file)</p>
                                                {uploadedFiles.length > 0 && (
                                                    <p className="text-[#2E319E] text-xs mt-1">Đã tải lên: {uploadedFiles.length}/5</p>
                                                )}
                                            </div>
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept=".png,.jpg,.jpeg"
                                            multiple
                                            className="hidden"
                                            onChange={handleFileUpload}
                                            disabled={uploadedFiles.length >= 5}
                                        />
                                    </div>

                                    {/* Uploaded Files */}
                                    <div className="space-y-2">
                                        {uploadedFiles.map((file) => (
                                            <div
                                                key={file.id}
                                                className="flex items-center justify-between p-3 border border-[#F5F5F5] rounded-[8px] bg-[#FAFAFA]"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-[30px] h-[30px] flex items-center justify-center border border-[#DBDEE0] rounded-md">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.98 8.71C21.9 8 21.64 7.35 21.21 6.82C20.33 5.73 18.85 5.54 16.68 5.97C15.46 4.58 14.57 4 12.98 4H11.02C9.43 4 8.54 4.58 7.32 5.97C5.15 5.54 3.67 5.73 2.79 6.82C1.43 8.51 2.23 11.38 4.66 14.47C4.37 15.06 4.21 15.71 4.2 16.37C4.15 18.43 5.8 20 8.2 20H15.8C18.2 20 19.85 18.43 19.8 16.37C19.79 15.71 19.63 15.06 19.34 14.47C20.8 12.68 21.63 10.92 21.98 9.35C22.2 8.49 22.16 8.76 21.98 8.71Z" stroke="#8B8C99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M7.5 14C9.98528 14 12 11.9853 12 9.5C12 7.01472 9.98528 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 11.9853 5.01472 14 7.5 14Z" stroke="#8B8C99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-semibold text-sm text-[#404040]">{file.name}</span>
                                                </div>
                                                <button onClick={() => handleRemoveFile(file.id)}>
                                                    <img src={trash} alt="Delete" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-2 p-3 border-t">
                        <button
                            onClick={onClose}
                            className="px-5 py-3 border border-[#E5E5E5] rounded-lg text-sm font-semibold text-[#6366F1]"
                        >
                            Hủy
                        </button>
                        <button
                            className="px-5 py-3 bg-[#E5E5E5] rounded-lg text-sm font-semibold text-[#A3A3A3]"
                            disabled
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default EditListProduct;
