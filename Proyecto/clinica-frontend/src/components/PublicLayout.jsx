import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { token, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* 🔝 NAVBAR */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

        {/* 🩺 LOGO */}
        <h1
          className="font-bold text-xl text-primary cursor-pointer"
          onClick={() => navigate("/")}
        >
          🩺 Clínica Vitalia
        </h1>

        {/* 🍔 BOTÓN MÓVIL */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* 💻 MENU DESKTOP */}
        <div className="hidden md:flex gap-6 items-center text-sm">

          <Link to="/" className="hover:text-primary">Inicio</Link>
          <Link to="/servicios" className="hover:text-primary">Servicios</Link>
          <Link to="/equipo" className="hover:text-primary">Equipo</Link>
          <Link to="/clinica" className="hover:text-primary">La clínica</Link>
          <Link to="/trabaja" className="hover:text-primary">Trabaja</Link>

          {/* 🔥 CONTROL DE LOGIN */}
          {!token ? (
            <button
              onClick={() => navigate("/login")}
              className="text-primary"
            >
              Área personal
            </button>
          ) : (
            <>
              <button onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="bg-accent text-white px-4 py-2 rounded-lg"
              >
                Cerrar sesión
              </button>
            </>
          )}

          {/* 🔥 BOTÓN INTELIGENTE */}
          <button
            onClick={() => navigate(token ? "/citas/nueva" : "/login")}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
          >
            Pedir cita
          </button>

        </div>
      </nav>

      {/* 📱 MENU MÓVIL */}
      {open && (
        <div className="md:hidden bg-white shadow px-6 py-4 flex flex-col gap-4 text-sm">

          <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link to="/servicios" onClick={() => setOpen(false)}>Servicios</Link>
          <Link to="/equipo" onClick={() => setOpen(false)}>Equipo</Link>
          <Link to="/clinica" onClick={() => setOpen(false)}>La clínica</Link>
          <Link to="/trabaja" onClick={() => setOpen(false)}>Trabaja</Link>

          {!token ? (
            <button onClick={() => navigate("/login")}>
              Área personal
            </button>
          ) : (
            <>
              <button onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>

              <button onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}

          {/* 🔥 BOTÓN INTELIGENTE MOBILE */}
          <button
            onClick={() => navigate(token ? "/citas/nueva" : "/login")}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Pedir cita
          </button>

        </div>
      )}

      {/* 📄 CONTENIDO */}
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>

      {/* 🔻 FOOTER */}
      <footer className="bg-white border-t mt-10 text-sm">

        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>
            <h2 className="text-lg font-semibold mb-2">
              🩺 Clínica Vitalia
            </h2>
            <p className="text-gray-500">
              Cuidamos de tu salud con profesionales de confianza.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Enlaces</h3>
            <ul className="space-y-1 text-gray-600">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li><Link to="/equipo">Equipo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Contacto</h3>
            <p>📍 Av. de Andalucía 45, Málaga</p>
            <p>📞 951 123 456</p>
            <p>✉️ info@vitalia.com</p>
          </div>

        </div>

        <div className="text-center text-gray-400 text-xs pb-4">
          © 2026 Clínica Vitalia. Todos los derechos reservados.
        </div>

      </footer>

    </div>
  );
};

export default PublicLayout;