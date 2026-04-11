import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* 🔝 NAVBAR */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

        {/* LOGO → SIEMPRE HOME */}
        <h1
          className="font-bold text-xl text-primary cursor-pointer"
          onClick={() => navigate("/")}
        >
          🩺 Clínica Vitalia
        </h1>

        {/* 🍔 MOBILE */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* 💻 DESKTOP */}
        <div className="hidden md:flex gap-6 items-center text-sm">

          <Link to="/">Inicio</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/equipo">Equipo</Link>
          <Link to="/clinica">La clínica</Link>
          <Link to="/trabaja">Trabaja</Link>

          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="bg-accent text-white px-4 py-2 rounded-lg"
          >
            Cerrar sesión
          </button>

        </div>
      </nav>

      {/* 📱 MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow px-6 py-4 flex flex-col gap-4">

          <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link to="/servicios" onClick={() => setOpen(false)}>Servicios</Link>
          <Link to="/equipo" onClick={() => setOpen(false)}>Equipo</Link>
          <Link to="/clinica" onClick={() => setOpen(false)}>La clínica</Link>
          <Link to="/trabaja" onClick={() => setOpen(false)}>Trabaja</Link>

          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <button onClick={handleLogout}>
            Cerrar sesión
          </button>

        </div>
      )}

      {/* CONTENIDO */}
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>

    </div>
  );
};

export default Layout;