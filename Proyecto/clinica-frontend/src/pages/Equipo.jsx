import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { goToCitas } from "../utils/navigation";
import { useEffect, useState } from "react";
import { getMedicos } from "../api/medicos";
import { medicosBio } from "../data/medicosBio"; // 🔥 NUEVO

const Equipo = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const data = await getMedicos();
        console.log("🔥 MEDICOS:", data);
        setMedicos(data);
      } catch (error) {
        console.error("Error cargando médicos:", error);
      }
    };

    fetchMedicos();
  }, []);

  return (
    <PublicLayout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">
          👨‍⚕️ Nuestro Equipo Médico
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Contamos con un equipo de profesionales altamente cualificados comprometidos con tu salud.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {medicos.map((medico) => {
            const bio = medicosBio[medico.id]; // 🔥 NUEVO

            return (
              <div
                key={medico.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition"
              >

                {/* CLICK TARJETA */}
                <div
                  onClick={() => navigate(`/equipo/${medico.id}`)}
                  className="cursor-pointer"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${medico.nombre}+${medico.apellido}&background=0D8ABC&color=fff`}
                    alt={medico.nombre}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />

                  <div className="p-4 text-center">
                    <h2 className="font-semibold text-lg">
                      Dr. {medico.nombre} {medico.apellido}
                    </h2>

                    <p className="text-gray-500">
                      {medico.especialidad?.nombre || medico.especialidad}
                    </p>

                    {/* 🔥 BIO */}
                    {bio && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* BOTÓN */}
                <div className="px-4 pb-4 text-center">
                  <button
                    onClick={() => goToCitas(navigate, token)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Pedir cita
                  </button>
                </div>

              </div>
            );
          })}

        </div>

      </div>

    </PublicLayout>
  );
};

export default Equipo;