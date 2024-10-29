import { useState, useEffect } from 'react';
import axios from 'axios';

const AddMember = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [idSuperior, setIdSuperior] = useState('');
    const [photo, setPhoto] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // Menambahkan state untuk popup
    // const [token, setToken] = useState(''); // Menambahkan state untuk token
    const [superiors, setSuperiors] = useState([{ id: "", name: "", desc: "", saleId: "" }]); // Menambahkan state untuk menyimpan daftar superior
    // eslint-disable-next-line no-unused-vars
    const [errorMessage, setErrorMessage] = useState(''); // Menambahkan state untuk menyimpan pesan kesalahan
    const [nameError, setNameError] = useState('');
    const [positionError, setPositionError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // Tambahkan state baru ini

    useEffect(() => {
        const fetchSuperiors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/member/all-superior');
                console.log(response.data); // Tambahkan log untuk memeriksa data
                // Periksa apakah data ada dan sesuai dengan struktur yang diharapkan
                if (response.data.success && response.data.data) {
                    setSuperiors(response.data.data); // Pastikan ini sesuai dengan struktur data
                } else {
                    setErrorMessage('No superiors found');
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchSuperiors();
    }, [refreshTrigger]);

    const validateInputs = () => {
        let isValid = true;
        
        // Validasi nama (minimal 2 kata)
        const nameWords = name.trim().split(/\s+/);
        if (nameWords.length < 2) {
            setNameError('Nama harus terdiri dari minimal 2 kata');
            isValid = false;
        } else {
            setNameError('');
        }

        // Validasi posisi (minimal 5 karakter)
        if (position.trim().length < 5) {
            setPositionError('Posisi harus terdiri dari minimal 5 karakter');
            isValid = false;
        } else {
            setPositionError('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateInputs()) {
            return;
        }

        console.log("ID Superior yang dikirim:", idSuperior); // Tambahkan log ini
        const formData = new FormData();
        formData.append('name', name);
        formData.append('position', position);
        formData.append('idSuperior', idSuperior); // Pastikan ini ditambahkan
        // Menambahkan field untuk foto
        formData.append('photo', photo); // Menambahkan foto ke formData

        try {
            // Pertama, tambahkan anggota
            const response = await axios.post('http://localhost:8080/api/member/add-member', {
                name, 
                position, 
                idSuperior, 
                photo
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (photo) {
                const photoFormData = new FormData();
                photoFormData.append('id', response.data.data.id);
                photoFormData.append('file', photo);
                await axios.put('http://localhost:8080/api/member/uploadPhoto', photoFormData);
            }

            // Setelah berhasil menambahkan member
            setRefreshTrigger(prev => prev + 1); // Tambahkan ini untuk memicu refresh
            
            // Reset form dan tampilkan alert
            setName('');
            setPosition('');
            setIdSuperior('');
            setPhoto(null);
            
            // Tampilkan alert dan tutup form
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setIsOpen(false);
            }, 2000);

        } catch (error) {
            console.error('Error adding member:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="bg-cyan-800 hover:bg-cyan-900 text-white px-4 py-2 rounded transition duration-300">
                Add Member
            </button>

            {showAlert && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
                    Data berhasil ditambahkan!
                </div>
            )}

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-[500px]">
                        <h2 className="text-2xl font-bold mb-6 text-cyan-800">Tambahkan Anggota</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Nama:</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                                    placeholder="Masukkan nama lengkap"
                                />
                                {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Posisi:</label>
                                <input 
                                    type="text" 
                                    value={position} 
                                    onChange={(e) => setPosition(e.target.value)} 
                                    required 
                                    className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                                    placeholder="Masukkan posisi"
                                />
                                {positionError && <p className="text-red-500 text-sm">{positionError}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Superior:</label>
                                <select
                                    required
                                    className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    value={idSuperior}
                                    onChange={(e) => setIdSuperior(e.target.value)}
                                >
                                    <option value="">Pilih Superior</option>
                                    {superiors.length > 0 ? (
                                        superiors.map((superior, index) => (
                                            <option key={index} value={superior.id}>
                                                {superior.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Tidak ada superior tersedia</option>
                                    )}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Foto:</label>
                                <input 
                                    type="file" 
                                    onChange={(e) => setPhoto(e.target.files[0])} 
                                    className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setIsOpen(false)} 
                                    className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-300"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 rounded-md text-white bg-cyan-800 hover:bg-cyan-900 transition duration-300"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddMember;
