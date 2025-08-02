import React, { useState } from 'react';
import { sidebarMenuData } from '../constants/sidebarData';
import { findMenuItemById, updateMenuState, getMenuItemStyle, getIconFilter, toggleMenuExclusive, initializeMenuState, closeAllSubmenus } from '../utils/sidebar';

const Sidebar = () => {
    // Khởi tạo state với tất cả menu đóng
    const [menuData, setMenuData] = useState({
        ...sidebarMenuData,
        mainMenu: initializeMenuState(sidebarMenuData.mainMenu),
        bottomMenu: initializeMenuState(sidebarMenuData.bottomMenu)
    });

    const toggleMenu = (menuKey) => {
        // Tìm xem menu nằm ở main hay bottom
        const isInMainMenu = findMenuItemById(menuData.mainMenu, menuKey);
        const isInBottomMenu = findMenuItemById(menuData.bottomMenu, menuKey);

        let updatedMainMenu = menuData.mainMenu;
        let updatedBottomMenu = menuData.bottomMenu;

        if (isInMainMenu) {
            // Nếu menu ở main, toggle nó và đóng các menu khác trong main + đóng tất cả bottom menu
            updatedMainMenu = toggleMenuExclusive(menuData.mainMenu, menuKey);
            updatedBottomMenu = closeAllSubmenus(menuData.bottomMenu);
        } else if (isInBottomMenu) {
            // Nếu menu ở bottom, toggle nó và đóng các menu khác trong bottom + đóng tất cả main menu
            updatedBottomMenu = toggleMenuExclusive(menuData.bottomMenu, menuKey);
            updatedMainMenu = closeAllSubmenus(menuData.mainMenu);
        }

        setMenuData(prev => ({
            ...prev,
            mainMenu: updatedMainMenu,
            bottomMenu: updatedBottomMenu
        }));
    };

    // Recursive menu renderer
    const renderMenuItem = (item, level = 0) => {
        const IconComponent = item.icon;
        const ArrowUpIcon = menuData.uiIcons.arrowUp;
        const ArrowDownIcon = menuData.uiIcons.arrowDown;

        return (
            <div key={item.id} className="flex flex-col gap-2 w-full">
                {/* Main Menu Item */}
                <div
                    className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors
            ${level > 0 ? 'ml-4 rounded-lg' : 'rounded-lg'}
            ${item.isActive
                            ? 'text-white'
                            : item.isSelected
                                ? 'text-white'
                                : 'hover:bg-gray-100'
                        }
            ${item.isLogout ? 'hover:bg-red-50 text-red-500' : ''}
          `}
                    style={{
                        ...getMenuItemStyle(item),
                        borderRadius: level > 0 ? '8px' : '8px'
                    }}
                    onClick={() => item.hasSubmenu && toggleMenu(item.id)}
                >
                    <div className="flex items-center gap-3">
                        {IconComponent && (
                            <div className="w-5 h-5">
                                <img
                                    src={IconComponent}
                                    alt={item.title}
                                    className="w-full h-full"
                                    style={{
                                        filter: getIconFilter(item)
                                    }}
                                />
                            </div>
                        )}
                        <span
                            className={`text-sm ${level > 0 ? 'font-normal' : 'font-semibold'}`}
                            style={{
                                fontFamily: 'Open Sans',
                                color: 'inherit'
                            }}
                        >
                            {item.title}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {item.badge && (
                            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                                {item.badge}
                            </span>
                        )}

                        {item.hasSubmenu && (
                            <div className="w-5 h-5">
                                <img
                                    src={ArrowDownIcon}
                                    alt="arrow"
                                    className="w-full h-full transition-transform duration-300 ease-in-out"
                                    style={{
                                        filter: getIconFilter(item),
                                        transform: item.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Submenu - Recursive */}
                {item.hasSubmenu && item.isExpanded && item.children && (
                    <div className="flex flex-col gap-1">
                        {item.children.map(subItem => renderMenuItem(subItem, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className="w-64 min-w-64 max-w-64  flex flex-col justify-between p-4 shadow-lg rounded-xl overflow-y-auto"
            style={{ backgroundColor: '#FFFFFF' }}
        >
            {/* Top Section */}
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                {/* Logo */}
                <div className="flex items-center gap-3 p-3 flex-shrink-0">
                    <div className="w-8 h-8 rounded-md" style={{ backgroundColor: '#6366F1' }}></div>
                    <span className="font-bold text-lg sm:text-xl" style={{
                        fontFamily: 'Open Sans',
                        fontWeight: 700,
                        color: '#171717'
                    }}>{menuData.logo.title}</span>
                </div>

                {/* Main Menu */}
                <div className="flex flex-col gap-3">
                    {menuData.mainMenu.map(item => renderMenuItem(item))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-2 flex-shrink-0">
                {/* Divider */}
                <hr className="border-gray-200 mb-2" />

                {/* Bottom Menu Items */}
                <div className="flex flex-col gap-2">
                    {menuData.bottomMenu.map(item => renderMenuItem(item))}
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-2 p-3 mt-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                        {menuData.userProfile.avatar ? (
                            <img
                                src={menuData.userProfile.avatar}
                                alt={menuData.userProfile.fullName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                                }}
                            >
                                <span
                                    className="text-white text-sm font-semibold"
                                    style={{ fontFamily: 'Open Sans' }}
                                >
                                    {menuData.userProfile.fullName.split(' ').map(name => name[0]).join('')}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col flex-1">
                        <span
                            className="text-sm font-semibold"
                            style={{ fontFamily: 'Open Sans', color: '#171717' }}
                        >
                            {menuData.userProfile.fullName}
                        </span>
                        <span
                            className="text-xs"
                            style={{ fontFamily: 'Open Sans', color: '#737373' }}
                        >
                            {menuData.userProfile.username}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
