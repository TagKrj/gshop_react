/**
 * Các hàm tiện ích được sử dụng lại trong các màn hình
 */

// Xử lý chọn/bỏ chọn một hàng
export const handleRowSelect = (id, selectedRows, setSelectedRows) => {
    setSelectedRows(prev =>
        prev.includes(id)
            ? prev.filter(rowId => rowId !== id)
            : [...prev, id]
    );
};

// Xử lý chọn/bỏ chọn tất cả các hàng
export const handleSelectAll = (data, selectedRows, setSelectedRows) => {
    if (selectedRows.length === data.length) {
        // Nếu đã chọn tất cả, bỏ chọn tất cả
        setSelectedRows([]);
    } else {
        // Chọn tất cả
        setSelectedRows(data.map(item => item.id));
    }
};

// Xử lý xóa các hàng đã chọn
export const handleDeleteSelected = (selectedRows, setSelectedRows) => {
    console.log('Deleting selected rows:', selectedRows);
    // Thêm logic xóa ở đây
    setSelectedRows([]);
};

// Xử lý bỏ chọn tất cả
export const handleDeselectAll = (setSelectedRows) => {
    setSelectedRows([]);
};

// Xử lý bật/tắt filter
export const handleFilterClick = (isFilterActive, setIsFilterActive) => {
    setIsFilterActive(!isFilterActive);
};

// Xử lý thay đổi giá trị tìm kiếm
export const handleSearchChange = (e, setSearchValue) => {
    setSearchValue(e.target.value);
    console.log('Search value:', e.target.value);
};

// Xử lý click vào supplier trong filter
export const handleSupplierClick = (event, setListPosition, showSupplierList, setShowSupplierList) => {
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

// Xử lý chọn supplier
export const handleSupplierSelect = (selectedSuppliers, setSupplierFilter, setShowSupplierList) => {
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

// Xử lý áp dụng filter
export const handleApplyFilter = (filterData, setSupplierFilter) => {
    console.log('Filter applied:', filterData);
    // Thêm logic để áp dụng bộ lọc vào dữ liệu
    if (filterData.supplier) {
        setSupplierFilter(filterData.supplier);
    }
};

// Xử lý bật/tắt trạng thái active của hàng
export const handleToggleActive = (id, isActive) => {
    console.log(`Toggle row ${id} to ${isActive ? 'active' : 'inactive'}`);
};

// Xử lý chỉnh sửa hàng
export const handleEditRow = (id) => {
    console.log(`Edit row ${id}`);
    // Thêm logic chỉnh sửa
};

// Xử lý xóa hàng
export const handleDeleteRow = (id) => {
    console.log(`Delete row ${id}`);
    // Thêm logic xóa
};
