
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700">
          FinanSmart
        </Link>

        {/* Enlaces */}
        <div className="hidden md:flex items-center gap-8 text-gray-600">
          <Link href="/" className="hover:text-green-700">
            Inicio
          </Link>

          <Link href="#funciones" className="hover:text-green-700">
            Funciones
          </Link>

          <Link href="#nosotros" className="hover:text-green-700">
            Nosotros
          </Link>
        </div>

        {/* Botón */}
        <Link
          href="#funciones"
          className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
        >
          Explorar
        </Link>

      </div>
    </nav>
  );
}
