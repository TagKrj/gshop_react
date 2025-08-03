import React, { useState } from 'react';
import FilterAddIcon from '../assets/icons/filter-add.svg';

const ButtonFilter = ({
    isActive = false,
    onClick,
    className = '',
    disabled = false,
    ...props
}) => {
    // Styles dựa trên Figma designs
    const baseStyles = {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease-in-out',
        minWidth: '44px',
        minHeight: '44px',
    };

    // Trạng thái chưa click (node 24:22795)
    const inactiveStyles = {
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E5E5',
    };

    // Trạng thái đã click (node 24:25680)
    const activeStyles = {
        backgroundColor: '#6366F1',
        border: '1px solid #6366F1',
    };

    // Disabled styles
    const disabledStyles = {
        backgroundColor: '#F3F4F6',
        border: '1px solid #E5E7EB',
        cursor: 'not-allowed',
    };

    // Hover styles
    const hoverStyles = {
        inactive: {
            backgroundColor: '#F8F9FF',
            borderColor: '#6366F1',
        },
        active: {
            backgroundColor: '#5555E8',
        },
    };

    // Filter Add Icon component từ Figma (imported)
    const renderFilterIcon = () => (
        <img
            src={FilterAddIcon}
            alt="filter add"
            width="20"
            height="20"
            style={{
                filter: isActive ? 'brightness(0) invert(1)' : 'none'
            }}
        />
    );

    // Handle click
    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        if (onClick) {
            onClick(e);
        }
    };

    // Combine styles
    const buttonStyles = {
        ...baseStyles,
        ...(disabled ? disabledStyles : isActive ? activeStyles : inactiveStyles),
    };

    return (
        <button
            className={`filter-button ${isActive ? 'filter-button--active' : 'filter-button--inactive'} ${className}`}
            style={buttonStyles}
            onClick={handleClick}
            disabled={disabled}
            onMouseEnter={(e) => {
                if (!disabled) {
                    const styles = isActive ? hoverStyles.active : hoverStyles.inactive;
                    Object.assign(e.target.style, styles);
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled) {
                    const styles = isActive ? activeStyles : inactiveStyles;
                    Object.assign(e.target.style, styles);
                }
            }}
            {...props}
        >
            {renderFilterIcon()}
        </button>
    );
};



export { ButtonFilter, ButtonFilterDemo };
export default ButtonFilter;
