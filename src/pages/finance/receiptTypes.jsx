import React, { useState } from 'react';
import Main from '../../layouts/Main';
import InputSearch from '../../components/inpurtSearch';
import ButtonFilter from '../../components/buttonFilter';
import ButtonAdd from '../../components/buttonAdd';
import TableHeader from '../../components/finance/receiptTypes/TableHeader';
import TableRow from '../../components/finance/receiptTypes/TableRow';
import { mockData } from '../../constants/receiptTypesData';

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

    const handleEditRow = (id) => {
        console.log(`Edit row ${id}`);
        // Thêm logic chỉnh sửa
    };

    const handleDeleteRow = (id) => {
        console.log(`Delete row ${id}`);
        // Thêm logic xóa
    };

    const handleSelectAll = () => {
        if (selectedRows.length === mockData.length) {
            // Nếu đã chọn tất cả, bỏ chọn tất cả
            setSelectedRows([]);
        } else {
            // Chọn tất cả
            setSelectedRows(mockData.map(item => item.id));
        }
    };

    // Kiểm tra trạng thái select all
    const allSelected = selectedRows.length === mockData.length && mockData.length > 0;
    const someSelected = selectedRows.length > 0 && selectedRows.length < mockData.length;

    // Handlers for DeleteBox
    const handleDeleteSelected = () => {
        console.log('Deleting selected rows:', selectedRows);
        // Add your delete logic here
        setSelectedRows([]);
    };

    const handleDeselectAll = () => {
        setSelectedRows([]);
    };

    return (
        <Main
            title="Loại phiếu thu, chi"
            breadcrumb={['Quản lý tài chính', 'Loại phiếu thu, chi']}
            headerButtons={['Loại phiếu thu', 'Loại phiếu chi']}
            onTabChange={handleTabChange}
            selectedItems={selectedRows}
            onDeleteSelected={handleDeleteSelected}
            onDeselectAll={handleDeselectAll}
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
                    <TableHeader
                        allSelected={allSelected}
                        someSelected={someSelected}
                        onSelectAll={handleSelectAll}
                    />

                    {/* Table Content */}
                    {mockData.map((item, index) => (
                        <TableRow
                            key={item.id}
                            {...item}
                            isSelected={selectedRows.includes(item.id)}
                            onSelect={handleRowSelect}
                            onToggleActive={handleToggleActive}
                            onEdit={handleEditRow}
                            onDelete={handleDeleteRow}
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
