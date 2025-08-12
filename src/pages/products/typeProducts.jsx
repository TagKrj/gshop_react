import React, { useState, useRef, useEffect } from 'react';
import Main from '../../layouts/Main';
import InputSearch from '../../components/InpurtSearch';
import ButtonFilter from '../../components/ButtonFilter';
import ButtonAdd from '../../components/ButtonAdd';
import TableHeader from '../../components/products/typeProducts/TableHeader';
import TypeProductsTableRow from '../../components/products/typeProducts/TypeProductsTableRow';
import AddEditTypeProducts from '../../components/products/typeProducts/AddEditTypeProducts';
import FilterSupplier from '../../components/products/supplier/FilterSupplier';
import ListFilterSupplier from '../../components/products/supplier/ListFilterSupplier';
import Portal from '../../components/Portal';
import { mockTypeProductsData } from '../../constants/typeProductsData';
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

const TypeProducts = () => {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAddSupplier, setShowAddSupplier] = useState(false);
    const [showAddEditTypeProducts, setShowAddEditTypeProducts] = useState(false);
    const [showSupplierList, setShowSupplierList] = useState(false);
    const [supplierFilter, setSupplierFilter] = useState('');
    const [listPosition, setListPosition] = useState({ top: 0, left: 0 });
    const filterButtonRef = useRef(null);

    const handleFilterClickLocal = () => {
        handleFilterClick(isFilterActive, setIsFilterActive);
    };

    const handleSearchChangeLocal = (e) => {
        handleSearchChange(e, setSearchValue);
    };

    const handleAddClick = () => {
        setShowAddEditTypeProducts(true);
    };

    const handleRowSelectLocal = (id) => {
        handleRowSelect(id, selectedRows, setSelectedRows);
    };

    const handleToggleActiveLocal = (id, isActive) => {
        handleToggleActive(id, isActive);
    };

    const handleAddTypeProduct = async (formData) => {
        console.log('Adding new type product:', formData);
        // Ở đây bạn sẽ thêm logic để gửi dữ liệu lên server
        // Giả lập xử lý bất đồng bộ
        return new Promise((resolve) => {
            setTimeout(() => {
                // Nếu thành công
                resolve();
                // Nếu có lỗi
                // throw new Error('Thông tin loại sản phẩm đã tồn tại!');
            }, 500);
        });
    };

    const handleEditRowLocal = (id) => {
        handleEditRow(id);
    };

    const handleDeleteRowLocal = (id) => {
        handleDeleteRow(id);
    };

    const handleSelectAllLocal = () => {
        handleSelectAll(mockTypeProductsData, selectedRows, setSelectedRows);
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
    const allSelected = selectedRows.length === mockTypeProductsData.length && mockTypeProductsData.length > 0;
    const someSelected = selectedRows.length > 0 && selectedRows.length < mockTypeProductsData.length;

    // Handlers for DeleteBox
    const handleDeleteSelectedLocal = () => {
        handleDeleteSelected(selectedRows, setSelectedRows);
    };

    const handleDeselectAllLocal = () => {
        handleDeselectAll(setSelectedRows);
    };

    return (
        <Main
            title="Loại sản phẩm"
            breadcrumb={['Quản lý sản phẩm', 'Loại sản phẩm']}
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
                    {mockTypeProductsData.map((item, index) => (
                        <TypeProductsTableRow
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

            {/* Add/Edit Type Products Modal */}
            <AddEditTypeProducts
                isOpen={showAddEditTypeProducts}
                onClose={() => setShowAddEditTypeProducts(false)}
                onSubmit={handleAddTypeProduct}
            />
        </Main>
    );
};

export default TypeProducts;
