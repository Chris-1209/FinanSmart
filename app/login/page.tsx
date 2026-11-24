"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Usuario = { nombre: string; email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const usuarios: Usuario[] = JSON.parse(
      localStorage.getItem("usuarios") ?? "[]"
    );

    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!usuario) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    localStorage.setItem(
      "sesion",
      JSON.stringify({ nombre: usuario.nombre, email: usuario.email })
    );
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 border border-gray-700 rounded-xl p-6"
      >
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-600 rounded p-2 bg-transparent"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-600 rounded p-2 bg-transparent"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 rounded p-2 font-semibold"
        >
          Entrar
        </button>

        <p className="text-sm text-center">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="underline">
            Regístrate
          </Link>
        </p>
      </form>
    </main>
  );
}