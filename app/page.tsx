
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-6">

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bienvenido a FinanSmart
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Administra tus finanzas de manera inteligente,
            organiza tus gastos y toma mejores decisiones
            para tu futuro financiero.
          </p>

          <button className="mt-8 bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition">
            Comenzar ahora
          </button>

        </div>
      </section>
    </main>
  );
}
