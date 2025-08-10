import React, { useState, useRef, useEffect } from 'react';
import Main from '../../layouts/Main';
import InputSearch from '../../components/inpurtSearch';
import ButtonFilter from '../../components/buttonFilter';
import ButtonAdd from '../../components/buttonAdd';
import TableHeader from '../../components/products/listProduct/TableHeader';
import ListProductTableRow from '../../components/products/listProduct/ListProductTableRow';
import AddPrice from '../../components/products/priceList/AddPrice';
import AddListProduct from '../../components/products/listProduct/AddListProduct';
import FilterSupplier from '../../components/products/supplier/FilterSupplier';
import ListFilterSupplier from '../../components/products/supplier/ListFilterSupplier';
import Portal from '../../components/Portal';
import { mockListProductData } from '../../constants/listProductData';
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

const ListProduct = () => {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAddPrice, setShowAddPrice] = useState(false);
    const [showAddListProduct, setShowAddListProduct] = useState(false);
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
        setShowAddListProduct(true);
    };

    const handleRowSelectLocal = (id) => {
        handleRowSelect(id, selectedRows, setSelectedRows);
    };

    const handleToggleActiveLocal = (id, isActive) => {
        handleToggleActive(id, isActive);
    };

    const handleAddPrice = async (formData) => {
        console.log('Adding new price list:', formData);
        // Xử lý thêm mới bảng giá
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
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
        handleSelectAll(mockListProductData, selectedRows, setSelectedRows);
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
    const allSelected = selectedRows.length === mockListProductData.length && mockListProductData.length > 0;
    const someSelected = selectedRows.length > 0 && selectedRows.length < mockListProductData.length;

    // Handlers for DeleteBox
    const handleDeleteSelectedLocal = () => {
        handleDeleteSelected(selectedRows, setSelectedRows);
    };

    const handleDeselectAllLocal = () => {
        handleDeselectAll(setSelectedRows);
    };

    return (
        <Main
            title="Danh sách sản phẩm"
            breadcrumb={['Quản lý sản phẩm', 'Danh sách sản phẩm']}
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
                    {mockListProductData.map((item) => (
                        <ListProductTableRow
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

            {/* Add Price Modal */}
            <AddPrice
                isOpen={showAddPrice}
                onClose={() => setShowAddPrice(false)}
                onSubmit={handleAddPrice}
            />

            {/* Add List Product Modal */}
            <AddListProduct
                isOpen={showAddListProduct}
                onClose={() => setShowAddListProduct(false)}
            />
        </Main>
    );
};

export default ListProduct;