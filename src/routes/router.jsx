import ListProduct from "../pages/products/ListProduct";
import PriceList from "../pages/products/PriceList";
import Supplier from "../pages/products/Supplier";
import TypeProducts from "../pages/products/TypeProducts";
import ReceiptTypes from "../pages/finance/ReceiptTypes";
import Login from "../pages/auth/Login";

const Auth = [
    {
        id: 'auth-login',
        path: '/auth/login',
        screen: Login,
    }
];

const ProductManagement = [
    {
        id: 'product-list',
        path: '/products/list',
        screen: ListProduct,
    },
    {
        id: 'product-price-list',
        path: '/products/price-list',
        screen: PriceList,
    },
    {
        id: 'product-suppliers',
        path: '/products/suppliers',
        screen: Supplier,
    },
    {
        id: 'product-types',
        path: '/products/types',
        screen: TypeProducts,
    }
];

const FinanceManagement = [
    {
        id: 'finance-receipt-types',
        path: '/finance/receipt-types',
        screen: ReceiptTypes,
    }
];

// Combine all routes
const router = [
    ...Auth,
    ...ProductManagement,
    ...FinanceManagement
];

export default router;


