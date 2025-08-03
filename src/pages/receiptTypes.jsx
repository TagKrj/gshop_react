import React, { useState } from 'react';
import Main from '../layouts/Main';
import InputSearch from '../components/inpurtSearch';
import ButtonFilter from '../components/buttonFilter';
import ButtonAdd from '../components/buttonAdd';
import TableHeader from '../components/receiptTypes/TableHeader';
import TableRow from '../components/receiptTypes/TableRow';
import { mockData } from '../constants/receiptTypesData';

const ReceiptTypes = () => {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    const handleTabChange = (index, tabName) => {
        console.log(`Switched to tab: ${tabName}`);
    };

    const handleFilterClick = () => {
        setIsFilterActive(!isFilterActive);
        console.log('Filter clicked:', !isFilterActive);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        console.log('Search value:', e.target.value);
    };

    const handleAddClick = () => {
        console.log('Add new receipt type clicked');
        // Thêm logic tạo mới loại phiếu thu
    };

    const handleRowSelect = (id) => {
        setSelectedRows(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    const handleToggleActive = (id, isActive) => {
        console.log(`Toggle row ${id} to ${isActive ? 'active' : 'inactive'}`);
    };

    return (
        <Main
            title="Loại phiếu thu, chi"
            breadcrumb={['Quản lý tài chính', 'Loại phiếu thu, chi']}
            headerButtons={['Loại phiếu thu', 'Loại phiếu chi']}
            onTabChange={handleTabChange}
        >
            <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex items-center gap-2">
                    <InputSearch
                        placeholder="Tìm kiếm"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    <ButtonFilter
                        isActive={isFilterActive}
                        onClick={handleFilterClick}
                    />
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <TableHeader />

                    {/* Table Content */}
                    {mockData.map((item, index) => (
                        <TableRow
                            key={item.id}
                            {...item}
                            isSelected={selectedRows.includes(item.id)}
                            onSelect={handleRowSelect}
                            onToggleActive={handleToggleActive}
                        />
                    ))}
                </div>

            </div>

            {/* Floating Add Button */}
            <ButtonAdd onClick={handleAddClick} />
        </Main>
    );
};

export default ReceiptTypes;
