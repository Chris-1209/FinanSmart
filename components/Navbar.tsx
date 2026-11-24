"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-green-700"
          onClick={() => setMenuOpen(false)}
        >
          FinanSmart
        </Link>

        {/* Enlaces para computadora */}
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

          <Link href="#preguntas" className="hover:text-green-700">
            Preguntas
          </Link>
        </div>

        {/* Botón para computadora */}
        
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-green-700 font-medium px-4 py-2 hover:text-green-900 transition"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/register"
            className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Crear cuenta
          </Link>
        </div>

        {/* Botón del menú móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 text-2xl"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Menú desplegable */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 px-6 py-4 bg-white flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-green-700"
          >
            Inicio
          </Link>

          <Link
            href="#funciones"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-green-700"
          >
            Funciones
          </Link>

          <Link
            href="#nosotros"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-green-700"
          >
            Nosotros
          </Link>

          <Link
            href="#preguntas"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-green-700"
          >
            Preguntas
          </Link>

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-green-700"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="bg-green-700 text-white text-center py-2 rounded-lg hover:bg-green-800 transition"
          >
            Crear cuenta
          </Link>
    
        </div>
      )}
    </nav>
  );
}
