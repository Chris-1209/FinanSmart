import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "FinanSmart | Gestión de Finanzas Personales",
  description: "Plataforma SaaS para el control de ingresos, gastos, presupuestos y metas de ahorro.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body 
        suppressHydrationWarning
        className={`${poppins.className} bg-[#F7F9F7] text-[#123C32]`}
      >
        {children}
      </body>
    </html>
  );
}
