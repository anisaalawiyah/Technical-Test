import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DetailMember = () => {
    const [members, setMembers] = useState([]);
    // const [isUpdating, setIsUpdating] = useState(false);
    // const [currentMemberId, setCurrentMemberId] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const token = Cookies.get('token'); // Ambil token dari cookie
                if (!token) throw new Error('Token tidak ditemukan'); // Tambahkan pengecekan token
                const response = await axios.get('http://localhost:8080/api/member/get-member', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pastikan token ditambahkan di sini
                    },
                });
                setMembers(response.data.data); // Sesuaikan dengan struktur respons API
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = Cookies.get('token');
            await axios.delete(`http://localhost:8080/api/member/delete-member?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMembers(members.filter(member => member.id !== id)); // Menghapus anggota dari state
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="mb-15 p-12">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Detail Anggota</h1>
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-sky-900 to-cyan-800 text-white">
                            <tr>
                                <th className="w-16 py-4 px-6 border-b font-semibold text-center">No</th>
                                <th className="w-1/3 py-4 px-6 border-b font-semibold text-left">Nama</th>
                                <th className="w-1/4 py-4 px-6 border-b font-semibold text-center">Posisi</th>
                                <th className="w-1/4 py-4 px-6 border-b font-semibold text-center">Atasan</th>
                                <th className="w-24 py-4 px-6 border-b font-semibold text-center">Foto</th>
                                <th className="w-24 py-4 px-6 border-b font-semibold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member, index) => (
                                <tr key={member.id} className={`hover:bg-blue-50 transition duration-200 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-cyan-50'}`}>
                                    <td className="py-4 px-6 border-b text-gray-700 text-center">{index + 1}</td>
                                    <td className="py-4 px-6 border-b text-gray-700">{member.name}</td>
                                    <td className="py-4 px-6 border-b text-gray-700">{member.position}</td>
                                    <td className="py-4 px-6 border-b text-gray-700">
                                        {member.superior && member.superior.name ? member.superior.name : 'Tidak ada atasan'}
                                    </td>
                                    <td className="py-4 px-6 border-b text-center">
                                        <img src={`data:image/jpeg;base64,${member.photo}`} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                                    </td>
                                    <td className=" py-4 px-6 border-b text-center">
                                        <button onClick={() => handleDelete(member.id)} className=" bg-gradient-to-r from-sky-900 to-cyan-800 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {members.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="py-4 px-6 border-b text-center text-gray-600">Tidak ada anggota yang ditemukan.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailMember;
