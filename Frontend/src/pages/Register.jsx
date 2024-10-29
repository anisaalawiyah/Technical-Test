import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Validasi input
        if (formData.name.length < 5) {
            setErrorMessage('Nama harus minimal 5 karakter.');
            return;
        }
        if (formData.address.length < 5) {
            setErrorMessage('Alamat harus minimal 5 karakter.');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setErrorMessage('Email tidak valid.');
            return;
        }
        if (!/^\d{12,}$/.test(formData.phoneNumber)) {
            setErrorMessage('Nomor telepon harus berupa angka dan minimal 13 karakter.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/customer/register', formData);
            console.log(response.data);
            setSuccessMessage('Pendaftaran berhasil!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            setErrorMessage('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
        }
    };

    return (
        <>
       <Header/>
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 bg-gradient-to-r from-sky-900 to-cyan-800">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Daftar Akun</h2>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Nama" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black-600" onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Alamat" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black-600" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600" onChange={handleChange} required />
                    <input type="text" name="phoneNumber" placeholder="Nomor Telepon" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Kata Sandi" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600" onChange={handleChange} required />
                    <button type="submit" className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200">Daftar</button>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Register;
