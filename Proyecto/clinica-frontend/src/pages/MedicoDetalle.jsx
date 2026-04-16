import { useParams, useNavigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import { useAuth } from "../context/AuthContext";
import { goToCitas } from "../utils/navigation";
import { useEffect, useState } from "react";
import { getMedicoById } from "../api/medicos";
import { medicosBio } from "../data/medicosBio";

const MedicoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [medico, setMedico] = useState(null);

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const data = await getMedicoById(id);
        setMedico(data);
      } catch (error) {
        console.error("Error cargando médico:", error);
      }
    };

    fetchMedico();
  }, [id]);

  if (!medico) {
    return (
      <PublicLayout>
        <p className="text-center mt-10">Cargando médico...</p>
      </PublicLayout>
    );
  }

  const bio = medicosBio[medico.id];

  return (
    <PublicLayout>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">

        {/* CABECERA */}
        <div className="flex flex-col md:flex-row gap-6 items-center">

          <img
            src={`https://ui-avatars.com/api/?name=${medico.nombre}+${medico.apellido}&background=0D8ABC&color=fff`}
            alt={medico.nombre}
            className="w-full md:w-64 h-48 object-cover rounded-xl"
          />

          <div>

            <h1 className="text-2xl font-bold">
              Dr. {medico.nombre} {medico.apellido}
            </h1>

            <p className="text-blue-600 font-semibold mb-3">
              {medico.especialidad?.nombre || medico.especialidad}
            </p>

            {/* 🔥 BIO COMPLETA */}
            <p className="text-gray-600 leading-relaxed">
              {bio || "Información no disponible"}
            </p>

          </div>

        </div>

        {/* BOTÓN */}
        <div className="mt-6 text-center">

          <button
            onClick={() => goToCitas(navigate, token)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Pedir cita
          </button>

        </div>

      </div>

    </PublicLayout>
  );
};

export default MedicoDetalle;