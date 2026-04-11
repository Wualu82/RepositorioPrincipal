import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { goToCitas } from "../utils/navigation";

const medicos = [
  {
    id: 1,
    nombre: "Juan Pérez",
    especialidad: "Cardiología",
    imagen: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    nombre: "Marta López",
    especialidad: "Dermatología",
    imagen: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    nombre: "Carlos Gómez",
    especialidad: "Traumatología",
    imagen: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 4,
    nombre: "Laura Sánchez",
    especialidad: "Pediatría",
    imagen: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    nombre: "Antonio Ruiz",
    especialidad: "Neurología",
    imagen: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 6,
    nombre: "Elena Torres",
    especialidad: "Ginecología",
    imagen: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    id: 7,
    nombre: "David Navarro",
    especialidad: "Urología",
    imagen: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    id: 8,
    nombre: "Ana Martín",
    especialidad: "Endocrinología",
    imagen: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    id: 9,
    nombre: "Sergio Ramírez",
    especialidad: "Otorrinolaringología",
    imagen: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 10,
    nombre: "Lucía Fernández",
    especialidad: "Oftalmología",
    imagen: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: 11,
    nombre: "Javier Morales",
    especialidad: "Medicina general",
    imagen: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    id: 12,
    nombre: "Carmen Díaz",
    especialidad: "Enfermería",
    imagen: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

const Equipo = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // 🔥 AÑADIDO

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

          {medicos.map((medico) => (
            <div
              key={medico.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition"
            >

              {/* CLICK SOLO EN TARJETA */}
              <div
                onClick={() => navigate(`/equipo/${medico.id}`)}
                className="cursor-pointer"
              >
                <img
                  src={medico.imagen}
                  alt={medico.nombre}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />

                <div className="p-4 text-center">
                  <h2 className="font-semibold text-lg">
                    Dr. {medico.nombre}
                  </h2>

                  <p className="text-gray-500">
                    {medico.especialidad}
                  </p>
                </div>
              </div>

              {/* 🔥 BOTÓN */}
              <div className="px-4 pb-4 text-center">
                <button
                  onClick={() => goToCitas(navigate, token)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Pedir cita
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

    </PublicLayout>
  );
};

export default Equipo;