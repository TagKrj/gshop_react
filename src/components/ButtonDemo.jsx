import React from 'react';
import Button from '../components/button';

// Icon components
const ExportIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
            d="M2.07 7.42L17.93 7.42L17.93 17.92L2.07 17.92L2.07 7.42Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
        <path
            d="M10 3.02L10 12.5"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path
            d="M7.21 2.08L10 2.08L12.79 4.87"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
    </svg>
);

const SaveIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
            d="M15.833 17.5H4.167C3.5 17.5 2.5 17.5 2.5 15.833V4.167C2.5 2.5 3.5 2.5 4.167 2.5H12.5L17.5 7.5V15.833C17.5 17.5 16.5 17.5 15.833 17.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
        <path
            d="M6.667 2.5V7.5H13.333"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
        <path
            d="M6.667 11.667H13.333"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path
            d="M6.667 14.167H10.833"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    </svg>
);

const CancelIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
            d="M10 18.333C14.583 18.333 18.333 14.583 18.333 10C18.333 5.417 14.583 1.667 10 1.667C5.417 1.667 1.667 5.417 1.667 10C1.667 14.583 5.417 18.333 10 18.333Z"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path
            d="M7.5 12.5L12.5 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path
            d="M12.5 12.5L7.5 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    </svg>
);

const DownloadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
            d="M17.5 12.5V15.833C17.5 16.5 16.5 17.5 15.833 17.5H4.167C3.5 17.5 2.5 16.5 2.5 15.833V12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
        <path
            d="M5.833 8.333L10 12.5L14.167 8.333"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path
            d="M10 12.5V2.5"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    </svg>
);

const NotificationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
            d="M15 6.667C15 5.34 14.473 4.067 13.535 3.129C12.598 2.192 11.325 1.667 10 1.667C8.674 1.667 7.402 2.192 6.464 3.129C5.527 4.067 5 5.34 5 6.667C5 12.5 2.5 14.167 2.5 14.167H17.5C17.5 14.167 15 12.5 15 6.667Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
        <path
            d="M11.442 17.5C11.281 17.826 11.042 18.105 10.747 18.31C10.452 18.515 10.11 18.625 9.76 18.625C9.41 18.625 9.068 18.515 8.773 18.31C8.478 18.105 8.239 17.826 8.078 17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
            d="M4.167 10H15.833"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path
            d="M10.833 5L15.833 10L10.833 15"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
    </svg>
);

const ButtonDemo = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Open Sans' }}>
            <h1>Button Component Demo</h1>
            <p>Buttons created từ Figma designs sử dụng MCP</p>

            <div style={{ marginBottom: '30px' }}>
                <h2>Button Types</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* Primary Button - từ node 1:7208 */}
                    <Button type="primary" onClick={() => alert('Primary clicked!')}>
                        Xác nhận
                    </Button>

                    {/* Secondary Button - từ node 1:7207 */}
                    <Button type="secondary" onClick={() => alert('Secondary clicked!')}>
                        Mặc định
                    </Button>

                    {/* Export Button - từ node 22:22764 với Export Icon */}
                    <Button
                        type="export"
                        icon={<ExportIcon />}
                        onClick={() => alert('Export clicked!')}
                    >
                        Xuất file
                    </Button>
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>Button Sizes</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button type="primary" size="small">
                        Small Button
                    </Button>
                    <Button type="primary" size="medium">
                        Medium Button
                    </Button>
                    <Button type="primary" size="large">
                        Large Button
                    </Button>
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>Pill Buttons</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button type="primary" pill={true}>
                        Primary Pill
                    </Button>
                    <Button type="secondary" pill={true}>
                        Secondary Pill
                    </Button>
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>Disabled States</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button type="primary" disabled>
                        Disabled Primary
                    </Button>
                    <Button type="secondary" disabled>
                        Disabled Secondary
                    </Button>
                    <Button type="export" disabled>
                        Disabled Export
                    </Button>
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>Custom Icons</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button
                        type="primary"
                        icon={<NotificationIcon />}
                        iconPosition="left"
                    >
                        Thông báo
                    </Button>
                    <Button
                        type="secondary"
                        icon={<ArrowRightIcon />}
                        iconPosition="right"
                    >
                        Tiếp theo
                    </Button>
                    <Button
                        type="export"
                        icon={<DownloadIcon />}
                        iconPosition="left"
                    >
                        Tải xuống
                    </Button>
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>Usage Examples</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button
                        type="primary"
                        icon={<SaveIcon />}
                        onClick={() => console.log('Save clicked')}
                    >
                        Lưu
                    </Button>
                    <Button
                        type="secondary"
                        icon={<CancelIcon />}
                        onClick={() => console.log('Cancel clicked')}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="export"
                        icon={<ExportIcon />}
                        onClick={() => console.log('Export clicked')}
                    >
                        Xuất file
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ButtonDemo;
