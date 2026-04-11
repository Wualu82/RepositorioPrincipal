import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PublicLayout from "../components/PublicLayout";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      // 🔐 Guardar token en contexto + localStorage
      loginUser(data.token);

      // 🔥 Guardar rol
      if (data.rol) {
        localStorage.setItem("rol", data.rol);
      }

      // 🔥 TOAST
      toast.success("Login correcto");

      // 🔥 Redirección con pequeño delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("Credenciales incorrectas");
    }
  };

  return (
    <PublicLayout>

      <div className="flex items-center justify-center py-10">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

          <h2 className="text-2xl font-bold text-center mb-6">
            🩺 Clínica Vitalia - Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
            >
              Entrar
            </button>

          </form>

        </div>

      </div>

    </PublicLayout>
  );
};

export default Login;