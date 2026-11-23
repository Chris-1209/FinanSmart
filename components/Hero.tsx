
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Texto principal */}
        <div>
          <p className="text-green-700 font-semibold mb-4">
            Tus finanzas, bajo control
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Toma el control de tu dinero con{" "}
            <span className="text-green-700">FinanSmart</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Organiza tus ingresos, controla tus gastos y alcanza
            tus metas de ahorro desde un solo lugar.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#funciones"
              className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
            >
              Conocer funciones
            </Link>

            <Link
              href="#nosotros"
              className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition"
            >
              Conócenos
            </Link>
          </div>
        </div>

        {/* Tarjeta ilustrativa */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <p className="text-gray-500 font-medium">
            Resumen financiero
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            $2.450.000
          </h2>

          <p className="text-sm text-gray-500">
            Saldo disponible (datos ilustrativos)
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Ingresos</p>
              <p className="text-xl font-bold text-green-700 mt-2">
                $3.000.000
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Gastos</p>
              <p className="text-xl font-bold text-red-600 mt-2">
                $550.000
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
