import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 🏥 CLÍNICA */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            🏥 Revitalia
          </h2>
          <p className="text-gray-400">
            Atención médica profesional con un equipo especializado y comprometido con tu salud.
          </p>
        </div>

        {/* 🔗 ENLACES */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Enlaces
          </h2>

          <ul className="space-y-2 text-gray-400">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/equipo">Equipo</Link></li>
            <li><Link to="/clinica">La clínica</Link></li>
            <li><Link to="/trabaja">Trabaja con nosotros</Link></li>
          </ul>
        </div>

        {/* 📞 CONTACTO */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Contacto
          </h2>

          <p className="text-gray-400">
            Avenida de Andalucía 15<br />
            29007 Málaga, España<br /><br />
            📞 +34 600 123 456<br />
            ✉️ info@clinica.com
          </p>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-500 text-sm pb-4">
        © {new Date().getFullYear()} Clínica. Todos los derechos reservados.
      </div>

    </footer>
  );
};

export default Footer;