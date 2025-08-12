import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import eyeIcon from '../../assets/icons/eye-icon.svg';
import eyeOffIcon from '../../assets/icons/eye-Closed.svg';


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Kiểm tra form hợp lệ khi username và password thay đổi
    useEffect(() => {
        setIsFormValid(username.trim() !== '' && password.trim() !== '');
    }, [username, password]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        setIsLoading(true);

        try {
            // Giả lập quá trình đăng nhập
            setTimeout(() => {
                console.log('Login with:', { username, password });
                // Sau khi đăng nhập thành công, chuyển hướng đến trang chính
                navigate('/products/list');
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
            <div className="w-[529px] h-[708px] bg-white rounded-[12px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-[27px] flex items-center justify-center">
                <div className="w-[430px]">
                    {/* Logo và tên công ty */}
                    <div className="flex items-center mb-[180px]">
                        <div className="w-[55px] h-[55px] bg-[#6366F1] rounded-[4px]"></div>
                        <h1 className="ml-[13px] text-[30px] font-bold text-[#171717]">Company S</h1>
                    </div>

                    {/* Form đăng nhập */}
                    <form onSubmit={handleLogin}>
                        <h2 className="text-[36px] font-bold text-[#171717] mb-[32px]">Đăng nhập</h2>

                        <div className="flex flex-col gap-[20px] mb-[32px]">
                            <div className="flex flex-col gap-[16px]">
                                {/* Input tên đăng nhập */}
                                <div className="relative h-[50px]">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full h-full px-[20px] border border-[#D0D0D0] rounded-[4px] focus:outline-none focus:border-[#6366F1] focus:bg-[#F1F1FE]"
                                        placeholder='Tên đăng nhập'
                                        required
                                    />
                                </div>

                                {/* Input mật khẩu */}
                                <div className="relative h-[50px]">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-full px-[20px] border border-[#D0D0D0] rounded-[4px] focus:outline-none focus:border-[#6366F1] focus:bg-[#F1F1FE]"
                                        placeholder='Mật khẩu'
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-[20px] top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                                    >
                                        <img src={showPassword ? eyeIcon : eyeOffIcon} alt="Toggle password visibility" className="w-[24px] h-[24px]" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Nút đăng nhập */}
                        <button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className={`w-full py-[20px] px-[36px] rounded-[6px] font-medium text-[15px] transition-all duration-300 ${isFormValid
                                ? 'bg-[#6366F1] text-white cursor-pointer'
                                : 'bg-[#F1F1FE] text-[#8C8C8C] cursor-not-allowed'
                                }`}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
