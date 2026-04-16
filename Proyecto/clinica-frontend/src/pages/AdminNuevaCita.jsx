import { useEffect, useState } from "react";
import { getMedicos } from "../api/medicos";
import { getPacientes } from "../api/pacientes";
import { crearCita } from "../api/citas";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const AdminNuevaCita = () => {

  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const [medicoId, setMedicoId] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    const cargar = async () => {
      setMedicos(await getMedicos());
      setPacientes(await getPacientes());
    };

    cargar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearCita({ medicoId, pacienteId, fecha });
      toast.success("Cita creada correctamente");
    } catch (error) {
      toast.error("Error al crear cita");
    }
  };

  return (
    <Layout>

      <div className="max-w-md mx-auto">

        <h1 className="text-xl font-bold mb-4">
          🧑‍⚕️ Nueva cita (Admin)
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* PACIENTE */}
          <select
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccionar paciente</option>
            {pacientes.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>

          {/* MÉDICO */}
          <select
            value={medicoId}
            onChange={(e) => setMedicoId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccionar médico</option>
            {medicos.map(m => (
              <option key={m.id} value={m.id}>
                {m.nombre} {m.apellido}
              </option>
            ))}
          </select>

          {/* FECHA */}
          <input
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button className="w-full bg-blue-600 text-white p-2 rounded">
            Crear cita
          </button>

        </form>

      </div>

    </Layout>
  );
};

export default AdminNuevaCita;