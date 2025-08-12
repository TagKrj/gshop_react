import React, { useState } from 'react';
import DeleteBoxHeader from '../components/DeleteBoxHeader';

const Main = ({
    children,
    title,
    breadcrumb,
    headerButtons = [],
    onTabChange,
    className = '',
    selectedItems = [],
    onDeleteSelected,
    onDeselectAll,
    ...props
}) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
        if (onTabChange) {
            onTabChange(index, headerButtons[index]);
        }
    };
    return (
        <main
            className={`
        fixed 
        top-0 
        left-20 
        right-0 
        bottom-0 
        overflow-auto 
        transition-none
        ${className}
      `}
            style={{
                // Cố định left = 80px (w-20 của sidebar collapsed)
                // Sidebar hover sẽ overlay lên main, không push
                zIndex: 1
            }}
            {...props}
        >
            {/* Container chính */}
            <div className="h-full pl-6 pr-3 pt-3 pb-3">
                {/* Content area */}
                <div className="bg-white rounded-lg shadow-sm min-h-full pb-20">
                    <div className="p-6">
                        {/* Header section - moved inside white background */}
                        {(title || breadcrumb || headerButtons.length > 0) && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between gap-4 py-2">
                                    {/* Left side - Title & Breadcrumb */}
                                    <div className="flex flex-col gap-2">
                                        {title && (
                                            <h1 className="text-2xl font-bold text-gray-900">
                                                {title}
                                            </h1>
                                        )}
                                        {breadcrumb && (
                                            <div className="flex items-center gap-2 text-sm">
                                                {Array.isArray(breadcrumb) ? (
                                                    breadcrumb.map((item, index) => (
                                                        <React.Fragment key={index}>
                                                            <span
                                                                className="font-medium"
                                                                style={{
                                                                    color: index === 0 ? '#737373' : '#2E319E'
                                                                }}
                                                            >
                                                                {item}
                                                            </span>
                                                            {index < breadcrumb.length - 1 && (
                                                                <div
                                                                    className="w-1 h-1 rounded-full"
                                                                    style={{ backgroundColor: '#6366F1' }}
                                                                ></div>
                                                            )}
                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <span style={{ color: '#737373' }}>{breadcrumb}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Right side - Action Buttons */}
                                    {headerButtons.length > 0 && (
                                        <div
                                            className="inline-flex items-center gap-2 rounded-[12px]"
                                            style={{
                                                backgroundColor: '#FAFAFA',
                                                padding: '8px 12px'
                                            }}
                                        >
                                            {headerButtons.map((buttonText, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleTabClick(index)}
                                                    className={`
                                                        inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-semibold rounded-[8px] transition-all duration-200 whitespace-nowrap
                                                        ${index === activeTabIndex
                                                            ? 'bg-white border shadow-sm'
                                                            : 'bg-transparent border-transparent hover:bg-white/50'
                                                        }
                                                        cursor-pointer
                                                    `}
                                                    style={{
                                                        color: index === activeTabIndex ? '#161413' : '#404040',
                                                        borderColor: index === activeTabIndex ? '#6366F1' : 'transparent',
                                                        borderWidth: '1px',
                                                        fontSize: '13px',
                                                        fontWeight: 600,
                                                        lineHeight: '1.15'
                                                    }}
                                                >
                                                    <span className="flex-shrink-0">{buttonText}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* DeleteBox - appears when items are selected */}
                        {selectedItems && selectedItems.length > 0 && (
                            <div className="mb-4">
                                <DeleteBoxHeader
                                    selectedCount={selectedItems.length}
                                    onDelete={onDeleteSelected}
                                    onDeselect={onDeselectAll}
                                />
                            </div>
                        )}

                        {/* Main content */}
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
