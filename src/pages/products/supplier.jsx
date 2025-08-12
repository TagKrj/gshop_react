import React, { useState, useRef, useEffect } from 'react';
import Main from '../../components/Layout/Main';
import InputSearch from '../../components/Common/InputSearch';
import ButtonFilter from '../../components/Common/ButtonFilter';
import ButtonAdd from '../../components/Common/ButtonAdd';
import TableHeader from '../../components/products/supplier/TableHeader';
import SupplierTableRow from '../../components/products/supplier/SupplierTableRow';
import AddSupplier from '../../components/products/supplier/AddSupplier';
import FilterSupplier from '../../components/products/supplier/FilterSupplier';
import ListFilterSupplier from '../../components/products/supplier/ListFilterSupplier';
import Portal from '../../components/Common/Portal';
import { mockSupplierData } from '../../constants/supplierData';
import {
    handleRowSelect,
    handleSelectAll,
    handleDeleteSelected,
    handleDeselectAll,
    handleFilterClick,
    handleSearchChange,
    handleSupplierClick,
    handleSupplierSelect,
    handleApplyFilter,
    handleToggleActive,
    handleEditRow,
    handleDeleteRow
} from '../../utils/screenHelpers';

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

    const handleFilterClickLocal = () => {
        handleFilterClick(isFilterActive, setIsFilterActive);
    };

    const handleSearchChangeLocal = (e) => {
        handleSearchChange(e, setSearchValue);
    };

    const handleAddClick = () => {
        setShowAddSupplier(true);
    };

    const handleRowSelectLocal = (id) => {
        handleRowSelect(id, selectedRows, setSelectedRows);
    };

    const handleToggleActiveLocal = (id, isActive) => {
        handleToggleActive(id, isActive);
    };

    const handleEditRowLocal = (id) => {
        handleEditRow(id);
    };

    const handleDeleteRowLocal = (id) => {
        handleDeleteRow(id);
    };

    const handleSelectAllLocal = () => {
        handleSelectAll(mockSupplierData, selectedRows, setSelectedRows);
    };

    const handleApplyFilterLocal = (filterData) => {
        handleApplyFilter(filterData, setSupplierFilter);
    };

    const handleSupplierClickLocal = (event) => {
        handleSupplierClick(event, setListPosition, showSupplierList, setShowSupplierList);
    };

    const handleSupplierSelectLocal = (selectedSuppliers) => {
        handleSupplierSelect(selectedSuppliers, setSupplierFilter, setShowSupplierList);
    };

    // Kiểm tra trạng thái select all
    const allSelected = selectedRows.length === mockSupplierData.length && mockSupplierData.length > 0;
    const someSelected = selectedRows.length > 0 && selectedRows.length < mockSupplierData.length;

    // Handlers for DeleteBox
    const handleDeleteSelectedLocal = () => {
        handleDeleteSelected(selectedRows, setSelectedRows);
    };

    const handleDeselectAllLocal = () => {
        handleDeselectAll(setSelectedRows);
    };

    return (
        <Main
            title="Nhà cung cấp"
            breadcrumb={['Quản lý sản phẩm', 'Nhà cung cấp']}
            selectedItems={selectedRows}
            onDeleteSelected={handleDeleteSelectedLocal}
            onDeselectAll={handleDeselectAllLocal}
        >
            <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex items-center gap-2 relative">
                    <InputSearch
                        placeholder="Tìm kiếm"
                        value={searchValue}
                        onChange={handleSearchChangeLocal}
                    />
                    <div ref={filterButtonRef}>
                        <ButtonFilter
                            isActive={isFilterActive}
                            onClick={handleFilterClickLocal}
                        />
                    </div>

                    {isFilterActive && (
                        <div className="absolute right-0 top-12 z-50 shadow-lg">
                            <FilterSupplier
                                isOpen={isFilterActive}
                                onClose={() => setIsFilterActive(false)}
                                onApplyFilter={handleApplyFilterLocal}
                                supplierFilter={supplierFilter}
                                onSupplierClick={handleSupplierClickLocal}
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
                                    onSelect={handleSupplierSelectLocal}
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
                        onSelectAll={handleSelectAllLocal}
                    />

                    {/* Table Content */}
                    {mockSupplierData.map((item, index) => (
                        <SupplierTableRow
                            key={item.id}
                            {...item}
                            isSelected={selectedRows.includes(item.id)}
                            onSelect={handleRowSelectLocal}
                            onEdit={handleEditRowLocal}
                            onDelete={handleDeleteRowLocal}
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
