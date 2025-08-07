import React, { useState, useEffect } from 'react';
import Portal from '../../Portal';
import CloseIcon from '../../../assets/icons/close_icon.svg';
import ArrowDownIcon from '../../../assets/icons/arrow_down_icon.svg';

const Addfast = ({ isOpen, onClose, priceListCode, onSave }) => {
    const initialFormData = {
        priceListName: 'Loại giá A',
        priceListCode: priceListCode || 'SD000123',
        product: {
            code: '',
            name: '-',
            price: '',
            inputTax: '-',
            outputTax: '-',
            description: ''
        }
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (priceListCode) {
            setFormData(prev => ({
                ...prev,
                priceListCode
            }));
        }
    }, [priceListCode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.product.code) {
            newErrors['product.code'] = 'Vui lòng chọn sản phẩm';
        }

        if (!formData.product.price) {
            newErrors['product.price'] = 'Vui lòng nhập giá bán';
        } else if (isNaN(formData.product.price) || Number(formData.product.price) <= 0) {
            newErrors['product.price'] = 'Giá bán phải là số dương';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            if (onSave) {
                onSave(formData);
            }
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <Portal>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                <div className="bg-white rounded-[12px] shadow-lg w-[756px] max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-[20px] font-bold text-[#404040]">
                            Thêm nhanh sản phẩm - Mã giá {formData.priceListCode}
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-5 h-5 flex items-center justify-center"
                        >
                            <img src={CloseIcon} alt="Close" className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col gap-4 p-6">
                        {/* Thông tin chung */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[16px] font-semibold text-[#6366F1]">
                                Thông tin chung
                            </h3>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[16px] font-semibold text-[#737373]">
                                            Tên bảng giá
                                        </label>
                                        <div className="bg-[#F3F4F6] p-4 rounded-[8px]">
                                            <span className="text-[16px] text-[#A3A3A3]">
                                                {formData.priceListName}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[360px]">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[16px] font-semibold text-[#737373]">
                                            Mã bảng giá
                                        </label>
                                        <div className="bg-[#F3F4F6] p-4 rounded-[8px]">
                                            <span className="text-[16px] text-[#A3A3A3]">
                                                {formData.priceListCode}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chi tiết giá sản phẩm */}
                        <div className="flex flex-col gap-4 mt-2">
                            <h3 className="text-[16px] font-semibold text-[#6366F1]">
                                Chi tiết giá sản phẩm
                            </h3>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[16px] font-semibold text-[#737373]">
                                            Mã sản phẩm
                                        </label>
                                        <div className={`flex justify-between items-center p-4 rounded-[8px] border ${errors['product.code'] ? 'border-red-500' : 'border-[#E5E5E5]'}`}>
                                            <input
                                                type="text"
                                                name="product.code"
                                                value={formData.product.code}
                                                onChange={handleInputChange}
                                                placeholder="Chọn"
                                                className="w-full outline-none text-[16px] text-[#737373]"
                                            />
                                            <img src={ArrowDownIcon} alt="Arrow Down" className="w-5 h-5" />
                                        </div>
                                        {errors['product.code'] && (
                                            <span className="text-red-500 text-sm">{errors['product.code']}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[16px] font-semibold text-[#737373]">
                                            Tên sản phẩm
                                        </label>
                                        <div className="bg-[#F3F4F6] p-4 rounded-[8px]">
                                            <span className="text-[16px] text-[#A3A3A3]">
                                                {formData.product.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[16px] font-semibold text-[#737373]">
                                            Giá bán (VND)
                                        </label>
                                        <div className={`p-4 rounded-[8px] border ${errors['product.price'] ? 'border-red-500' : 'border-[#E5E5E5]'}`}>
                                            <input
                                                type="text"
                                                name="product.price"
                                                value={formData.product.price}
                                                onChange={handleInputChange}
                                                placeholder="Nhập số"
                                                className="w-full outline-none text-[16px] text-[#737373]"
                                            />
                                        </div>
                                        {errors['product.price'] && (
                                            <span className="text-red-500 text-sm">{errors['product.price']}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[16px] font-semibold text-[#737373]">
                                            Thuế suất đầu vào (%)
                                        </label>
                                        <div className="bg-[#FAFAFA] p-4 rounded-[8px] border border-[#E5E5E5]">
                                            <span className="text-[16px] text-[#737373]">
                                                {formData.product.inputTax}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[16px] font-semibold text-[#737373]">
                                            Thuế suất đầu ra (%)
                                        </label>
                                        <div className="bg-[#FAFAFA] p-4 rounded-[8px] border border-[#E5E5E5]">
                                            <span className="text-[16px] text-[#737373]">
                                                {formData.product.outputTax}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[16px] font-semibold text-[#737373]">
                                    Mô tả
                                </label>
                                <div className="p-4 rounded-[8px] border border-[#E5E5E5]">
                                    <textarea
                                        name="product.description"
                                        value={formData.product.description}
                                        onChange={handleInputChange}
                                        placeholder="Nhập nội dung"
                                        className="w-full outline-none text-[16px] text-[#737373] min-h-[80px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end items-center gap-2 p-6 border-t mt-auto">
                        <button
                            onClick={onClose}
                            className="px-5 py-3 border border-[#E5E5E5] rounded-[8px] text-[14px] font-semibold text-[#6366F1]"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-5 py-3 bg-[#6366F1] rounded-[8px] text-[14px] font-semibold text-white"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Addfast;