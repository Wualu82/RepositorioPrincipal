import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { goToCitas } from "../utils/navigation";

const getRandomItems = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};

const Home = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // 🔥 AÑADIDO

  // 🔥 DATOS
  const servicios = [
    { nombre: "Cardiología", icono: "❤️" },
    { nombre: "Dermatología", icono: "🧴" },
    { nombre: "Pediatría", icono: "👶" },
    { nombre: "Traumatología", icono: "🦴" },
    { nombre: "Neurología", icono: "🧠" },
    { nombre: "Ginecología", icono: "🩺" },
    { nombre: "Oftalmología", icono: "👁️" },
    { nombre: "Medicina general", icono: "🩺" },
    { nombre: "Otorrinolaringología", icono: "👂" },
    { nombre: "Urología", icono: "💧" },
    { nombre: "Endocrinología", icono: "⚖️" },
    { nombre: "Enfermería", icono: "💉" },
  ];

  const medicos = [
    { id: 1, nombre: "Juan Pérez", imagen: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, nombre: "Marta López", imagen: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, nombre: "Carlos Gómez", imagen: "https://randomuser.me/api/portraits/men/65.jpg" },
    { id: 4, nombre: "Laura Sánchez", imagen: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 5, nombre: "Antonio Ruiz", imagen: "https://randomuser.me/api/portraits/men/12.jpg" },
    { id: 6, nombre: "Elena Torres", imagen: "https://randomuser.me/api/portraits/women/25.jpg" },
    { id: 7, nombre: "David Navarro", imagen: "https://randomuser.me/api/portraits/men/77.jpg" },
    { id: 8, nombre: "Ana Martín", imagen: "https://randomuser.me/api/portraits/women/15.jpg" },
    { id: 9, nombre: "Sergio Ramírez", imagen: "https://randomuser.me/api/portraits/men/45.jpg" },
    { id: 10, nombre: "Lucía Fernández", imagen: "https://randomuser.me/api/portraits/women/52.jpg" },
    { id: 11, nombre: "Javier Morales", imagen: "https://randomuser.me/api/portraits/men/29.jpg" },
    { id: 12, nombre: "Carmen Díaz", imagen: "https://randomuser.me/api/portraits/women/33.jpg" },
  ];

  // 🔥 RANDOM
  const [serviciosList] = useState(getRandomItems(servicios));
  const [medicosList] = useState(getRandomItems(medicos));

  // 🔥 INDICES
  const [servicioIndex, setServicioIndex] = useState(0);
  const [medicoIndex, setMedicoIndex] = useState(0);

  const next = (list, index, setIndex) => {
    if (index + 3 < list.length) setIndex(index + 1);
  };

  const prev = (index, setIndex) => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <PublicLayout>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">
          Tu salud en las mejores manos
        </h1>

        {/* 🔥 BOTÓN CORREGIDO */}
        <button
          onClick={() => goToCitas(navigate, token)}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg"
        >
          Pedir cita
        </button>
      </motion.section>

      {/* 🏥 SERVICIOS */}
      <section className="mb-12 relative">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Nuestros servicios
        </h2>

        <button
          onClick={() => prev(servicioIndex, setServicioIndex)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          ←
        </button>

        <div className="grid grid-cols-3 gap-6 px-10">

          {serviciosList.slice(servicioIndex, servicioIndex + 3).map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/servicios")}
              className="bg-white p-6 rounded-xl shadow cursor-pointer text-center"
            >
              <div className="text-3xl mb-2">{s.icono}</div>
              <h3>{s.nombre}</h3>
            </motion.div>
          ))}

        </div>

        <button
          onClick={() => next(serviciosList, servicioIndex, setServicioIndex)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          →
        </button>

      </section>

      {/* 👨‍⚕️ EQUIPO */}
      <section className="mb-12 relative">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Nuestro equipo
        </h2>

        <button
          onClick={() => prev(medicoIndex, setMedicoIndex)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          ←
        </button>

        <div className="grid grid-cols-3 gap-6 px-10">

          {medicosList.slice(medicoIndex, medicoIndex + 3).map((m) => (
            <motion.div
              key={m.id}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/equipo/${m.id}`)}
              className="bg-white p-4 rounded-xl shadow cursor-pointer text-center"
            >
              <img
                src={m.imagen}
                className="w-20 h-20 mx-auto rounded-full mb-3"
              />
              <h3>Dr. {m.nombre}</h3>
            </motion.div>
          ))}

        </div>

        <button
          onClick={() => next(medicosList, medicoIndex, setMedicoIndex)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          →
        </button>

      </section>

    </PublicLayout>
  );
};

export default Home;