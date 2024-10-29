// import { UserRound } from "lucide-react";
// import { Link } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    // Hapus cookies
    document.cookie = "yourCookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Arahkan ke halaman utama
    window.location.href = "/";
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 flex items-center justify-between bg-gray-800 shadow-lg px-6 py-4">
      <h1 className="text-2xl font-bold text-white tracking-wider"> organization management</h1>
      <button onClick={handleLogout} className="text-white bg-cyan-800 hover:bg-red-700 px-4 py-2 rounded">
        Logout
      </button>
    </header>
  );
}

export default Header;
