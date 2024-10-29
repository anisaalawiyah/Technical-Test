import './App.css'
// import Footer from './components/Footer'
// import Header from './components/Header'
import { Outlet } from 'react-router-dom'; // Tambahkan Outlet untuk menampilkan rute anak
import { useEffect } from 'react';
import { handleRedirectResult } from './firebase'; // Impor fungsi baru

function App() {
  useEffect(() => {
    handleRedirectResult(); // Panggil fungsi untuk menangani hasil login
  }, []);

  return (
    <>
      {/* <Header /> */}
      <Outlet /> {/* Menampilkan komponen berdasarkan rute */}
      {/* <Footer /> */}
    </>
  )
}

export default App
