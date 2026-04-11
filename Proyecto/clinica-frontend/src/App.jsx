import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Citas from "./pages/Citas";
import NuevaCita from "./pages/NuevaCita";
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
        <Route path="/login" element={<Login />} />

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
        <Route
          path="/admin" 
          element={
            <Admin />
          } 
        />

        <Route 
          path="/calendario"
          element={
          <Calendario />
          } 
        />      

        <Route 
          path="/" element={
          <Home />
          } 
        />

        <Route 
          path="/servicios" 
          element={<
          Servicios />
          } 
        />  

        <Route 
          path="/equipo" 
          element={
          <Equipo />
          } 
        />

        <Route path="/equipo/:id" element={<MedicoDetalle />} />

        <Route path="/clinica" element={<Clinica />} />

        <Route path="/trabaja" element={<Trabaja />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;