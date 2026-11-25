const steps = [
  {
    number: "01",
    title: "Registra tus movimientos",
    description:
      "Agrega tus ingresos y gastos para mantener un registro de tu actividad financiera.",
    icon: "📝",
  },
  {
    number: "02",
    title: "Organiza tu dinero",
    description:
      "Clasifica tus movimientos, establece presupuestos y consulta tus estadísticas.",
    icon: "📊",
  },
  {
    number: "03",
    title: "Alcanza tus objetivos",
    description:
      "Define metas de ahorro y revisa tu progreso para tomar mejores decisiones.",
    icon: "🎯",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-green-700 font-semibold">
            Fácil de utilizar
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            ¿Cómo funciona FinanSmart?
          </h2>

          <p className="text-gray-600 mt-4">
            Comienza a organizar tus finanzas siguiendo tres sencillos pasos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{step.icon}</span>

                <span className="text-green-700 font-bold text-lg">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
