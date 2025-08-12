import listProduct from "../pages/products/ListProduct";
import priceList from "../pages/products/PriceList";
import supplier from "../pages/products/Supplier";
import typeProducts from "../pages/products/TypeProducts";
import receiptTypes from "../pages/finance/ReceiptTypes";
import login from "../pages/auth/Login";

const Auth = [
    {
        id: 'auth-login',
        path: '/auth/login',
        screen: login,
    }
];

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
    ...Auth,
    ...ProductManagement,
    ...FinanceManagement
];

export default router;


