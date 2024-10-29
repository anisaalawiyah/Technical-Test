import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { signInWithGoogle } from '../firebase.js'; // Import fungsi login Google

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log({ email, password });
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password,
            });
            console.log(response.data); 
            const token = response.data.data.token; 
            console.log(token);
            cookie.set('token', token);
            if (token) {
                alert('Login berhasil!'); 
                navigate('/member'); 
            } else {
                setError('Token tidak ditemukan dalam respons');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle(); // Panggil fungsi login Google
            const token = result.user.accessToken; // Ambil token dari hasil login Google

            // Tambahkan verifikasi token di sini
            const verifyResponse = await axios.post('http://localhost:8080/api/auth/verify-token', null, {
                params: { idToken: token }
            });
            console.log(verifyResponse.data); // Log hasil verifikasi token

            alert('Login dengan Google berhasil!'); 
            navigate('/member'); // Arahkan ke halaman member setelah login
        } catch (error) {
            setError('Login dengan Google gagal: ' + error.message);
        }
    };

    return (
        <>
            <Header/>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="bg-white rounded-lg shadow-lg p-8 w-96 bg-gradient-to-r from-sky-900 to-cyan-800">
                    <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium"></label>
                            <input
                                type="email"
                                  placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium"></label>
                            <input
                                type="password"
                                  placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button type="submit" className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200">Login</button>
                    </form>
                    <button onClick={handleGoogleLogin} className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-500 transition duration-200 mt-4">Login dengan Google</button>
                    <p className="text-center text-white mt-4">
                        Belum punya akun? <a href="/register" className="text-white hover:underline">Daftar di sini</a>
                    </p>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Login;
