// Helper function để render menu đệ quy
export const renderMenuRecursive = (menuItems, level = 0) => {
    return menuItems.map(item => ({
        ...item,
        level,
        children: item.children ? renderMenuRecursive(item.children, level + 1) : null
    }));
};

// Helper function để tìm menu item theo ID (đệ quy)
export const findMenuItemById = (menuItems, targetId) => {
    for (const item of menuItems) {
        if (item.id === targetId) {
            return item;
        }
        if (item.children) {
            const found = findMenuItemById(item.children, targetId);
            if (found) return found;
        }
    }
    return null;
};

// Helper function để update menu state (đệ quy)
export const updateMenuState = (menuItems, targetId, updates) => {
    return menuItems.map(item => {
        if (item.id === targetId) {
            return { ...item, ...updates };
        }
        if (item.children) {
            return {
                ...item,
                children: updateMenuState(item.children, targetId, updates)
            };
        }
        return item;
    });
};

// Helper function để get all menu paths (đệ quy)
export const getAllMenuPaths = (menuItems, parentPath = '') => {
    let paths = [];

    menuItems.forEach(item => {
        const currentPath = parentPath + item.path;
        paths.push({
            id: item.id,
            title: item.title,
            path: currentPath,
            level: parentPath.split('/').length - 1
        });

        if (item.children) {
            paths = paths.concat(getAllMenuPaths(item.children, currentPath));
        }
    });

    return paths;
};

// Helper function để tìm tất cả menu items ở một level cụ thể
export const getMenuItemsByLevel = (menuItems, targetLevel) => {
    let result = [];

    const traverse = (items, currentLevel = 0) => {
        items.forEach(item => {
            if (currentLevel === targetLevel) {
                result.push(item);
            }
            if (item.children) {
                traverse(item.children, currentLevel + 1);
            }
        });
    };

    traverse(menuItems);
    return result;
};

// Helper function để kiểm tra xem menu có active children không
export const hasActiveChild = (item) => {
    if (!item.children) return false;

    return item.children.some(child =>
        child.isActive || child.isSelected || hasActiveChild(child)
    );
};

// Helper function để toggle tất cả submenu
export const toggleAllSubmenus = (menuItems, expanded = false) => {
    return menuItems.map(item => ({
        ...item,
        isExpanded: item.hasSubmenu ? expanded : item.isExpanded,
        children: item.children ? toggleAllSubmenus(item.children, expanded) : item.children
    }));
};

// Helper function để reset tất cả active states
export const resetActiveStates = (menuItems) => {
    return menuItems.map(item => ({
        ...item,
        isActive: false,
        isSelected: false,
        children: item.children ? resetActiveStates(item.children) : item.children
    }));
};

// Helper function để set active menu by path
export const setActiveByPath = (menuItems, targetPath) => {
    return menuItems.map(item => {
        const isActive = item.path === targetPath;
        const hasActiveChild = item.children ?
            item.children.some(child => setActiveByPath([child], targetPath)[0].isActive || setActiveByPath([child], targetPath)[0].isSelected)
            : false;

        return {
            ...item,
            isActive: isActive,
            isExpanded: hasActiveChild ? true : item.isExpanded,
            children: item.children ? setActiveByPath(item.children, targetPath) : item.children
        };
    });
};

// Helper function để tính toán style cho menu item
export const getMenuItemStyle = (item) => {
    // Priority 1: Active hoặc Selected - background primary, text white
    if (item.isActive || item.isSelected) {
        return {
            backgroundColor: '#6366F1',
            color: '#FFFFFF'
        };
    }

    // Priority 2: Expanded nhưng không active/selected - chỉ text primary, không background
    if (item.isExpanded && !item.isActive && !item.isSelected) {
        return {
            backgroundColor: 'transparent',
            color: '#6366F1'
        };
    }

    // Priority 3: Logout - text red
    if (item.isLogout) {
        return {
            backgroundColor: 'transparent',
            color: '#EF4444'
        };
    }

    // Default: text black
    return {
        backgroundColor: 'transparent',
        color: '#171717'
    };
};

// Helper function để tính toán filter cho icon
export const getIconFilter = (item) => {
    // White icon for active/selected items
    if (item.isActive || item.isSelected) {
        return 'brightness(0) invert(1)';
    }

    // Primary color #6366F1 for expanded items (không active/selected)
    if (item.isExpanded && !item.isActive && !item.isSelected) {
        // Filter đơn giản để tạo màu xanh tím
        return 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(224deg) brightness(95%) contrast(103%)';
    }

    // Special filter for logout - màu đỏ
    if (item.isLogout) {
        return 'invert(38%) sepia(96%) saturate(7404%) hue-rotate(343deg) brightness(97%) contrast(94%)';
    }

    // Default: no filter
    return 'none';
};

// Helper function để toggle menu và đóng các menu khác
export const toggleMenuExclusive = (menuItems, targetId) => {
    return menuItems.map(item => {
        if (item.id === targetId) {
            // Toggle menu được click
            return {
                ...item,
                isExpanded: !item.isExpanded,
                children: item.children ? toggleMenuExclusive(item.children, targetId) : item.children
            };
        } else {
            // Đóng tất cả menu khác
            return {
                ...item,
                isExpanded: false,
                children: item.children ? closeAllSubmenus(item.children) : item.children
            };
        }
    });
};

// Helper function để đóng tất cả submenu
export const closeAllSubmenus = (menuItems) => {
    return menuItems.map(item => ({
        ...item,
        isExpanded: false,
        children: item.children ? closeAllSubmenus(item.children) : item.children
    }));
};

// Helper function để khởi tạo trạng thái menu ban đầu (chỉ reset isActive và isExpanded)
export const initializeMenuState = (menuItems) => {
    return menuItems.map(item => ({
        ...item,
        isActive: false,
        isSelected: item.isSelected || false, // Giữ nguyên isSelected từ dữ liệu gốc
        isExpanded: false,
        children: item.children ? initializeMenuState(item.children) : item.children
    }));
};
