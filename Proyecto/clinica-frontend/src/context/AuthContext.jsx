import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null); // 🔥 NUEVO

  // 🔥 CARGAR DATOS AL INICIAR
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsuario = localStorage.getItem("usuario");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUsuario) {
      setUsuario(JSON.parse(storedUsuario));
    }
  }, []);

  // 🔥 LOGIN COMPLETO
  const loginUser = (data) => {
    // data = { token, rol, nombre, apellido }

    localStorage.setItem("token", data.token);

    const userData = {
      nombre: data.nombre,
      apellido: data.apellido,
      rol: data.rol
    };

    localStorage.setItem("usuario", JSON.stringify(userData));

    setToken(data.token);
    setUsuario(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario"); // 🔥 IMPORTANTE
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);