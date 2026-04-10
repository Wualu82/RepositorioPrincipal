import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>

      {/* HERO */}
      <div className="text-center py-20">

        <h1 className="text-4xl font-bold mb-4">
          Tu salud, nuestra prioridad
        </h1>

        <p className="text-gray-600 mb-6">
          Atención médica profesional con los mejores especialistas
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Pedir cita
        </button>

      </div>

    </PublicLayout>
  );
};

export default Home;