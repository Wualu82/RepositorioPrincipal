import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Citas from "./pages/Citas";
import NuevaCita from "./pages/NuevaCita";
import HistorialCitas from "./pages/HistorialCitas"; // 🔥 NUEVO

import PrivateRoute from "./routes/PrivateRoute";
import Admin from "./pages/Admin";
import Calendario from "./pages/Calendario";

import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Equipo from "./pages/Equipo";
import MedicoDetalle from "./pages/MedicoDetalle";
import Clinica from "./pages/Clinica";
import Trabaja from "./pages/Trabaja";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 PRIVADAS */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/citas"
          element={
            <PrivateRoute>
              <Citas />
            </PrivateRoute>
          }
        />

        <Route
          path="/citas/nueva"
          element={
            <PrivateRoute>
              <NuevaCita />
            </PrivateRoute>
          }
        />

        {/* 🔥 HISTORIAL */}
        <Route
          path="/citas/historial"
          element={
            <PrivateRoute>
              <HistorialCitas />
            </PrivateRoute>
          }
        />

        {/* 👨‍⚕️ ADMIN */}
        <Route path="/admin" element={<Admin />} />

        {/* 📅 CALENDARIO */}
        <Route path="/calendario" element={<Calendario />} />

        {/* 🌐 PÚBLICAS */}
        <Route path="/" element={<Home />} />

        <Route 
          path="/servicios" 
          element={<Servicios />}
        />

        <Route path="/equipo" element={<Equipo />} />
        <Route path="/equipo/:id" element={<MedicoDetalle />} />

        <Route path="/clinica" element={<Clinica />} />
        <Route path="/trabaja" element={<Trabaja />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;