import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../api/auth"; // 🔥 AÑADIDO login
import { useAuth } from "../context/AuthContext"; // 🔥 AÑADIDO
import toast from "react-hot-toast";
import PublicLayout from "../components/PublicLayout";

export default function Register() {
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // 🔥 AÑADIDO

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    try {
      // 1️⃣ REGISTRO
      await register({
        email,
        password,
        nombre,
        apellido,
        telefono,
        fechaNacimiento,
      });

      // 2️⃣ LOGIN AUTOMÁTICO 🔥
      const data = await login(email, password);
      loginUser(data);

      toast.success("Registro completado 🎉");

      // 3️⃣ REDIRECCIÓN
      navigate("/dashboard");

    } catch (error) {
      console.log("❌ ERRORES:", error);

      if (typeof error === "object") {
        setErrors(error);
      } else {
        toast.error("Error al registrarse");
      }
    }
  };

  return (
    <PublicLayout>

      <div className="flex items-center justify-center py-10">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-center">
            🩺 Registro - Clínica Vitalia
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors(prev => ({ ...prev, email: null }));
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(prev => ({ ...prev, password: null }));
                }}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* NOMBRE */}
            <div>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-2 border rounded"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  setErrors(prev => ({ ...prev, nombre: null }));
                }}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm">{errors.nombre}</p>
              )}
            </div>

            {/* APELLIDO */}
            <div>
              <input
                type="text"
                placeholder="Apellido"
                className="w-full p-2 border rounded"
                value={apellido}
                onChange={(e) => {
                  setApellido(e.target.value);
                  setErrors(prev => ({ ...prev, apellido: null }));
                }}
              />
              {errors.apellido && (
                <p className="text-red-500 text-sm">{errors.apellido}</p>
              )}
            </div>

            {/* TELEFONO */}
            <div>
              <input
                type="text"
                placeholder="Teléfono"
                className="w-full p-2 border rounded"
                value={telefono}
                onChange={(e) => {
                  setTelefono(e.target.value);
                  setErrors(prev => ({ ...prev, telefono: null }));
                }}
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm">{errors.telefono}</p>
              )}
            </div>

            {/* FECHA */}
            <div>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={fechaNacimiento}
                onChange={(e) => {
                  setFechaNacimiento(e.target.value);
                  setErrors(prev => ({ ...prev, fechaNacimiento: null }));
                }}
              />
              {errors.fechaNacimiento && (
                <p className="text-red-500 text-sm">{errors.fechaNacimiento}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Registrarse
            </button>

          </form>

        </div>

      </div>

    </PublicLayout>
  );
}