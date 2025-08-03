import React, { useState, useRef, useEffect } from 'react';
import Main from '../../layouts/Main';
import InputSearch from '../../components/inpurtSearch';
import ButtonFilter from '../../components/buttonFilter';
import ButtonAdd from '../../components/buttonAdd';
import TableHeader from '../../components/products/supplier/TableHeader';
import SupplierTableRow from '../../components/products/supplier/SupplierTableRow';
import AddSupplier from '../../components/products/supplier/AddSupplier';
import FilterSupplier from '../../components/products/supplier/FilterSupplier';
import ListFilterSupplier from '../../components/products/supplier/ListFilterSupplier';
import Portal from '../../components/Portal';
import { mockSupplierData } from '../../constants/supplierData';

const Supplier = () => {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAddSupplier, setShowAddSupplier] = useState(false);
    const [showSupplierList, setShowSupplierList] = useState(false);
    const [supplierFilter, setSupplierFilter] = useState('');
    const [listPosition, setListPosition] = useState({ top: 0, left: 0 });
    const filterButtonRef = useRef(null);
    const supplierInputRef = useRef(null);

    const handleFilterClick = () => {
        setIsFilterActive(!isFilterActive);
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

    const handleApplyFilter = (filterData) => {
        console.log('Filter applied:', filterData);
        // Thêm logic để áp dụng bộ lọc vào dữ liệu
        if (filterData.supplier) {
            setSupplierFilter(filterData.supplier);
        }
    };

    const handleSupplierClick = (event) => {
        // Lấy vị trí của filter box
        if (event && event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            setListPosition({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX - 300 // Dịch sang trái 300px
            });
        }
        setShowSupplierList(!showSupplierList);
    };

    const handleSupplierSelect = (selectedSuppliers) => {
        // Lấy tên nhà cung cấp từ danh sách đã chọn
        const supplierNames = selectedSuppliers.map(supplier => supplier.name);

        // Nếu chọn "Tất cả", hiển thị "Tất cả"
        // Nếu không, nối các tên nhà cung cấp đã chọn
        const displayName = selectedSuppliers.some(s => s.id === 'all')
            ? 'Tất cả'
            : supplierNames.join(', ');

        setSupplierFilter(displayName || '');
        setShowSupplierList(false);
    };

    // Kiểm tra trạng thái select all
    const allSelected = selectedRows.length === mockSupplierData.length && mockSupplierData.length > 0;
    const someSelected = selectedRows.length > 0 && selectedRows.length < mockSupplierData.length;

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
            title="Nhà cung cấp"
            breadcrumb={['Quản lý sản phẩm', 'Nhà cung cấp']}
            selectedItems={selectedRows}
            onDeleteSelected={handleDeleteSelected}
            onDeselectAll={handleDeselectAll}
        >
            <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex items-center gap-2 relative">
                    <InputSearch
                        placeholder="Tìm kiếm"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    <div ref={filterButtonRef}>
                        <ButtonFilter
                            isActive={isFilterActive}
                            onClick={handleFilterClick}
                        />
                    </div>

                    {isFilterActive && (
                        <div className="absolute right-0 top-12 z-50 shadow-lg">
                            <FilterSupplier
                                isOpen={isFilterActive}
                                onClose={() => setIsFilterActive(false)}
                                onApplyFilter={handleApplyFilter}
                                supplierFilter={supplierFilter}
                                onSupplierClick={handleSupplierClick}
                                showSupplierList={showSupplierList}
                            />
                        </div>
                    )}

                    {/* ListFilterSupplier trong Portal để đưa ra ngoài DOM */}
                    {showSupplierList && isFilterActive && (
                        <Portal>
                            <div
                                className="fixed z-[9999]"
                                style={{
                                    top: `${listPosition.top}px`,
                                    left: `${listPosition.left}px`
                                }}
                            >
                                <ListFilterSupplier
                                    isOpen={showSupplierList}
                                    onClose={() => setShowSupplierList(false)}
                                    onSelect={handleSupplierSelect}
                                    position={{
                                        top: 0,
                                        left: 0
                                    }}
                                />
                            </div>
                        </Portal>
                    )}
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
