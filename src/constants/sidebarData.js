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
import Avatar from '../assets/imgs/3d_avatar_30.png';

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
            hasSubmenu: true,
            isActive: false,
            isExpanded: false,
            children: [
                {
                    id: 'product-suppliers',
                    title: 'Nhà cung cấp',
                    icon: null,
                    path: '/products/suppliers',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'product-types',
                    title: 'Loại sản phẩm',
                    icon: null,
                    path: '/products/types',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'product-list',
                    title: 'Danh sách sản phẩm',
                    icon: null,
                    path: '/products/list',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'product-import',
                    title: 'Bảng giá',
                    icon: null,
                    path: '/products/import',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                }
            ]
        },
        {
            id: 'customer',
            title: 'Quản lý khách hàng',
            icon: UserIcon,
            path: '/customers',
            hasSubmenu: true,
            isActive: false,
            isExpanded: false,
            children: [
                {
                    id: 'customer-group',
                    title: 'Nhóm khách hàng',
                    icon: null,
                    path: '/customers/group',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'customer-list',
                    title: 'Danh sách khách hàng',
                    icon: null,
                    path: '/customers/list',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                }
            ]
        },
        {
            id: 'inventory',
            title: 'Quản lý kho',
            icon: BoxIcon,
            path: '/inventory',
            hasSubmenu: true,
            isActive: false,
            isExpanded: false,
            children: [
                {
                    id: 'inventory-category',
                    title: 'Danh mục kho',
                    icon: null,
                    path: '/inventory/category',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'inventory-list',
                    title: 'Phiếu nhập kho',
                    icon: null,
                    path: '/inventory/list',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'inventory-transfer',
                    title: 'Phiếu điều chuyển',
                    icon: null,
                    path: '/inventory/transfer',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'inventory-export',
                    title: 'Phiếu xuất kho',
                    icon: null,
                    path: '/inventory/export',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'inventory-check',
                    title: 'Phiếu kiểm kho',
                    icon: null,
                    path: '/inventory/check',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'inventory-card',
                    title: 'Thẻ kho',
                    icon: null,
                    path: '/inventory/card',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'inventory-report',
                    title: 'Báo cáo tồn kho',
                    icon: null,
                    path: '/inventory/report',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                }
            ]
        },
        {
            id: 'order',
            title: 'Quản lý đơn hàng',
            icon: ReceiptIcon,
            path: '/orders',
            hasSubmenu: true,
            isActive: false,
            isExpanded: false,
            children: [
                {
                    id: 'order-list',
                    title: 'Danh sách đơn hàng',
                    icon: null,
                    path: '/orders/list',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                },
                {
                    id: 'order-report',
                    title: 'Báo cáo',
                    icon: null,
                    path: '/orders/report',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
                    children: null
                }
            ]
        },
        {
            id: 'finance',
            title: 'Quản lý tài chính',
            icon: DollarIcon,
            path: '/finance',
            hasSubmenu: true,
            isActive: false,
            isExpanded: false,
            children: [
                {
                    id: 'finance-types',
                    title: 'Loại phiếu thu, chi',
                    icon: null,
                    path: '/finance/types',
                    hasSubmenu: false,
                    isActive: false,
                    isSelected: false,
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
                    id: 'settings-SPlater',
                    title: 'Quy định SP bán chậm',
                    icon: null,
                    path: '/settings/SPlater',
                    hasSubmenu: false,
                    isActive: false,
                    children: null
                },
                {
                    id: 'settings-warnings',
                    title: 'Cảnh báo kho',
                    icon: null,
                    path: '/settings/warnings',
                    hasSubmenu: false,
                    isActive: false,
                    children: null
                },
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
        avatar: Avatar, // Avatar image placeholder
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

export default sidebarMenuData;
