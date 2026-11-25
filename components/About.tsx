
export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <p className="text-green-700 font-semibold">
            Sobre FinanSmart
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Una forma más sencilla de entender tus finanzas
          </h2>

          <p className="text-gray-600 mt-6 leading-relaxed">
            FinanSmart es una aplicación diseñada para ayudar a las
            personas a organizar sus finanzas personales. Su objetivo
            es facilitar el seguimiento de ingresos, gastos, presupuestos
            y metas de ahorro.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            A través de herramientas visuales y una interfaz sencilla,
            buscamos que los usuarios puedan consultar su información
            financiera y tomar decisiones más conscientes.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-5xl mb-5">🌱</div>

          <h3 className="text-2xl font-bold text-gray-900">
            Nuestra finalidad
          </h3>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Promover una mejor organización financiera mediante
            herramientas digitales accesibles, prácticas y fáciles
            de utilizar.
          </p>

          <div className="mt-6 border-l-4 border-green-600 pl-4">
            <p className="text-green-800 font-semibold">
              Organiza. Comprende. Avanza.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
