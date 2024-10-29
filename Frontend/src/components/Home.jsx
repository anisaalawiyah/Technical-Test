import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('https://i.pinimg.com/564x/cf/68/ee/cf68ee03226c3f3fd20bf16e65629e42.jpg')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay Warna Gelap */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative z-10 p-12 rounded-xl shadow-xl max-w-2xl text-center text-white">
        <h1 className="text-5xl font-extrabold text-indigo-400 mb-4">
          Selamat Datang di <span className="text-indigo-200">Sistem Manajemen Organisasi</span>
        </h1>
        <p className="text-lg font-medium text-gray-300 mb-8 leading-relaxed tracking-wide">
          Mudahkan pengelolaan organisasi Anda dengan platform yang intuitif dan efisien. Kelola anggota, kegiatan, dan informasi organisasi dalam satu tempat yang dapat diandalkan.
        </p>
        <p className="text-xl font-light text-indigo-200 italic mb-10">
          &quot;Bersama-sama mencapai tujuan yang lebih tinggi.&quot;
        </p>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
          <Link to="/login">login untuk mulai</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
