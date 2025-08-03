import React from 'react';
import addIcon from '../assets/icons/add.svg';

const ButtonAdd = ({
    onClick,
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full p-4 w-12 h-12 bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed ${className}`}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            aria-label="Add item"
            {...props}
        >
            <img
                src={addIcon}
                alt="Add"
                className="w-6 h-6 filter brightness-0 invert"
            />
        </button>
    );
};

// Demo component đơn giản
export const ButtonAddDemo = () => {
    const handleAddClick = (type) => {
        console.log(`Add ${type} clicked`);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">ButtonAdd Component</h2>

                {/* Usage Examples */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <span className="text-gray-900">Add Product</span>
                        <ButtonAdd onClick={() => handleAddClick('product')} />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <span className="text-gray-900">Add Category</span>
                        <ButtonAdd onClick={() => handleAddClick('category')} />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <span className="text-gray-900">Add Supplier</span>
                        <ButtonAdd onClick={() => handleAddClick('supplier')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ButtonAdd;
