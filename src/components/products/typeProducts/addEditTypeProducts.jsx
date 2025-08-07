import React, { useState, useRef, useEffect } from 'react';
import Portal from '../../Portal';
import Button from '../../button';

const AddEditTypeProducts = ({
    isOpen,
    onClose,
    mode = 'add', // 'add' or 'edit'
    initialData = null,
    onSubmit
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            if (mode === 'edit' && initialData) {
                setFormData({
                    name: initialData.name || '',
                    description: initialData.description || ''
                });
            } else {
                setFormData({
                    name: '',
                    description: ''
                });
            }
            setErrors({});
            setShowError(false);
        }
    }, [isOpen, mode, initialData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }

        if (showError) {
            setShowError(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Tên loại sản phẩm là bắt buộc';
        }

        return newErrors;
    };

    const handleSubmit = async () => {
        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            if (onSubmit) {
                await onSubmit(formData);
            }
            onClose();
        } catch (error) {
            setErrorMessage(error.message || 'Thông tin loại sản phẩm đã tồn tại!');
            setShowError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const getTitle = () => {
        return mode === 'edit' ? 'Chỉnh sửa loại sản phẩm' : 'Tạo loại sản phẩm';
    };

    const isFormValid = formData.name.trim() && !Object.keys(errors).length;

    if (!isOpen) return null;

    return (
        <Portal>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-2xl w-[740px] max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-700">
                            {getTitle()}
                        </h2>
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

                    {/* Body */}
                    <div className="px-6 py-4 space-y-4">
                        {/* Error Alert */}
                        {showError && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                                <div className="w-6 h-6 text-red-500">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>
                                <span className="text-red-600 text-sm">
                                    {errorMessage}
                                </span>
                            </div>
                        )}

                        {/* Form Fields */}
                        <div className="space-y-3">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <label className="text-base font-semibold text-gray-700">
                                        Tên loại sản phẩm
                                    </label>
                                    <span className="text-red-500 font-semibold">*</span>
                                </div>
                                <div className={`border rounded-lg p-4 ${errors.name ? 'border-red-500' : 'border-gray-200'
                                    }`}>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Loại sản phẩm 1"
                                        className="w-full text-base text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none"
                                    />
                                </div>
                            </div>

                            {/* Description Field */}
                            <div className="space-y-2">
                                <label className="text-base font-semibold text-gray-700">
                                    Mô tả
                                </label>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Nhập nội dung"
                                        rows={4}
                                        className="w-full text-base text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2 pt-3">
                            <Button
                                type="secondary"
                                onClick={onClose}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="primary"
                                onClick={handleSubmit}
                                disabled={isSubmitting || !isFormValid}
                            >
                                {isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default AddEditTypeProducts;
