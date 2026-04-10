import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Citas from "./pages/Citas";
import NuevaCita from "./pages/NuevaCita";
import PrivateRoute from "./routes/PrivateRoute";
import Admin from "./pages/Admin";
import Calendario from "./pages/Calendario";
import Home from "./pages/Home";

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

      </Routes>
    </BrowserRouter>
  );
};

export default App;