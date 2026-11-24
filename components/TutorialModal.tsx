"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    icon: "🔐",
    title: "Crea tu cuenta",
    description:
      "Regístrate e inicia sesión para acceder a tu espacio personal en FinanSmart.",
  },
  {
    number: "02",
    icon: "💰",
    title: "Registra tus movimientos",
    description:
      "Agrega tus ingresos y gastos para conocer cómo administras tu dinero.",
  },
  {
    number: "03",
    icon: "📊",
    title: "Define tus presupuestos",
    description:
      "Organiza tu dinero mes a mes con presupuestos y controla tus gastos.",
  },
  {
    number: "04",
    icon: "🎯",
    title: "Crea tus metas de ahorro",
    description:
      "Establece objetivos, consulta tus estadísticas y sigue tu progreso.",
  },
];

export default function TutorialModal() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable =
          dialogRef.current.querySelectorAll<HTMLElement>("button, [href]");
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && (active === first || active === dialogRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  return (
    <>
      {/* Botón que abre el modal */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition"
      >
        Cómo usar FinanSmart
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg border border-gray-100 outline-none md:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-green-50 hover:text-green-700 transition"
            >
              ✕
            </button>

            {/* Encabezado */}
            <div className="text-center px-6">
              <p className="text-green-700 font-semibold text-sm">
                Guía rápida
              </p>
              <h2
                id={titleId}
                className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 leading-tight"
              >
                Cómo usar FinanSmart
              </h2>
              <p className="mt-3 text-gray-600">
                Sigue estos pasos para organizar tus finanzas desde un solo
                lugar.
              </p>
            </div>

            {/* Pasos */}
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <li
                  key={step.number}
                  className="rounded-2xl border border-gray-200 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl" aria-hidden="true">
                      {step.icon}
                    </span>
                    <span className="text-sm font-semibold text-green-700">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>

            {/* Info SaaS de pago */}
            <div className="mt-6 rounded-2xl bg-green-50 p-5">
              <p className="flex items-center gap-2 font-bold text-gray-900">
                <span aria-hidden="true">💳</span>
                FinanSmart es un SaaS de pago
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Es un software como servicio (SaaS) al que accedes desde el
                navegador, sin instalar nada. Para usar la plataforma necesitas
                una suscripción activa.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={close}
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}