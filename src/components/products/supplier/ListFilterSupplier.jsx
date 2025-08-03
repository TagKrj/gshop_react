import React, { useState, useRef, useEffect } from 'react';
import searchIcon from '../../../assets/icons/search-normal.svg';
import { supplierFilterData } from '../../../constants/supplierData';

const ListFilterSupplier = ({ isOpen, onClose, onSelect, position }) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const listRef = useRef(null);

    // Lọc danh sách nhà cung cấp theo từ khóa tìm kiếm
    const filteredSuppliers = supplierFilterData.filter(supplier =>
        supplier.name.toLowerCase().includes(searchValue.toLowerCase())
    ); useEffect(() => {
        const handleClickOutside = (event) => {
            if (listRef.current && !listRef.current.contains(event.target)) {
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

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleCheckboxChange = (id) => {
        if (id === 'all') {
            // Nếu "Tất cả" được chọn, bỏ chọn tất cả các item khác
            if (selectedItems.includes('all')) {
                setSelectedItems([]);
            } else {
                setSelectedItems(['all']);
            }
        } else {
            // Nếu item khác được chọn, bỏ chọn "Tất cả"
            const newSelectedItems = [...selectedItems];
            const index = newSelectedItems.indexOf(id);

            if (index > -1) {
                newSelectedItems.splice(index, 1);
            } else {
                newSelectedItems.push(id);
                // Bỏ chọn "Tất cả" nếu có
                const allIndex = newSelectedItems.indexOf('all');
                if (allIndex > -1) {
                    newSelectedItems.splice(allIndex, 1);
                }
            }

            setSelectedItems(newSelectedItems);
        }
    };

    const handleApply = () => {
        const selectedSuppliers = supplierFilterData.filter(supplier =>
            selectedItems.includes(supplier.id)
        );
        onSelect(selectedSuppliers);
        onClose();
    };

    return (
        <div
            ref={listRef}
            className="bg-white rounded-[12px] shadow-xl w-[290px] flex flex-col absolute z-50"
            style={{
                top: position?.top || 0,
                left: position?.left || 0
            }}
        >
            {/* Search section */}
            <div className="p-[8px_12px]">
                <div className="flex items-center justify-between w-full border border-[#E5E5E5] rounded-[8px] px-4 py-3">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm"
                        className="text-[#737373] text-sm outline-none w-full"
                    />
                    <img src={searchIcon} alt="Search" className="w-4 h-4" />
                </div>
            </div>

            {/* List section */}
            <div className="flex justify-between w-full max-h-[200px] overflow-y-auto rounded-b-[12px] ">
                <div className="w-full">
                    {filteredSuppliers.map((supplier) => (
                        <div
                            key={supplier.id}
                            className={`flex items-center gap-2.5 p-3 w-full ${supplier.id === 'all' ? 'bg-[#FAFAFA]' : 'bg-white'
                                } hover:bg-[#F8F8F8] cursor-pointer`}
                            onClick={() => handleCheckboxChange(supplier.id)}
                        >
                            <div className="relative w-4 h-4 flex-shrink-0">
                                <input
                                    type="checkbox"
                                    id={`checkbox-${supplier.id}`}
                                    checked={selectedItems.includes(supplier.id)}
                                    onChange={() => { }}
                                    className="absolute opacity-0 w-4 h-4 cursor-pointer"
                                />
                                <label
                                    htmlFor={`checkbox-${supplier.id}`}
                                    className={`w-4 h-4 border rounded flex items-center justify-center cursor-pointer ${selectedItems.includes(supplier.id)
                                        ? 'bg-indigo-600 border-indigo-600'
                                        : 'bg-white border-[#F5F5F5]'
                                        }`}
                                >
                                    {selectedItems.includes(supplier.id) && (
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </label>
                            </div>
                            <span className={`text-sm ${supplier.id === 'all'
                                ? 'text-[#6366F1] font-medium'
                                : 'text-[#161413]'
                                }`}>
                                {supplier.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ListFilterSupplier;
