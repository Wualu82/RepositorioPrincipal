import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);

  // 🔥 CARGAR TOKEN AL INICIAR
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const loginUser = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);