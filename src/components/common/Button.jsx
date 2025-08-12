import React from 'react';

const Button = ({
    type = 'primary',
    size = 'medium',
    pill = false,
    icon = null,
    iconPosition = 'left',
    disabled = false,
    children,
    onClick,
    className = '',
    ...props
}) => {
    // Base styles từ Figma
    const baseStyles = {
        fontFamily: 'Open Sans',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '1.2em',
        borderRadius: pill ? '9999px' : '8px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease-in-out',
        textDecoration: 'none',
    };

    // Size variants
    const sizeStyles = {
        small: {
            padding: '8px 16px',
            fontSize: 12,
            minHeight: '32px',
        },
        medium: {
            padding: '12px 20px',
            fontSize: 14,
            minHeight: '44px',
        },
        large: {
            padding: '16px 24px',
            fontSize: 16,
            minHeight: '52px',
        },
    };

    // Type variants dựa trên Figma designs
    const typeStyles = {
        primary: {
            backgroundColor: '#6366F1',
            color: '#FAFAFA',
            border: 'none',
        },
        secondary: {
            backgroundColor: '#FFFFFF',
            color: '#6366F1',
            border: '1px solid #E5E5E5',
        },
        export: {
            backgroundColor: '#6366F1',
            color: '#FAFAFA',
            border: 'none',
        },
    };

    // Hover styles
    const hoverStyles = {
        primary: {
            backgroundColor: '#5555E8',
        },
        secondary: {
            backgroundColor: '#F8F9FF',
            borderColor: '#6366F1',
        },
        export: {
            backgroundColor: '#5555E8',
        },
    };

    // Disabled styles
    const disabledStyles = {
        backgroundColor: '#F3F4F6',
        color: '#9CA3AF',
        border: '1px solid #E5E7EB',
        cursor: 'not-allowed',
    };

    // Combine styles
    const buttonStyles = {
        ...baseStyles,
        ...sizeStyles[size],
        ...(disabled ? disabledStyles : typeStyles[type]),
    };

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

    // Render icon chỉ khi được truyền vào
    const renderIcon = () => {
        if (icon) {
            return icon;
        }
        return null;
    };

    return (
        <button
            className={`button button--${type} button--${size} ${className}`}
            style={buttonStyles}
            onClick={handleClick}
            disabled={disabled}
            onMouseEnter={(e) => {
                if (!disabled) {
                    Object.assign(e.target.style, hoverStyles[type]);
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled) {
                    Object.assign(e.target.style, typeStyles[type]);
                }
            }}
            {...props}
        >
            {iconPosition === 'left' && renderIcon()}
            <span>{children}</span>
            {iconPosition === 'right' && renderIcon()}
        </button>
    );
};

export default Button;
