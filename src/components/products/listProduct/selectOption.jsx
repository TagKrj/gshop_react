import React, { useState, useRef, useEffect } from 'react';
import searchIcon from '../../../assets/icons/search-normal.svg';

const SelectOption = ({
    options = [],
    onSelect,
    placeholder = "Nhập từ khóa",
    selectedOption = null,
    width = "314px"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        // Filter options based on search term
        const filtered = options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [searchTerm, options]);

    useEffect(() => {
        // Handle click outside to close dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    const handleOptionClick = (option) => {
        onSelect(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div
            ref={dropdownRef}
            className="relative"
            style={{ width: width }}
        >
            {/* Search input */}
            <div
                className="flex items-center justify-between border border-[#E5E5E5] rounded-[8px] px-4 py-3 h-[50px] cursor-pointer"
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen) {
                        inputRef.current.focus();
                    }
                }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={selectedOption ? selectedOption.label : placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleInputFocus}
                    className="w-full outline-none text-sm text-[#737373] bg-transparent"
                />
                <img src={searchIcon} alt="Search" className="w-4 h-4" />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-[12px] shadow-lg z-10 max-h-[200px] overflow-y-auto">
                    <div className="flex flex-col">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={option.value}
                                    className={`px-4 py-3 cursor-pointer hover:bg-[#FAFAFA] ${selectedOption && selectedOption.value === option.value ? 'bg-[#FAFAFA] text-[#6366F1]' : 'text-[#161413]'
                                        }`}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    <span className="text-base font-normal">{option.label}</span>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-[#737373]">Không tìm thấy kết quả</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectOption;
