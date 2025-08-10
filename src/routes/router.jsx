import listProduct from "../pages/products/listProduct";
import priceList from "../pages/products/priceList";
import supplier from "../pages/products/supplier";
import typeProducts from "../pages/products/typeProducts";
import receiptTypes from "../pages/finance/receiptTypes";

const ProductManagement = [
    {
        id: 'product-list',
        path: '/products/list',
        screen: listProduct,
    },
    {
        id: 'product-price-list',
        path: '/products/price-list',
        screen: priceList,
    },
    {
        id: 'product-suppliers',
        path: '/products/suppliers',
        screen: supplier,
    },
    {
        id: 'product-types',
        path: '/products/types',
        screen: typeProducts,
    }
];

const FinanceManagement = [
    {
        // id: 'finance-receipt-types',
        // path: '/finance/receipt-types',
        // screen: receiptTypes,
    }
];

// Combine all routes
const router = [
    ...ProductManagement,
    ...FinanceManagement
];

export default router;


