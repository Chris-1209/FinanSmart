
const benefits = [
  {
    icon: "🧭",
    title: "Mayor organización",
    description:
      "Mantén tus ingresos y gastos organizados en un mismo lugar.",
  },
  {
    icon: "🔎",
    title: "Información clara",
    description:
      "Consulta tus movimientos y comprende mejor cómo utilizas tu dinero.",
  },
  {
    icon: "🎯",
    title: "Objetivos definidos",
    description:
      "Establece metas de ahorro y lleva un seguimiento de tu progreso.",
  },
];

export default function Benefits() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-green-700 font-semibold">
            ¿Por qué FinanSmart?
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Organizar tus finanzas puede ser más sencillo
          </h2>

          <p className="text-gray-600 mt-4">
            Queremos ofrecerte una experiencia práctica para
            consultar y organizar tu información financiera.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-green-50 hover:bg-green-100 transition duration-300"
            >
              <span className="text-5xl">
                {benefit.icon}
              </span>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                {benefit.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
