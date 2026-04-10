import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { getMisCitas, getTodasCitas } from "../api/citas";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // 🔥 lunes
  getDay,
  locales,
});

const Calendario = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const rol = localStorage.getItem("rol");

      let citas = [];

      if (rol === "ADMIN") {
        citas = await getTodasCitas();
      } else {
        citas = await getMisCitas();
      }

      // 🔥 DEBUG (puedes quitar luego)
      console.log("CITAS:", citas);

      const eventosFormateados = citas.map((cita) => {
        let color = "#3b82f6"; // azul por defecto

        if (cita.estado === "CONFIRMADA") color = "#22c55e"; // verde
        if (cita.estado === "PENDIENTE") color = "#eab308"; // amarillo
        if (cita.estado === "CANCELADA") color = "#ef4444"; // rojo

        return {
            title:
                rol === "ADMIN"
                    ? `${cita.medico?.nombre} - ${cita.paciente?.nombre}`
                    : `${cita.medico?.especialidad?.nombre} - ${cita.medico?.nombre}`,
            start: new Date(cita.fecha),
            end: new Date(new Date(cita.fecha).getTime() + 30 * 60000),
            color, // 🔥 IMPORTANTE
        };
        });

      setEventos(eventosFormateados);

    } catch (error) {
      console.error(error);
      toast.error("Error cargando calendario");
    }
  };

  return (
    <Layout>

      <div className="h-[80vh] bg-white p-4 rounded-xl shadow">

        <h1 className="text-xl font-bold mb-4">
          📅 Calendario de citas
        </h1>

        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          culture="es" // 🔥 idioma español
          messages={{
            today: "Hoy",
            previous: "Anterior",
            next: "Siguiente",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "No hay citas en este rango",
          }}
          // 🔥 AQUÍ EXACTAMENTE
  eventPropGetter={(event) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: "6px",
      color: "white",
      border: "none",
    },
  })}
        />

      </div>

    </Layout>
  );
};

export default Calendario;