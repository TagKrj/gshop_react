import React, { useState, useEffect } from 'react';
import Portal from '../../Portal';
import CloseIcon from '../../../assets/icons/close_icon.svg';
import EditIcon from '../../../assets/icons/edit-2.svg';
import Button from '../../button';
import { useClickOutside, renderCloseButton } from '../../../utils/popupHelpers.jsx';

const DetailListPrice = ({ isOpen, onClose, productData, onSave }) => {
    // Sử dụng trực tiếp dữ liệu từ productData
    const initialData = productData || {};

    const [formData, setFormData] = useState(initialData);

    // Cập nhật formData khi productData thay đổi
    useEffect(() => {
        if (productData) {
            setFormData(productData);
        }
    }, [productData]);

    const handleSave = () => {
        if (onSave) {
            onSave(formData);
        }
        onClose();
    };

    // Sử dụng hook useClickOutside để xử lý click ra ngoài
    const modalRef = useClickOutside(onClose, isOpen);

    if (!isOpen) return null;

    return (
        <Portal>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div ref={modalRef} className="bg-white rounded-[12px] shadow-lg w-[1192px] max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 ">
                        <h2 className="text-[20px] font-bold text-[#404040]">
                            Chi tiết bảng giá - Sản phẩm {formData.code}
                        </h2>
                        {renderCloseButton(onClose)}
                    </div>

                    {/* Body */}
                    <div className="flex px-6 py-4 overflow-y-auto">
                        {/* Thông tin chung */}
                        <div className="w-[326px] flex flex-col gap-4">
                            <h3 className="text-[16px] font-semibold text-[#6366F1]">
                                Thông tin chung
                            </h3>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] text-[#737373]">Mã SKU</label>
                                <div className="text-[16px] text-[#161413]">{formData.code}</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] text-[#737373]">Tên sản phẩm</label>
                                <div className="text-[16px] text-[#161413]">{formData.name}</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] text-[#737373]">Loại sản phẩm</label>
                                <div className="inline-flex w-fit px-3 py-1 rounded-[8px] border border-[#664D7F] text-[14px] text-[#2E319E]">
                                    {formData.category}
                                </div>
                            </div>

                            <div className="flex justify-between gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                    <label className="text-[13px] text-[#737373]">Thuế suất đầu vào (%)</label>
                                    <div className="text-[16px] text-[#2E319E]">{formData.inputTax}</div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <label className="text-[13px] text-[#737373]">Thuế suất đầu ra (%)</label>
                                    <div className="text-[16px] text-[#2E319E]">{formData.outputTax}</div>
                                </div>
                            </div>

                            <div className="flex justify-between gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                    <label className="text-[13px] text-[#737373]">Đơn vị tính</label>
                                    <div className="text-[16px] text-[#161413]">{formData.unit}</div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <label className="text-[13px] text-[#737373]">Đơn vị/thùng</label>
                                    <div className="text-[16px] text-[#2E319E]">{formData.unitsPerBox}</div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] text-[#737373]">Cập nhật lần cuối</label>
                                <div className="flex justify-between items-center py-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-[12px] bg-gray-200">
                                            <img src={formData.imgAvatar} alt="Avatar" className="w-full h-full object-cover rounded-[12px]" />
                                        </div>
                                        <span className="text-[13px] font-semibold text-[#2A87F8]">{formData.lastUpdated?.by}</span>
                                    </div>
                                    <div className="text-[13px] text-[#737373]">{formData.lastUpdated?.date}</div>
                                </div>
                            </div>
                        </div>

                        {/* Giá sản phẩm */}
                        <div className="flex-1 ml-6 flex flex-col gap-4">
                            <h3 className="text-[16px] font-semibold text-[#6366F1]">
                                Giá sản phẩm
                            </h3>

                            <div className=" rounded-[8px] overflow-hidden">
                                {/* Header */}
                                <div className="flex bg-[#F3F4F6]">
                                    <div className="w-[120px] px-4 py-3 text-[13px] text-[#737373]">Mã bảng giá</div>
                                    <div className="flex-1 px-4 py-3 text-[13px] text-[#737373]">Tên bảng giá</div>
                                    <div className="w-[166px] px-4 py-3 text-right text-[13px] text-[#737373]">Giá bán (VND)</div>
                                </div>

                                {/* List */}
                                <div>
                                    {formData.pricingList?.length > 0 ? (
                                        formData.pricingList.map((price, index) => (
                                            <div key={index} className="flex bg-[#FAFAFA]">
                                                <div className="w-[120px] h-[44px] px-4 py-3 text-[14px] text-[#161413]">{price.code}</div>
                                                <div className="flex-1 h-[44px] px-4 py-3 text-[14px] text-[#161413]">{price.name}</div>
                                                <div className="w-[166px] h-[44px] px-4 py-3 text-right text-[14px] text-[#2E319E]">
                                                    {(price.price || 0).toLocaleString()}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex bg-[#FAFAFA]">
                                            <div className="w-full px-4 py-3 text-center text-[14px] text-gray-500">
                                                Không có dữ liệu
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end items-center gap-2 px-6 py-4">
                        <Button
                            type="secondary"
                            size="medium"
                            onClick={onClose}
                        >
                            Đóng
                        </Button>
                        <Button
                            type="primary"
                            size="medium"
                            onClick={handleSave}
                            icon={<img src={EditIcon} alt="Edit" className="w-5 h-5" />}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default DetailListPrice;
