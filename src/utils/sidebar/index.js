// Export all sidebar helper functions
export {
    renderMenuRecursive,
    findMenuItemById,
    updateMenuState,
    getAllMenuPaths,
    getMenuItemsByLevel,
    hasActiveChild,
    toggleAllSubmenus,
    resetActiveStates,
    setActiveByPath,
    getMenuItemStyle,
    getIconFilter,
    toggleMenuExclusive,
    closeAllSubmenus,
    initializeMenuState
} from './menuHelpers';

// Export default for easy importing
export * from './menuHelpers';
