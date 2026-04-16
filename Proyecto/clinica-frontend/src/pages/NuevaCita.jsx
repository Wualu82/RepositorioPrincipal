import { useState, useEffect } from "react";
import { crearCita, getHorasDisponibles } from "../api/citas";
import { getMedicos } from "../api/medicos";
import { getPacientes } from "../api/pacientes";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const NuevaCita = () => {
  const [medicoId, setMedicoId] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [fecha, setFecha] = useState("");
  const [horas, setHoras] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const { usuario } = useAuth();
  const navigate = useNavigate();

  // 🔥 CARGAR DATOS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicosData = await getMedicos();
        setMedicos(medicosData);

        if (usuario?.rol === "ADMIN") {
          const pacientesData = await getPacientes();
          setPacientes(pacientesData);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error cargando datos");
      }
    };

    fetchData();
  }, [usuario]);

  // 🔥 HORAS DISPONIBLES
  useEffect(() => {
    if (medicoId && fecha) {
      cargarHoras();
    }
  }, [medicoId, fecha]);

  const cargarHoras = async () => {
    try {
      const data = await getHorasDisponibles(medicoId, fecha);
      setHoras(data);
      setHoraSeleccionada("");
    } catch (error) {
      console.error(error);
      toast.error("Error cargando horarios");
    }
  };

  // 🔥 SUBMIT CORREGIDO
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 👑 VALIDACIÓN ADMIN
    if (usuario?.rol === "ADMIN" && !pacienteId) {
      toast.error("Debes seleccionar un paciente");
      return;
    }

    const fechaCompleta = `${fecha}T${horaSeleccionada}`;

    const payload = {
      medicoId: Number(medicoId),
      fecha: fechaCompleta,
      pacienteId:
        usuario?.rol === "ADMIN" && pacienteId
          ? Number(pacienteId)
          : null,
    };

    console.log("📦 PAYLOAD:", payload); // 🔥 DEBUG

    try {
      await crearCita(payload);

      toast.success("Cita creada correctamente");
      navigate("/citas");

    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Error al crear cita"
      );
    }
  };

  return (
    <Layout>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-xl font-bold mb-4">
          ➕ Nueva cita
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 👑 PACIENTE SOLO ADMIN */}
          {usuario?.rol === "ADMIN" && (
            <select
              className="w-full border p-2 rounded"
              value={pacienteId}
              onChange={(e) => setPacienteId(e.target.value)}
            >
              <option value="">Selecciona paciente</option>

              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} {p.apellido}
                </option>
              ))}
            </select>
          )}

          {/* MÉDICO */}
          <select
            className="w-full border p-2 rounded"
            value={medicoId}
            onChange={(e) => setMedicoId(e.target.value)}
            required
          >
            <option value="">Selecciona médico</option>

            {medicos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.especialidad?.nombre} — {m.nombre} {m.apellido}
              </option>
            ))}
          </select>

          {/* FECHA */}
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />

          {/* HORAS */}
          <div className="grid grid-cols-3 gap-2">

            {horas.map((hora) => (
              <button
                type="button"
                key={hora}
                onClick={() => setHoraSeleccionada(hora)}
                className={`p-2 rounded border transition ${
                  horaSeleccionada === hora
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {hora.slice(0, 5)}
              </button>
            ))}

          </div>

          {/* SIN HORAS */}
          {horas.length === 0 && medicoId && fecha && (
            <p className="text-red-500 text-sm">
              No hay horas disponibles para este día
            </p>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={
              !horaSeleccionada ||
              !medicoId ||
              (usuario?.rol === "ADMIN" && !pacienteId)
            }
            className={`w-full py-2 rounded ${
              horaSeleccionada
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Crear cita
          </button>

        </form>

      </div>

    </Layout>
  );
};

export default NuevaCita;