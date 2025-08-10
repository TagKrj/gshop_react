import product from '../assets/imgs/product.png';

export const mockListProductData = [
    {
        "id": 1,
        "img": product,
        "code": "PD001",
        "name": "Xe đồ chơi",
        "productType": {
            "id": 1,
            "name": "Đồ chơi"
        },
        "InputTaxRate": 10,
        "OutputTaxRate": 10,
        "unit": "Hộp",
        "unitPerBox": 10,
        "inventoryThreshold": 5,
        "lastUpdate": "12/12/2025 12:00",
        "updatedBy": "Nguyễn Văn A",
        "length": 10,
        "width": 10,
        "height": 10,
        "nameImgProduct": [
            { "id": 1, "name": "anh1.jpg" },
            { "id": 2, "name": "anh2.jpg" },
            { "id": 3, "name": "anh3.jpg" },
            { "id": 4, "name": "anh4.jpg" }
        ],
        "priceList": [
            { "id": 1, "code": "PL001", "name": "Bảng giá 1", "price": 90000 },
            { "id": 2, "code": "PL002", "name": "Bảng giá 2", "price": 95000 },
            { "id": 3, "code": "PL003", "name": "Bảng giá 3", "price": 100000 },
            { "id": 4, "code": "PL004", "name": "Bảng giá 4", "price": 105000 }
        ]
    },
    {
        "id": 2,
        "img": product,
        "code": "PD002",
        "name": "Búp bê công chúa",
        "productType": {
            "id": 1,
            "name": "Đồ chơi"
        },
        "InputTaxRate": 8,
        "OutputTaxRate": 8,
        "unit": "Cái",
        "unitPerBox": 20,
        "inventoryThreshold": 10,
        "lastUpdate": "15/12/2025 14:30",
        "updatedBy": "Trần Thị B",
        "length": 15,
        "width": 8,
        "height": 30,
        "nameImgProduct": [
            { "id": 1, "name": "bupbe1.jpg" },
            { "id": 2, "name": "bupbe2.jpg" }
        ],
        "priceList": [
            { "id": 1, "code": "PL005", "name": "Bảng giá 1", "price": 150000 },
            { "id": 2, "code": "PL006", "name": "Bảng giá 2", "price": 160000 }
        ]
    },
    {
        "id": 3,
        "img": product,
        "code": "PD003",
        "name": "Bộ xếp hình Lego",
        "productType": {
            "id": 1,
            "name": "Đồ chơi"
        },
        "InputTaxRate": 10,
        "OutputTaxRate": 10,
        "unit": "Bộ",
        "unitPerBox": 5,
        "inventoryThreshold": 3,
        "lastUpdate": "18/12/2025 09:20",
        "updatedBy": "Lê Văn C",
        "length": 25,
        "width": 25,
        "height": 10,
        "nameImgProduct": [
            { "id": 1, "name": "lego1.jpg" },
            { "id": 2, "name": "lego2.jpg" },
            { "id": 3, "name": "lego3.jpg" }
        ],
        "priceList": [
            { "id": 1, "code": "PL007", "name": "Bảng giá 1", "price": 500000 }
        ]
    },
    {
        "id": 4,
        "img": product,
        "code": "PD004",
        "name": "Xe điều khiển từ xa",
        "productType": {
            "id": 2,
            "name": "Điện tử"
        },
        "InputTaxRate": 12,
        "OutputTaxRate": 12,
        "unit": "Cái",
        "unitPerBox": 8,
        "inventoryThreshold": 4,
        "lastUpdate": "20/12/2025 11:00",
        "updatedBy": "Nguyễn Văn D",
        "length": 40,
        "width": 20,
        "height": 15,
        "nameImgProduct": [
            { "id": 1, "name": "xedk1.jpg" },
            { "id": 2, "name": "xedk2.jpg" }
        ],
        "priceList": [
            { "id": 1, "code": "PL008", "name": "Bảng giá 1", "price": 700000 },
            { "id": 2, "code": "PL009", "name": "Bảng giá 2", "price": 750000 }
        ]
    },
    {
        "id": 5,
        "img": product,
        "code": "PD005",
        "name": "Gấu bông Teddy",
        "productType": {
            "id": 3,
            "name": "Đồ dùng"
        },
        "InputTaxRate": 5,
        "OutputTaxRate": 5,
        "unit": "Cái",
        "unitPerBox": 15,
        "inventoryThreshold": 6,
        "lastUpdate": "22/12/2025 08:15",
        "updatedBy": "Phạm Thị E",
        "length": 50,
        "width": 25,
        "height": 60,
        "nameImgProduct": [
            { "id": 1, "name": "gau1.jpg" },
            { "id": 2, "name": "gau2.jpg" },
            { "id": 3, "name": "gau3.jpg" }
        ],
        "priceList": [
            { "id": 1, "code": "PL010", "name": "Bảng giá 1", "price": 250000 }
        ]
    },
    {
        "id": 6,
        "img": product,
        "code": "PD006",
        "name": "Sách tô màu",
        "productType": {
            "id": 4,
            "name": "Văn phòng phẩm"
        },
        "InputTaxRate": 5,
        "OutputTaxRate": 5,
        "unit": "Quyển",
        "unitPerBox": 50,
        "inventoryThreshold": 20,
        "lastUpdate": "24/12/2025 16:45",
        "updatedBy": "Đỗ Văn F",
        "length": 30,
        "width": 21,
        "height": 1,
        "nameImgProduct": [
            { "id": 1, "name": "sach1.jpg" },
            { "id": 2, "name": "sach2.jpg" }
        ],
        "priceList": [
            { "id": 1, "code": "PL011", "name": "Bảng giá 1", "price": 20000 }
        ]
    },
    {
        "id": 7,
        "img": product,
        "code": "PD007",
        "name": "Bảng chữ cái tiếng Việt",
        "productType": {
            "id": 4,
            "name": "Văn phòng phẩm"
        },
        "InputTaxRate": 5,
        "OutputTaxRate": 5,
        "unit": "Bộ",
        "unitPerBox": 30,
        "inventoryThreshold": 8,
        "lastUpdate": "26/12/2025 10:50",
        "updatedBy": "Nguyễn Văn G",
        "length": 40,
        "width": 30,
        "height": 2,
        "nameImgProduct": [
            { "id": 1, "name": "bang1.jpg" },
            { "id": 2, "name": "bang2.jpg" }
        ],
        "priceList": [
            { "id": 1, "code": "PL012", "name": "Bảng giá 1", "price": 80000 }
        ]
    }
]

export const mockSelectOptions = [
    { value: "UN01", label: "UN01 - Hộp" },
    { value: "UN02", label: "UN02 - Cái" },
    { value: "UN03", label: "UN03 - Bộ" },
    { value: "UN04", label: "UN04 - Chiếc" }
];