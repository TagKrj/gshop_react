import React, { useState } from 'react';
import { sidebarMenuData, renderMenuRecursive, findMenuItemById, updateMenuState } from '../constants/sidebarData';

const Sidebar = () => {
    const [menuData, setMenuData] = useState(sidebarMenuData);

    const toggleMenu = (menuKey) => {
        // Update main menu
        const updatedMainMenu = updateMenuState(
            menuData.mainMenu,
            menuKey,
            { isExpanded: !findMenuItemById(menuData.mainMenu, menuKey)?.isExpanded }
        );

        // Update bottom menu
        const updatedBottomMenu = updateMenuState(
            menuData.bottomMenu,
            menuKey,
            { isExpanded: !findMenuItemById(menuData.bottomMenu, menuKey)?.isExpanded }
        );

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
                    className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors
            ${level > 0 ? 'ml-6' : ''}
            ${item.isActive
                            ? 'bg-primary/10 text-primary'
                            : item.isSelected
                                ? 'bg-primary text-white'
                                : 'hover:bg-gray-100 text-gray-700'
                        }
            ${item.isLogout ? 'hover:bg-red-50 text-red-500' : ''}
          `}
                    onClick={() => item.hasSubmenu && toggleMenu(item.id)}
                >
                    <div className="flex items-center gap-3">
                        {IconComponent && (
                            <div className={`w-5 h-5 ${item.isActive ? 'text-primary' :
                                    item.isSelected ? 'text-white' :
                                        item.isLogout ? 'text-red-500' : 'text-gray-600'
                                }`}>
                                <img src={IconComponent} alt={item.title} className="w-full h-full" />
                            </div>
                        )}
                        <span className={`text-sm ${level > 0 ? 'font-normal' : 'font-semibold'}`}>
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
                            <div className={`w-5 h-5 ${item.isActive ? 'text-primary' :
                                    item.isLogout ? 'text-red-500' : 'text-gray-600'
                                }`}>
                                <img
                                    src={item.isExpanded ? ArrowUpIcon : ArrowDownIcon}
                                    alt="arrow"
                                    className="w-full h-full"
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
        <div className="bg-white w-64 h-screen flex flex-col justify-between p-6 shadow-lg rounded-xl">
            {/* Top Section */}
            <div className="flex flex-col gap-4">
                {/* Logo */}
                <div className="flex items-center gap-3 p-2">
                    <div className="w-8 h-8 bg-primary rounded-md"></div>
                    <span className="text-xl font-bold text-gray-900">{menuData.logo.title}</span>
                </div>

                {/* Main Menu */}
                <div className="flex flex-col gap-2">
                    {menuData.mainMenu.map(item => renderMenuItem(item))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-2">
                {/* Divider */}
                <hr className="border-gray-200 mb-2" />

                {/* Bottom Menu Items */}
                <div className="flex flex-col gap-2">
                    {menuData.bottomMenu.map(item => renderMenuItem(item))}
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-2 p-3 mt-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                            {menuData.userProfile.fullName.split(' ').map(name => name[0]).join('')}
                        </span>
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-sm font-semibold text-gray-900">{menuData.userProfile.fullName}</span>
                        <span className="text-xs text-gray-500">{menuData.userProfile.username}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
