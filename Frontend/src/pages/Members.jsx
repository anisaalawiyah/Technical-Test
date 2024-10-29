import { useEffect, useState } from 'react';
import axios from 'axios';
import AddMember from '../components/addMember';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import Footer from '../components/Footer';
import Header from '../components/Header';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMember, setNewMember] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const token = Cookies.get('token'); // Ambil token dari cookie
                if (!token) throw new Error('Token tidak ditemukan'); // Tambahkan pengecekan token
                const response = await axios.get('http://localhost:8080/api/member/all-member', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pastikan token ditambahkan di sini
                    },
                });
                setMembers(response.data.data);
                setFilteredMembers(response.data.data); // Set initial filtered members to all members
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, [newMember]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value) {
            const searchResults = members.filter(member =>
                member.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredMembers(searchResults);
        } else {
            setFilteredMembers(members);
        }
    };

    const handleAddMember = (member) => {
        setNewMember(member);
        setMembers((prevMembers) => [...prevMembers, member]);
        setFilteredMembers((prevFiltered) => [...prevFiltered, member]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Header />
            <div className="mb-15 p-12">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Daftar Anggota</h1>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari nama anggota..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs" // Memperlebar input
                            />
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35" />
                                </svg>
                            </span>
                        </div>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="bg-cyan-800 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Reset
                        </button>
                    </div>
                    <AddMember onAddMember={handleAddMember} />
                </div>
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gradient-to-r from-sky-900 to-cyan-800 text-white">
                                <th className="py-4 px-6 border-b font-semibold text-left">No</th>
                                <th className="py-4 px-6 border-b font-semibold text-left">Nama</th>
                                <th className="py-4 px-6 border-b font-semibold text-left">Posisi</th>
                                <th className="py-4 px-6 border-b font-semibold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(filteredMembers) && filteredMembers.length > 0 ? (
                                filteredMembers.map((member, index) => (
                                    <tr key={member.name} className={`hover:bg-blue-50 transition duration-200 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-cyan-50'}`}>
                                        <td className="py-4 px-6 border-b text-gray-700 text-center">{index + 1}</td>
                                        <td className="py-4 px-6 border-b text-gray-700">{member.name}</td>
                                        <td className="py-4 px-6 border-b text-gray-700">{member.posisi}</td>
                                        <td className="py-4 px-6 border-b text-center">
                                            <Link
                                                to="/detail-member"
                                                className="bg-gradient-to-r from-sky-900 to-cyan-800 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-200"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 px-6 border-b text-center text-gray-600">
                                        Tidak ada anggota yang ditemukan.
                                    </td>
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

export default Members;
