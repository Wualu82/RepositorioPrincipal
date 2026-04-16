import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer"; // 🔥 IMPORTANTE

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { token, usuario, logoutUser } = useAuth();

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

          <Link to="/">Inicio</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/equipo">Equipo</Link>
          <Link to="/clinica">La clínica</Link>
          <Link to="/trabaja">Trabaja</Link>

          {!token ? (
            <button
              onClick={() => navigate("/login")}
              className="text-primary"
            >
              Área personal
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-white text-blue-600 rounded-full font-bold">
                  {usuario?.nombre?.[0]}{usuario?.apellido?.[0]}
                </div>

                <span>
                  {usuario?.nombre}
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="bg-accent text-white px-4 py-2 rounded-lg"
              >
                Cerrar sesión
              </button>
            </>
          )}

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
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setOpen(false);
                }}
              >
                {usuario?.nombre} {usuario?.apellido}
              </button>

              <button onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}

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

      {/* 🔻 FOOTER REAL */}
      <Footer />

    </div>
  );
};

export default PublicLayout;