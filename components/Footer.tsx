
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-8">

          <div>
            <h2 className="text-2xl font-bold text-green-400">
              FinanSmart
            </h2>

            <p className="text-gray-400 mt-4 max-w-md">
              Una herramienta digital para organizar tus finanzas,
              controlar tus gastos y trabajar en tus metas de ahorro.
            </p>
          </div>

          <div className="md:text-right">
            <h3 className="font-semibold text-lg">
              Navegación
            </h3>

            <div className="flex flex-col md:items-end gap-3 mt-4">
              <Link href="/" className="text-gray-400 hover:text-white">
                Inicio
              </Link>

              <Link href="#funciones" className="text-gray-400 hover:text-white">
                Funciones
              </Link>

              <Link href="#nosotros" className="text-gray-400 hover:text-white">
                Nosotros
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 FinanSmart. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
