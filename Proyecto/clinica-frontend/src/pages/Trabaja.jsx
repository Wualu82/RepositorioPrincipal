import PublicLayout from "../components/PublicLayout";
import { useState } from "react";
import toast from "react-hot-toast";

const Trabaja = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    especialidad: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 simulación envío
    console.log("CV enviado:", form);

    toast.success("Solicitud enviada correctamente 👌");

    // reset
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      especialidad: "",
      mensaje: "",
    });
  };

  return (
    <PublicLayout>

      <div className="max-w-3xl mx-auto">

        {/* CABECERA */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            👩‍⚕️ Trabaja con nosotros
          </h1>

          <p className="text-gray-600 mt-2">
            Buscamos profesionales comprometidos con la salud y el bienestar de los pacientes.
          </p>

        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow space-y-4"
        >

          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="especialidad"
            placeholder="Especialidad"
            value={form.especialidad}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="mensaje"
            placeholder="Cuéntanos sobre tu experiencia..."
            value={form.mensaje}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Enviar solicitud
          </button>

        </form>

      </div>

    </PublicLayout>
  );
};

export default Trabaja;