
const features = [
  {
    number: "01",
    title: "Control de ingresos y gastos",
    description:
      "Registra tus ingresos y gastos para conocer cómo administras tu dinero.",
    icon: "💰",
  },
  {
    number: "02",
    title: "Presupuestos mensuales",
    description:
      "Organiza tu dinero mediante presupuestos y controla tus gastos.",
    icon: "📊",
  },
  {
    number: "03",
    title: "Estadísticas financieras",
    description:
      "Visualiza información sobre tus movimientos financieros mediante gráficos.",
    icon: "📈",
  },
  {
    number: "04",
    title: "Metas de ahorro",
    description:
      "Define objetivos de ahorro y consulta tu progreso para alcanzarlos.",
    icon: "🎯",
  },
];

export default function Features() {
  return (
    <section id="funciones" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-green-700 font-semibold">
            ¿Qué puedes hacer?
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Todo lo que necesitas para organizar tus finanzas
          </h2>

          <p className="text-gray-600 mt-4">
            FinanSmart reúne herramientas que te ayudan a comprender
            y administrar mejor tu dinero.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="p-7 rounded-2xl border border-gray-200 bg-white hover:shadow-xl hover:border-green-400 hover:-translate-y-1 transition duration-300"
            >
              <span className="text-4xl">{feature.icon}</span>

              <p className="text-sm text-green-700 font-semibold mt-6">
                {feature.number}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
