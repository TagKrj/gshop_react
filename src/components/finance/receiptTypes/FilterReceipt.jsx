import React, { useState, useRef, useEffect } from 'react';
import arrowDownIcon from '../../../assets/icons/arrow-down.svg';
import Button from '../../Common/Button';
import TimeFilterChips from '../../Common/TimeFilterChips';
import DateRangePickers from '../../Common/DateRangePickers';

const FilterSupplier = ({ isOpen, onClose, onApplyFilter }) => {
    const [filterData, setFilterData] = useState({
        receiptType: '',
        accountingResult: '',
        creator: '',
        timeFilter: '1 tháng',
        startDate: '',
        endDate: ''
    });
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleTimeFilterChange = (timeFilter) => {
        setFilterData({
            ...filterData,
            timeFilter
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterData({
            ...filterData,
            [name]: value
        });
    };

    const handleDateChange = (name, value) => {
        setFilterData({
            ...filterData,
            [name]: value
        });
    };

    const handleReset = () => {
        setFilterData({
            receiptType: '',
            accountingResult: '',
            creator: '',
            timeFilter: '1 tháng',
            startDate: '',
            endDate: ''
        });
    };

    const handleApply = () => {
        onApplyFilter(filterData);
        onClose();
    };

    const renderDropdown = (label, name, value, placeholder = "Chọn") => (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-semibold text-[#737373]">{label}</label>
            <div className="flex justify-between items-center w-full border border-[#E5E5E5] rounded-[8px] p-4">
                <span className="text-[#737373] text-base">{placeholder}</span>
                <img src={arrowDownIcon} alt="arrow down" className="w-5 h-5" />
            </div>
        </div>
    );

    return (
        <div
            ref={modalRef}
            className="bg-white rounded-[12px] shadow-xl w-[480px] max-h-[90vh] flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between py-3 px-5">
                <h2 className="text-xl font-bold text-[#6366F1]">Bộ lọc</h2>
                <button
                    onClick={onClose}
                    className="w-5 h-5 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer"
                >
                    <div className="w-5 h-5 flex items-center justify-center relative">
                        <span className="absolute w-3 h-0.5 bg-gray-500 rotate-45"></span>
                        <span className="absolute w-3 h-0.5 bg-gray-500 -rotate-45"></span>
                    </div>
                </button>
            </div>

            {/* Body */}
            <div className="flex flex-col px-5 py-3 gap-6 overflow-y-auto">
                {/* Category Filters */}
                <div className="flex flex-col gap-3">
                    <p className="text-xs text-[#929BA2]">Lọc theo danh mục</p>

                    {renderDropdown("Loại phiếu thu", "receiptType", filterData.receiptType)}
                    {renderDropdown("Hoạch toán kết quả kinh doanh", "accountingResult", filterData.accountingResult)}
                    {renderDropdown("Người tạo", "creator", filterData.creator)}
                </div>

                {/* Time Filters */}
                <div className="flex flex-col gap-2">
                    <p className="text-xs text-[#929BA2]">Lọc theo thời gian tạo</p>

                    {/* Time filter chips */}
                    <TimeFilterChips
                        selectedFilter={filterData.timeFilter}
                        onFilterChange={handleTimeFilterChange}
                    />

                    {/* Date pickers */}
                    <DateRangePickers
                        startDate={filterData.startDate}
                        endDate={filterData.endDate}
                        onChange={handleDateChange}
                    />
                </div>
            </div>

            {/* Footer with action buttons */}
            <div className="flex justify-end gap-2 p-4 border-t border-gray-100">
                <Button
                    type="secondary"
                    onClick={handleReset}
                >
                    Mặc định
                </Button>
                <Button
                    type="primary"
                    onClick={handleApply}
                >
                    Xác nhận
                </Button>
            </div>
        </div>
    );
};

export default FilterSupplier;
