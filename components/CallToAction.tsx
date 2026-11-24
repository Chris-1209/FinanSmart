
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-green-800 py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Comienza a organizar tus finanzas
        </h2>

        <p className="text-green-100 mt-5 max-w-2xl mx-auto">
          Con FinanSmart puedes tener una visión más clara de tus
          ingresos, gastos y objetivos de ahorro.
        </p>

        <Link
          href="/register"
          className="inline-block mt-8 bg-white text-green-800 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition"
        >
          Crear cuenta
        </Link>

      </div>
    </section>
  );
}
