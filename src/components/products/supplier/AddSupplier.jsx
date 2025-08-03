import React, { useState, useRef } from 'react';
import importIcon from '../../../assets/icons/import.svg';
import fileUploadIcon from '../../../assets/icons/file-upload.png';
import excelIcon from '../../../assets/icons/filetype-excel.png';
import trashIcon from '../../../assets/icons/trash.svg';
import Button from '../../button';

const AddSupplier = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'manual'
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        contactPerson: '',
        position: '',
        phone: '',
        email: '',
        address: '',
        paymentMethod: '',
        note: ''
    });
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Filter for only Excel files
        const validFiles = selectedFiles.filter(
            file => file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        if (validFiles.length === 0 && selectedFiles.length > 0) {
            alert('Vui lòng chỉ chọn file Excel (.xlsx)');
            return;
        }

        // Add new files to the existing files array
        setFiles(prevFiles => [...prevFiles, ...validFiles]);

        // Reset file input value to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveFile = (indexToRemove) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = () => {
        // Validation for manual input
        if (activeTab === 'manual') {
            const newErrors = {};

            if (!formData.code.trim()) {
                newErrors.code = 'Mã nhà cung cấp là bắt buộc';
            }

            if (!formData.name.trim()) {
                newErrors.name = 'Tên nhà cung cấp là bắt buộc';
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
        } else if (activeTab === 'upload' && files.length === 0) {
            alert('Vui lòng chọn ít nhất một file trước khi xác nhận');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            // Add success notification here
        }, 1000);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 transition-all isolate">
            <div className="bg-white rounded-[12px] shadow-xl w-[760px] max-h-[90vh] flex flex-col transition-transform duration-300 px-6"
                style={{ zIndex: 9999 }}>
                {/* Header */}
                <div className="flex items-center justify-between py-6">
                    <h2 className="text-xl font-bold text-gray-700">Tạo nhà cung cấp</h2>
                    <button
                        onClick={onClose}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer"
                    >
                        {/* Nút đóng (X)*/}
                        <div className="w-4 h-4 flex items-center justify-center relative">
                            <span className="absolute w-4 h-0.5 bg-gray-500 rotate-45"></span>
                            <span className="absolute w-4 h-0.5 bg-gray-500 -rotate-45"></span>
                        </div>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    <button
                        className={`px-4 py-2 text-sm font-semibold border-b-2 cursor-pointer ${activeTab === 'upload'
                            ? 'border-indigo-700 text-indigo-700'
                            : 'border-transparent text-gray-500'
                            }`}
                        onClick={() => handleTabChange('upload')}
                    >
                        Tải lên file
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-semibold border-b-2 cursor-pointer ${activeTab === 'manual'
                            ? 'border-indigo-700 text-indigo-700'
                            : 'border-transparent text-gray-500'
                            }`}
                        onClick={() => handleTabChange('manual')}
                    >
                        Nhập thông tin
                    </button>
                </div>

                {/* Content */}
                <div className="mt-4 overflow-y-auto">
                    {activeTab === 'upload' ? (
                        <>
                            {/* Notice - Only shown when no files are selected */}
                            {files.length === 0 && (
                                <div className="flex items-center gap-3 p-4 mb-4 bg-red-50 border border-red-300 rounded-[6px]">
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-red-600 mb-1">
                                            Lưu ý trước khi tải file lên hệ thống!
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Vui lòng tải và nhập thông tin vào file template trước khi upload lên hệ thống.
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-2 bg-[#0768DF] hover:bg-[#046eefe8] text-white px-4 py-2.5 rounded-[8px] text-sm font-semibold transition-colors cursor-pointer">
                                        <img src={importIcon} alt="Download" className="w-4 h-4" />
                                        <span>Tải template</span>
                                    </button>
                                </div>
                            )}

                            {/* Upload area */}
                            <div
                                className="flex flex-col items-center justify-center border border-dashed border-indigo-400 bg-indigo-50 rounded-[6px] p-8 mb-4 cursor-pointer hover:bg-indigo-100 transition-colors"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    id="fileInput"
                                    accept=".xlsx"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    multiple
                                />
                                <img src={fileUploadIcon} alt="Upload" className="w-16 h-16 mb-3" />
                                <p className="text-sm font-semibold text-indigo-700">
                                    Nhấn để tải lên file từ máy của bạn
                                </p>
                            </div>

                            {/* Uploaded files list */}
                            {files.length > 0 && (
                                <div className="mt-4 max-h-[250px] overflow-y-auto">
                                    {files.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between py-3 px-4 bg-[#FAFAFA] border border-[#F5F5F5] rounded-[6px] mb-2"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={excelIcon} alt="Excel file" className="w-[30px] h-[30px]" />
                                                <div className="font-semibold text-sm text-gray-700">
                                                    {file.name}
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveFile(index);
                                                }}
                                                className="w-5 h-5 flex items-center justify-center text-red-500 hover:bg-gray-100 rounded-full"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.5 4.98334C14.725 4.70834 11.9333 4.56667 9.15 4.56667C7.5 4.56667 5.85 4.65001 4.2 4.81667L2.5 4.98334" stroke="#EB3838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7.08331 4.14167L7.26665 3.05001C7.39998 2.25834 7.49998 1.66667 8.90831 1.66667H11.0916C12.5 1.66667 12.6083 2.29167 12.7333 3.05834L12.9166 4.14167" stroke="#EB3838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M15.7084 7.61667L15.1667 16.0083C15.075 17.3167 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3167 4.83335 16.0083L4.29169 7.61667" stroke="#EB3838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8.60834 13.75H11.3833" stroke="#EB3838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7.91669 10.4167H12.0834" stroke="#EB3838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        /* Manual input form */
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-6">
                            {/* Mã nhà cung cấp */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mã nhà cung cấp <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${errors.code ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                                    placeholder="Nhập mã nhà cung cấp"
                                />
                                {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
                            </div>

                            {/* Tên nhà cung cấp */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên nhà cung cấp <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                                    placeholder="Nhập tên nhà cung cấp"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

                            {/* Người liên hệ */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Người liên hệ
                                </label>
                                <input
                                    type="text"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Nhập tên người liên hệ"
                                />
                            </div>

                            {/* Chức vụ */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Chức vụ
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Nhập chức vụ"
                                />
                            </div>

                            {/* Điện thoại */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Điện thoại
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Nhập email"
                                />
                            </div>

                            {/* Địa chỉ - span full width */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Nhập địa chỉ"
                                />
                            </div>

                            {/* Phương thức thanh toán */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phương thức thanh toán
                                </label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                >
                                    <option value="">Chọn phương thức</option>
                                    <option value="cash">Tiền mặt</option>
                                    <option value="bank">Chuyển khoản</option>
                                    <option value="credit">Công nợ</option>
                                </select>
                            </div>

                            {/* Ghi chú */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ghi chú
                                </label>
                                <input
                                    type="text"
                                    name="note"
                                    value={formData.note}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Nhập ghi chú"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer with action buttons */}
                <div className="flex justify-end gap-2 p-6 border-t border-gray-100">
                    <Button
                        type="secondary"
                        onClick={onClose}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddSupplier;
