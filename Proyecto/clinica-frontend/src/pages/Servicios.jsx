import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { goToCitas } from "../utils/navigation";

const servicios = [
  {
    nombre: "Cardiología",
    descripcion:
      "Especialidad médica encargada del diagnóstico, tratamiento y prevención de enfermedades cardiovasculares. Incluye estudios como electrocardiogramas, ecocardiogramas y seguimiento de patologías como hipertensión, arritmias o insuficiencia cardíaca.",
    icono: "❤️",
  },
  {
    nombre: "Dermatología",
    descripcion:
      "Atención integral de la piel, cabello y uñas. Tratamos patologías como acné, dermatitis, psoriasis y realizamos chequeos dermatológicos preventivos para la detección temprana de lesiones cutáneas.",
    icono: "🧴",
  },
  {
    nombre: "Pediatría",
    descripcion:
      "Cuidado médico especializado para bebés, niños y adolescentes. Incluye revisiones periódicas, control del crecimiento, vacunación y tratamiento de enfermedades infantiles.",
    icono: "👶",
  },
  {
    nombre: "Traumatología",
    descripcion:
      "Diagnóstico y tratamiento de lesiones del aparato locomotor como fracturas, esguinces, lesiones deportivas y patologías articulares o musculares.",
    icono: "🦴",
  },
  {
    nombre: "Neurología",
    descripcion:
      "Tratamiento de enfermedades del sistema nervioso como migrañas, epilepsia, Parkinson o trastornos neurológicos. Evaluaciones clínicas y seguimiento especializado.",
    icono: "🧠",
  },
  {
    nombre: "Ginecología",
    descripcion:
      "Atención médica integral para la salud femenina. Revisiones periódicas, control del embarazo, planificación familiar y diagnóstico de patologías ginecológicas.",
    icono: "🩺",
  },
  {
    nombre: "Oftalmología",
    descripcion:
      "Diagnóstico y tratamiento de problemas visuales. Revisiones de la vista, control de enfermedades oculares y adaptación de lentes.",
    icono: "👁️",
  },
  {
    nombre: "Medicina general",
    descripcion:
      "Atención médica primaria para el diagnóstico inicial de cualquier patología. Derivación a especialistas y seguimiento general del paciente.",
    icono: "🩺",
  },
  {
    nombre: "Otorrinolaringología",
    descripcion:
      "Especialidad encargada del diagnóstico y tratamiento de enfermedades del oído, nariz y garganta. Incluye problemas auditivos, sinusitis, infecciones y trastornos respiratorios.",
    icono: "👂",
  },
  {
    nombre: "Urología",
    descripcion:
      "Diagnóstico y tratamiento de enfermedades del sistema urinario en hombres y mujeres, así como del sistema reproductor masculino. Incluye infecciones, cálculos renales y revisiones urológicas.",
    icono: "💧",
  },
  {
    nombre: "Endocrinología",
    descripcion:
      "Especialidad dedicada al estudio y tratamiento de trastornos hormonales como diabetes, problemas de tiroides, obesidad y metabolismo.",
    icono: "⚖️",
  },
  {
    nombre: "Enfermería",
    descripcion:
      "Servicios de apoyo sanitario como curas, control de constantes, administración de medicación y seguimiento de pacientes bajo supervisión médica.",
    icono: "💉",
  },
];

const Servicios = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // 🔥 AÑADIDO

  return (
    <PublicLayout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">
          🏥 Nuestros Servicios
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Contamos con un equipo multidisciplinar que ofrece atención médica de calidad en diferentes especialidades.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex gap-4"
            >

              {/* ICONO */}
              <div className="text-4xl">
                {servicio.icono}
              </div>

              {/* TEXTO */}
              <div>

                <h2 className="text-xl font-semibold mb-2">
                  {servicio.nombre}
                </h2>

                <p className="text-gray-600 mb-4">
                  {servicio.descripcion}
                </p>

                {/* 🔥 BOTÓN CORREGIDO */}
                <button
                  onClick={() => goToCitas(navigate, token)}
                  className="text-blue-600 hover:underline"
                >
                  Pedir cita →
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </PublicLayout>
  );
};

export default Servicios;