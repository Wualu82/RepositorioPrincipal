import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { goToCitas } from "../utils/navigation";
import { getMedicos } from "../api/medicos";

const getRandomItems = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};

const Home = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  // 🔥 SERVICIOS (OK)
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

  // 🔥 MEDICOS DESDE BACKEND
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const data = await getMedicos();
        setMedicos(getRandomItems(data)); // 🔥 random aquí
      } catch (error) {
        console.error("Error cargando médicos:", error);
      }
    };

    fetchMedicos();
  }, []);

  // 🔥 SERVICIOS RANDOM
  const [serviciosList] = useState(getRandomItems(servicios));

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

          {medicos.slice(medicoIndex, medicoIndex + 3).map((m) => (
            <motion.div
              key={m.id}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/equipo/${m.id}`)}
              className="bg-white p-4 rounded-xl shadow cursor-pointer text-center"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${m.nombre}+${m.apellido}&background=0D8ABC&color=fff`}
                className="w-20 h-20 mx-auto rounded-full mb-3"
              />

              <h3>
                Dr. {m.nombre} {m.apellido}
              </h3>

              <p className="text-sm text-gray-500">
                {m.especialidad?.nombre || m.especialidad}
              </p>
            </motion.div>
          ))}

        </div>

        <button
          onClick={() => next(medicos, medicoIndex, setMedicoIndex)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          →
        </button>

      </section>

    </PublicLayout>
  );
};

export default Home;