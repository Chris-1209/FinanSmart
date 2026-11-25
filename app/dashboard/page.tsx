"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

type TipoMovimiento = "ingreso" | "gasto";

interface Movimiento {
  id: number;
  titulo: string;
  monto: number;
  tipo: TipoMovimiento;
  categoria: string;
  fecha: string;
}

const STORAGE_KEYS = {
  presupuesto: "finansmart_presupuesto_mensual",
  meta: "finansmart_meta_ahorro",
  ahorro: "finansmart_ahorro_actual",
};

const COLORES_CATEGORIA: Record<string, string> = {
  Alimentación: "#0D8A38",
  Transporte: "#16A34A",
  Hogar: "#2563EB",
  Educación: "#D97706",
  Entretenimiento: "#9333EA",
};

export default function DashboardPage() {
  const [userId, setUserId] = useState<number | null>(null);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [cargando, setCargando] = useState(true);

  const [presupuestoMensual, setPresupuestoMensual] = useState<number>(1200000);
  const [metaAhorro, setMetaAhorro] = useState<number>(2000000);
  const [ahorroActual, setAhorroActual] = useState<number>(850000);
  const [preferenciasListas, setPreferenciasListas] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState<TipoMovimiento>("gasto");
  const [categoria, setCategoria] = useState("Alimentación");

  // 1. Cargar movimientos y userId autenticado desde PostgreSQL
  useEffect(() => {
    async function cargarMovimientos() {
      try {
        const res = await fetch("/api/movements", { cache: "no-store" });
        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setUserId(data.userId);
          setMovimientos(data.movements || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    }
    cargarMovimientos();
  }, []);

  // 2. Cargar presupuesto y metas guardadas para este usuario
  useEffect(() => {
    if (!userId) return;
    try {
      const savedPresupuesto = localStorage.getItem(
        `${STORAGE_KEYS.presupuesto}_${userId}`
      );
      const savedMeta = localStorage.getItem(`${STORAGE_KEYS.meta}_${userId}`);
      const savedAhorro = localStorage.getItem(
        `${STORAGE_KEYS.ahorro}_${userId}`
      );

      if (savedPresupuesto !== null && !isNaN(Number(savedPresupuesto))) {
        setPresupuestoMensual(Number(savedPresupuesto));
      }
      if (savedMeta !== null && !isNaN(Number(savedMeta))) {
        setMetaAhorro(Number(savedMeta));
      }
      if (savedAhorro !== null && !isNaN(Number(savedAhorro))) {
        setAhorroActual(Number(savedAhorro));
      }
    } catch (err) {
      console.error("Error leyendo localStorage:", err);
    } finally {
      setPreferenciasListas(true);
    }
  }, [userId]);

  // 3. Guardar cambios de presupuesto y metas para este usuario
  useEffect(() => {
    if (!preferenciasListas || !userId) return;
    try {
      localStorage.setItem(
        `${STORAGE_KEYS.presupuesto}_${userId}`,
        String(presupuestoMensual)
      );
      localStorage.setItem(`${STORAGE_KEYS.meta}_${userId}`, String(metaAhorro));
      localStorage.setItem(
        `${STORAGE_KEYS.ahorro}_${userId}`,
        String(ahorroActual)
      );
    } catch (err) {
      console.error("Error guardando en localStorage:", err);
    }
  }, [presupuestoMensual, metaAhorro, ahorroActual, preferenciasListas, userId]);

  const totalIngresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((acc, m) => acc + Number(m.monto), 0);

  const totalGastos = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((acc, m) => acc + Number(m.monto), 0);

  const balance = totalIngresos - totalGastos;

  const porcentajePresupuesto = Math.min(
    100,
    Math.round((totalGastos / (presupuestoMensual || 1)) * 100)
  );

  const porcentajeMeta = Math.min(
    100,
    Math.round((ahorroActual / (metaAhorro || 1)) * 100)
  );

  const gastosPorCategoria = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce<Record<string, number>>((acc, m) => {
      acc[m.categoria] = (acc[m.categoria] || 0) + Number(m.monto);
      return acc;
    }, {});

  const entradasCategoria = Object.entries(gastosPorCategoria);

  const radio = 42;
  const circunferencia = 2 * Math.PI * radio;
  let acumuladoOffset = 0;

  async function agregarMovimiento(e: FormEvent) {
    e.preventDefault();
    const valor = Number(monto);
    if (!titulo.trim() || isNaN(valor) || valor <= 0) return;

    const res = await fetch("/api/movements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: titulo.trim(),
        monto: valor,
        tipo,
        categoria: tipo === "ingreso" ? "Ingresos" : categoria,
        fecha: "Hoy",
      }),
    });

    if (res.ok) {
      const creado: Movimiento = await res.json();
      setMovimientos((prev) => [creado, ...prev]);
      setTitulo("");
      setMonto("");
    }
  }

  async function eliminarMovimiento(id: number) {
    const res = await fetch(`/api/movements?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setMovimientos((prev) => prev.filter((m) => m.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F9F7] text-[#0F172A]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#0D8A38]">
            FinanSmart
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
            <Link href="/" className="hover:text-[#0D8A38] transition">
              Inicio
            </Link>
            <span className="font-semibold text-[#0D8A38]">Panel financiero</span>
          </nav>

          <Link
            href="/login"
            className="text-sm font-medium text-[#0D8A38] border border-[#0D8A38]/30 hover:bg-[#EEFAF0] px-4 py-2 rounded-lg transition"
          >
            Cerrar sesión
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#0D8A38]">
              Tus finanzas, bajo control
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] mt-1">
              Panel financiero
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Consulta tu saldo disponible, registra movimientos y haz seguimiento a tus metas.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-slate-500">Saldo disponible</p>
            <p className="text-3xl font-bold text-[#0F172A] mt-2">
              ${balance.toLocaleString("es-CO")}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Balance neto entre ingresos y gastos
            </p>
          </div>

          <div className="bg-[#EEFAF0] rounded-2xl p-6 border border-emerald-100">
            <p className="text-sm text-slate-600">Ingresos totales</p>
            <p className="text-3xl font-bold text-[#0D8A38] mt-2">
              ${totalIngresos.toLocaleString("es-CO")}
            </p>
            <p className="text-xs text-emerald-700/70 mt-2">
              Entradas registradas en el periodo
            </p>
          </div>

          <div className="bg-[#FEF2F2] rounded-2xl p-6 border border-red-100">
            <p className="text-sm text-slate-600">Gastos totales</p>
            <p className="text-3xl font-bold text-[#DC2626] mt-2">
              ${totalGastos.toLocaleString("es-CO")}
            </p>
            <p className="text-xs text-red-700/70 mt-2">
              Salidas registradas en el periodo
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold text-[#0D8A38]">01</span>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Registrar movimiento
              </h2>
              <p className="text-xs text-slate-500">
                Agrega un nuevo ingreso o gasto a tu historial.
              </p>
            </div>

            <form onSubmit={agregarMovimiento} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  placeholder="Ej. Pago quincena, Almuerzo..."
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0D8A38]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Monto ($)
                  </label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                    min={1}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0D8A38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Tipo
                  </label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as TipoMovimiento)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#0D8A38]"
                  >
                    <option value="gasto">Gasto</option>
                    <option value="ingreso">Ingreso</option>
                  </select>
                </div>
              </div>

              {tipo === "gasto" && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Categoría
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#0D8A38]"
                  >
                    <option value="Alimentación">Alimentación</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Hogar">Hogar y servicios</option>
                    <option value="Educación">Educación</option>
                    <option value="Entretenimiento">Entretenimiento</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#0D8A38] hover:bg-[#0A6E2D] text-white font-semibold text-sm py-3 rounded-xl transition cursor-pointer"
              >
                Agregar movimiento
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#0D8A38]">02</span>
                  <h2 className="text-lg font-bold text-[#0F172A]">
                    Presupuesto mensual
                  </h2>
                  <p className="text-xs text-slate-500">
                    Controla cuánto llevas gastado respecto a tu límite del mes.
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    porcentajePresupuesto > 85
                      ? "bg-[#FEF2F2] text-[#DC2626]"
                      : "bg-[#EEFAF0] text-[#0D8A38]"
                  }`}
                >
                  {porcentajePresupuesto}% utilizado
                </span>
              </div>

              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    porcentajePresupuesto > 85 ? "bg-[#DC2626]" : "bg-[#0D8A38]"
                  }`}
                  style={{ width: `${porcentajePresupuesto}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-slate-600">
                <span>
                  Gastado:{" "}
                  <strong className="text-[#0F172A]">
                    ${totalGastos.toLocaleString("es-CO")}
                  </strong>{" "}
                  de ${presupuestoMensual.toLocaleString("es-CO")}
                </span>

                <label className="flex items-center gap-2">
                  <span>Límite:</span>
                  <input
                    type="number"
                    value={presupuestoMensual}
                    onChange={(e) =>
                      setPresupuestoMensual(Math.max(0, Number(e.target.value)))
                    }
                    className="w-28 rounded-lg border border-gray-200 px-2.5 py-1 text-xs focus:outline-none focus:border-[#0D8A38]"
                  />
                </label>
              </div>
            </div>

            <div className="bg-[#EEFAF0]/70 rounded-2xl p-6 border border-emerald-100 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#0D8A38]">04</span>
                  <h2 className="text-lg font-bold text-[#0F172A]">
                    Meta de ahorro
                  </h2>
                  <p className="text-xs text-slate-600">
                    Define tu objetivo y consulta tu avance para alcanzarlo.
                  </p>
                </div>
                <span className="text-xs font-semibold bg-white text-[#0D8A38] px-2.5 py-1 rounded-full border border-emerald-100">
                  {porcentajeMeta}% completado
                </span>
              </div>

              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0D8A38] rounded-full transition-all"
                  style={{ width: `${porcentajeMeta}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-slate-600">
                <span>
                  Acumulado:{" "}
                  <strong className="text-[#0D8A38]">
                    ${ahorroActual.toLocaleString("es-CO")}
                  </strong>{" "}
                  / ${metaAhorro.toLocaleString("es-CO")}
                </span>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1">
                    <span>Ahorrado:</span>
                    <input
                      type="number"
                      value={ahorroActual}
                      onChange={(e) =>
                        setAhorroActual(Math.max(0, Number(e.target.value)))
                      }
                      className="w-24 bg-white rounded-lg border border-emerald-200 px-2 py-1 text-xs focus:outline-none focus:border-[#0D8A38]"
                    />
                  </label>
                  <label className="flex items-center gap-1">
                    <span>Meta:</span>
                    <input
                      type="number"
                      value={metaAhorro}
                      onChange={(e) =>
                        setMetaAhorro(Math.max(0, Number(e.target.value)))
                      }
                      className="w-24 bg-white rounded-lg border border-emerald-200 px-2 py-1 text-xs focus:outline-none focus:border-[#0D8A38]"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold text-[#0D8A38]">03</span>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Estadísticas financieras
              </h2>
              <p className="text-xs text-slate-500">
                Comparativa general y distribución gráfica de gastos por categoría.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Ingresos</span>
                  <span className="font-semibold text-[#0D8A38]">
                    ${totalIngresos.toLocaleString("es-CO")}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0D8A38] rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (totalIngresos /
                          (Math.max(totalIngresos, totalGastos) || 1)) *
                          100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Gastos</span>
                  <span className="font-semibold text-[#DC2626]">
                    ${totalGastos.toLocaleString("es-CO")}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#DC2626] rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (totalGastos /
                          (Math.max(totalIngresos, totalGastos) || 1)) *
                          100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-3">
              <p className="text-xs font-semibold text-slate-600">
                Distribución de gastos por categoría
              </p>

              {entradasCategoria.length === 0 || totalGastos === 0 ? (
                <p className="text-xs text-slate-400">
                  Aún no hay gastos registrados.
                </p>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <svg
                    viewBox="0 0 110 110"
                    className="w-28 h-28 shrink-0 -rotate-90"
                    aria-label="Gráfico de gastos por categoría"
                  >
                    <circle
                      cx="55"
                      cy="55"
                      r={radio}
                      fill="transparent"
                      stroke="#F1F5F9"
                      strokeWidth="14"
                    />
                    {entradasCategoria.map(([cat, valor]) => {
                      const proporcion = valor / totalGastos;
                      const longitudSegmento = proporcion * circunferencia;
                      const offsetActual = -acumuladoOffset;
                      acumuladoOffset += longitudSegmento;
                      const color = COLORES_CATEGORIA[cat] || "#10B981";

                      return (
                        <circle
                          key={cat}
                          cx="55"
                          cy="55"
                          r={radio}
                          fill="transparent"
                          stroke={color}
                          strokeWidth="14"
                          strokeDasharray={`${longitudSegmento} ${circunferencia}`}
                          strokeDashoffset={offsetActual}
                        />
                      );
                    })}
                  </svg>

                  <div className="w-full space-y-2">
                    {entradasCategoria.map(([cat, valor]) => {
                      const pct = Math.round((valor / totalGastos) * 100);
                      const color = COLORES_CATEGORIA[cat] || "#10B981";
                      return (
                        <div key={cat} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center gap-1.5 text-slate-600">
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block"
                                style={{ backgroundColor: color }}
                              />
                              {cat}
                            </span>
                            <span className="font-medium text-slate-800">
                              ${valor.toLocaleString("es-CO")} ({pct}%)
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">
                  Movimientos recientes
                </h2>
                <p className="text-xs text-slate-500">
                  Historial actualizado de tus ingresos y gastos.
                </p>
              </div>
              <span className="text-xs text-slate-400">
                {movimientos.length} registros
              </span>
            </div>

            {cargando ? (
              <p className="text-sm text-slate-400 py-8 text-center">
                Cargando movimientos...
              </p>
            ) : movimientos.length === 0 ? (
              <p className="text-sm text-slate-400 py-8 text-center">
                No hay movimientos registrados todavía.
              </p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {movimientos.map((m) => (
                  <li
                    key={m.id}
                    className="py-3.5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          m.tipo === "ingreso" ? "bg-[#0D8A38]" : "bg-[#DC2626]"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-[#0F172A]">
                          {m.titulo}
                        </p>
                        <p className="text-xs text-slate-400">
                          {m.categoria} · {m.fecha}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-bold ${
                          m.tipo === "ingreso"
                            ? "text-[#0D8A38]"
                            : "text-[#DC2626]"
                        }`}
                      >
                        {m.tipo === "ingreso" ? "+" : "-"}$
                        {Number(m.monto).toLocaleString("es-CO")}
                      </span>
                      <button
                        type="button"
                        onClick={() => eliminarMovimiento(m.id)}
                        title="Eliminar movimiento"
                        className="text-xs text-slate-300 hover:text-red-500 transition cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
