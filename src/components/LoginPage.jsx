import { useState } from "react";
import { useAuth } from '../hooks/useAuth'; // [cite: 602]
import { useNavigate } from 'react-router-dom'; // [cite: 603]

// Komponen Logo dengan URL yang sudah benar
function BpsLogo() {
    return (
        <img
            src="https://res.cloudinary.com/djcm0swgo/image/upload/v1751775675/bps-logo_1_1dppzk.png"
            alt="BPS Logo"
            className="h-12 w-12"
        />
    );
}

export default function LoginPage() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const { loginAction, error, loading } = useAuth();
    const navigate = useNavigate(); // [cite: 608]

    const handleSubmit = async (e) => { // 
        e.preventDefault(); // [cite: 612]
         if (!email || !password) { // [cite: 614]
            alert('Email dan password harus diisi!'); // [cite: 616]
            return;
        }
        
        try {
            await loginAction(email, password); // [cite: 618]
            navigate('/publications');
        } catch (err) {
            console.error('Login failed:', err); // [cite: 622]
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-blue-100 bg-cover bg-center m-0 p-0">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                
                {/* === BAGIAN YANG DIPERBAIKI === */}
                <div className="flex justify-center mb-4">
                    <BpsLogo />
                </div>
                
                {/* Komponen untuk menampilkan pesan error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Masukkan email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}