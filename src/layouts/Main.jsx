import React from 'react';

const Main = ({
    children,
    title,
    breadcrumb,
    className = '',
    ...props
}) => {
    return (
        <main
            className={`
        fixed 
        top-0 
        left-20 
        right-0 
        bottom-0 
        bg-gray-50 
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
            <div className="h-full p-6">
                {/* Header section */}
                {(title || breadcrumb) && (
                    <div className="mb-6">
                        {breadcrumb && (
                            <div className="text-sm text-gray-600 mb-2">
                                {breadcrumb}
                            </div>
                        )}
                        {title && (
                            <h1 className="text-3xl font-bold text-gray-900">
                                {title}
                            </h1>
                        )}
                    </div>
                )}

                {/* Content area */}
                <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-8rem)]">
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
