import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";

const Clinica = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>

      <div className="max-w-6xl mx-auto space-y-12">

        {/* 🏥 SOBRE NOSOTROS */}
        <section>

          <h1 className="text-3xl font-bold mb-4 text-center">
            🏥 Nuestra Clínica
          </h1>

          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Somos una clínica médica comprometida con la salud y el bienestar de nuestros pacientes.
            Contamos con un equipo multidisciplinar altamente cualificado y tecnología moderna para ofrecer
            un servicio de calidad, cercano y profesional.
          </p>

        </section>

        {/* 📍 INFO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2">📍 Dirección</h2>
            <p className="text-gray-600">
                Avenida de Andalucía 15, 29007 Málaga, España
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2">📞 Contacto</h2>
            <p className="text-gray-600">
              Tel: +34 600 123 456 <br />
              Email: info@clinicavitalia.com
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2">🕒 Horario</h2>
            <p className="text-gray-600">
              Lunes a Viernes: 9:00 - 20:00 <br />
              Sábados: 10:00 - 14:00
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center justify-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Pedir cita
            </button>
          </div>

        </section>

        {/* 🗺️ MAPA */}
        <section>

          <h2 className="text-xl font-semibold mb-4">
            📍 Cómo llegar
          </h2>

          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow">

            <iframe
              title="mapa"
              src="https://www.google.com/maps?q=Avenida+de+Andalucía+15+Málaga&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>

          </div>

        </section>

      </div>

    </PublicLayout>
  );
};

export default Clinica;