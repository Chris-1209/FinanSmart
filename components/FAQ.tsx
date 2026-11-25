"use client";

import { useState } from "react";

const questions = [
  {
    question: "¿Qué es FinanSmart?",
    answer:
      "FinanSmart es una aplicación web orientada a la organización de las finanzas personales. Permite gestionar ingresos, gastos, presupuestos y metas de ahorro.",
  },
  {
    question: "¿Puedo registrar mis ingresos y gastos?",
    answer:
      "Sí. La aplicación está diseñada para permitir el registro y seguimiento de movimientos financieros.",
  },
  {
    question: "¿Para qué sirven los presupuestos?",
    answer:
      "Los presupuestos ayudan a establecer límites de gasto y a organizar el dinero disponible durante un periodo.",
  },
  {
    question: "¿Puedo establecer metas de ahorro?",
    answer:
      "Sí. FinanSmart contempla un apartado para definir objetivos de ahorro y consultar el progreso alcanzado.",
  },
  {
    question: "¿Puedo consultar estadísticas?",
    answer:
      "Sí. La aplicación contempla gráficos y estadísticas para facilitar la comprensión de los movimientos financieros.",
  },
];

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <section id="preguntas" className="scroll-mt-24 py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-green-700 font-semibold">
            Centro de ayuda
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Preguntas frecuentes
          </h2>

          <p className="text-gray-600 mt-4">
            Resolvemos algunas dudas sobre FinanSmart.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((item, index) => {
            const isOpen = openQuestion === index;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenQuestion(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-green-50 transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900">
                    {item.question}
                  </span>

                  <span className="text-green-700 text-xl">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
