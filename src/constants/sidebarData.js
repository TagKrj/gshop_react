// Import icons
import GridIcon from '../assets/icons/grid-2.svg';
import UserIcon from '../assets/icons/user-square.svg';
import BoxIcon from '../assets/icons/box.svg';
import ReceiptIcon from '../assets/icons/receipt-item.svg';
import DollarIcon from '../assets/icons/dollar-square.svg';
import NotificationIcon from '../assets/icons/notification.svg';
import SettingIcon from '../assets/icons/setting-2.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import ArrowUpIcon from '../assets/icons/arrow-up.svg';
import ArrowDownIcon from '../assets/icons/arrow-down.svg';

// Sidebar menu structure với đệ quy support
export const sidebarMenuData = {
    logo: {
        icon: null, // Company logo placeholder
        title: "Company S"
    },

    // Main navigation menu
    mainMenu: [
        {
            id: 'product',
            title: 'Quản lý sản phẩm',
            icon: GridIcon,
            path: '/products',
            hasSubmenu: false,
            isActive: false,
            children: null
        },
        {
            id: 'customer',
            title: 'Quản lý khách hàng',
            icon: UserIcon,
            path: '/customers',
            hasSubmenu: false,
            isActive: false,
            children: null
        },
        {
            id: 'inventory',
            title: 'Quản lý kho',
            icon: BoxIcon,
            path: '/inventory',
            hasSubmenu: false,
            isActive: false,
            children: null
        },
        {
            id: 'order',
            title: 'Quản lý đơn hàng',
            icon: ReceiptIcon,
            path: '/orders',
            hasSubmenu: false,
            isActive: false,
            children: null
        },
        {
            id: 'finance',
            title: 'Quản lý tài chính',
            icon: DollarIcon,
            path: '/finance',
            hasSubmenu: true,
            isActive: true,
            isExpanded: true,
            children: [
                {
                    id: 'finance-types',
                    title: 'Loại phiếu thu, chi',
                    icon: null,
                    path: '/finance/types',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: true,
                    children: null
                },
                {
                    id: 'finance-list',
                    title: 'Danh sách phiếu thu, chi',
                    icon: null,
                    path: '/finance/list',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'finance-report',
                    title: 'Báo cáo sổ quỹ',
                    icon: null,
                    path: '/finance/cash-report',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'finance-debt',
                    title: 'Báo cáo công nợ',
                    icon: null,
                    path: '/finance/debt-report',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'finance-profit',
                    title: 'Báo cáo lãi, lỗ',
                    icon: null,
                    path: '/finance/profit-loss',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                }
            ]
        }
    ],

    // Bottom navigation menu
    bottomMenu: [
        {
            id: 'notification',
            title: 'Thông báo',
            icon: NotificationIcon,
            path: '/notifications',
            hasSubmenu: false,
            isActive: false,
            badge: 2,
            children: null
        },
        {
            id: 'settings',
            title: 'Cài đặt hệ thống',
            icon: SettingIcon,
            path: '/settings',
            hasSubmenu: true,
            isActive: false,
            isExpanded: false,
            children: [
                {
                    id: 'settings-general',
                    title: 'Cài đặt chung',
                    icon: null,
                    path: '/settings/general',
                    hasSubmenu: false,
                    isActive: false,
                    children: null
                },
                {
                    id: 'settings-users',
                    title: 'Quản lý người dùng',
                    icon: null,
                    path: '/settings/users',
                    hasSubmenu: false,
                    isActive: false,
                    children: null
                },
                {
                    id: 'settings-permissions',
                    title: 'Phân quyền',
                    icon: null,
                    path: '/settings/permissions',
                    hasSubmenu: false,
                    isActive: false,
                    children: null
                }
            ]
        },
        {
            id: 'logout',
            title: 'Đăng xuất',
            icon: LogoutIcon,
            path: '/logout',
            hasSubmenu: false,
            isActive: false,
            isLogout: true,
            children: null
        }
    ],

    // User profile data
    userProfile: {
        avatar: null, // Avatar image placeholder
        fullName: "Lê Hoàng Anh",
        username: "lehoanganh123",
        role: "Admin"
    },

    // UI Icons
    uiIcons: {
        arrowUp: ArrowUpIcon,
        arrowDown: ArrowDownIcon
    }
};

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

export default sidebarMenuData;
