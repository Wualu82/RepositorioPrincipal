import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-12 border-t">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 🏥 CLÍNICA */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-primary">
            🏥 Clínica Vitalia
          </h2>
          <p className="text-gray-600">
            Atención médica profesional con un equipo especializado y comprometido con tu salud.
          </p>
        </div>

        {/* 🔗 ENLACES */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-primary">
            Enlaces
          </h2>

          <ul className="space-y-2 text-gray-600">
            <li><Link to="/" className="hover:text-primary transition">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-primary transition">Servicios</Link></li>
            <li><Link to="/equipo" className="hover:text-primary transition">Equipo</Link></li>
            <li><Link to="/clinica" className="hover:text-primary transition">La clínica</Link></li>
            <li><Link to="/trabaja" className="hover:text-primary transition">Trabaja con nosotros</Link></li>
          </ul>
        </div>

        {/* 📞 CONTACTO */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-primary">
            Contacto
          </h2>

          <p className="text-gray-600">
            Avenida de Andalucía 15<br />
            29007 Málaga, España<br /><br />
            📞 +34 600 123 456<br />
            ✉️ info@clinicavitalia.com
          </p>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-500 text-sm pb-4">
        © {new Date().getFullYear()} Clínica Vitalia. Todos los derechos reservados.
      </div>

    </footer>
  );
};

export default Footer;