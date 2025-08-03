import React, { useState } from 'react';
import Main from '../../layouts/Main';
import InputSearch from '../../components/inpurtSearch';
import ButtonFilter from '../../components/buttonFilter';
import ButtonAdd from '../../components/buttonAdd';
import TableHeader from '../../components/products/supplier/TableHeader';
import SupplierTableRow from '../../components/products/supplier/SupplierTableRow';
import AddSupplier from '../../components/products/supplier/AddSupplier';
import { mockSupplierData } from '../../constants/supplierData';

const Supplier = () => {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAddSupplier, setShowAddSupplier] = useState(false);

    const handleFilterClick = () => {
        setIsFilterActive(!isFilterActive);
        console.log('Filter clicked:', !isFilterActive);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        console.log('Search value:', e.target.value);
    };

    const handleAddClick = () => {
        setShowAddSupplier(true);
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
        if (selectedRows.length === mockSupplierData.length) {
            // Nếu đã chọn tất cả, bỏ chọn tất cả
            setSelectedRows([]);
        } else {
            // Chọn tất cả
            setSelectedRows(mockSupplierData.map(item => item.id));
        }
    };

    // Kiểm tra trạng thái select all
    const allSelected = selectedRows.length === mockSupplierData.length && mockSupplierData.length > 0;
    const someSelected = selectedRows.length > 0 && selectedRows.length < mockSupplierData.length;

    return (
        <Main
            title="Nhà cung cấp"
            breadcrumb={['Quản lý sản phẩm', 'Nhà cung cấp']}

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
                    {mockSupplierData.map((item, index) => (
                        <SupplierTableRow
                            key={item.id}
                            {...item}
                            isSelected={selectedRows.includes(item.id)}
                            onSelect={handleRowSelect}
                            onEdit={handleEditRow}
                            onDelete={handleDeleteRow}
                        />
                    ))}
                </div>

            </div>

            {/* Floating Add Button */}
            <ButtonAdd onClick={handleAddClick} />

            {/* Add Supplier Modal */}
            <AddSupplier
                isOpen={showAddSupplier}
                onClose={() => setShowAddSupplier(false)}
            />
        </Main>
    );
};

export default Supplier;
