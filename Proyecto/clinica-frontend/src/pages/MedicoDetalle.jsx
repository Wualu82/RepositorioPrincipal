import { useParams, useNavigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import { useAuth } from "../context/AuthContext";
import { goToCitas } from "../utils/navigation";

// 🔥 MISMO ARRAY
const medicos = [
  {
    id: 1,
    nombre: "Juan Pérez",
    especialidad: "Cardiología",
    imagen: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Especialista en cardiología con más de 15 años de experiencia en el tratamiento de enfermedades cardiovasculares.",
    experiencia: "Hospital Universitario - 10 años | Clínica privada - 5 años",
  },
  {
    id: 2,
    nombre: "Marta López",
    especialidad: "Dermatología",
    imagen: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Dermatóloga experta en enfermedades cutáneas y tratamientos estéticos avanzados.",
    experiencia: "Centro Dermatológico - 8 años",
  },
  {
    id: 3,
    nombre: "Carlos Gómez",
    especialidad: "Traumatología",
    imagen: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "Especialista en lesiones deportivas y cirugía ortopédica.",
    experiencia: "Clínica deportiva - 12 años",
  },
  {
    id: 4,
    nombre: "Laura Sánchez",
    especialidad: "Pediatría",
    imagen: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Pediatra especializada en desarrollo infantil y vacunación.",
    experiencia: "Hospital infantil - 9 años",
  },
  {
    id: 5,
    nombre: "Antonio Ruiz",
    especialidad: "Neurología",
    imagen: "https://randomuser.me/api/portraits/men/12.jpg",
    bio: "Tratamiento de trastornos neurológicos y enfermedades degenerativas.",
    experiencia: "Unidad neurológica - 11 años",
  },
  {
    id: 6,
    nombre: "Elena Torres",
    especialidad: "Ginecología",
    imagen: "https://randomuser.me/api/portraits/women/25.jpg",
    bio: "Especialista en salud femenina y control del embarazo.",
    experiencia: "Clínica ginecológica - 10 años",
  },
  {
    id: 7,
    nombre: "David Navarro",
    especialidad: "Urología",
    imagen: "https://randomuser.me/api/portraits/men/77.jpg",
    bio: "Especialista en patologías del sistema urinario.",
    experiencia: "Hospital general - 13 años",
  },
  {
    id: 8,
    nombre: "Ana Martín",
    especialidad: "Endocrinología",
    imagen: "https://randomuser.me/api/portraits/women/15.jpg",
    bio: "Tratamiento de enfermedades hormonales como diabetes y tiroides.",
    experiencia: "Unidad endocrina - 9 años",
  },
  {
    id: 9,
    nombre: "Sergio Ramírez",
    especialidad: "Otorrinolaringología",
    imagen: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "Tratamiento de patologías de oído, nariz y garganta.",
    experiencia: "Centro ORL - 10 años",
  },
  {
    id: 10,
    nombre: "Lucía Fernández",
    especialidad: "Oftalmología",
    imagen: "https://randomuser.me/api/portraits/women/52.jpg",
    bio: "Especialista en salud visual y enfermedades oculares.",
    experiencia: "Clínica oftalmológica - 8 años",
  },
  {
    id: 11,
    nombre: "Javier Morales",
    especialidad: "Medicina general",
    imagen: "https://randomuser.me/api/portraits/men/29.jpg",
    bio: "Atención primaria y diagnóstico integral de pacientes.",
    experiencia: "Centro de salud - 14 años",
  },
  {
    id: 12,
    nombre: "Carmen Díaz",
    especialidad: "Enfermería",
    imagen: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Cuidados sanitarios, seguimiento y atención al paciente.",
    experiencia: "Hospital clínico - 12 años",
  },
];

const MedicoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth(); // 🔥 AÑADIDO

  const medico = medicos.find((m) => m.id === Number(id));

  if (!medico) {
    return <div>Médico no encontrado</div>;
  }

  return (
    <PublicLayout>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">

        {/* CABECERA */}
        <div className="flex flex-col md:flex-row gap-6 items-center">

          <img
            src={medico.imagen}
            alt={medico.nombre}
            className="w-48 h-48 object-cover rounded-xl"
          />

          <div>

            <h1 className="text-2xl font-bold">
              Dr. {medico.nombre}
            </h1>

            <p className="text-blue-600 font-semibold mb-2">
              {medico.especialidad}
            </p>

            <p className="text-gray-600">
              {medico.bio}
            </p>

          </div>

        </div>

        {/* EXPERIENCIA */}
        <div className="mt-6">

          <h2 className="text-xl font-semibold mb-2">
            Experiencia profesional
          </h2>

          <p className="text-gray-600">
            {medico.experiencia}
          </p>

        </div>

        {/* 🔥 BOTÓN CORREGIDO */}
        <div className="mt-6">

          <button
            onClick={() => goToCitas(navigate, token)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Pedir cita
          </button>

        </div>

      </div>

    </PublicLayout>
  );
};

export default MedicoDetalle;