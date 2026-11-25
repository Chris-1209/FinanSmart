import { NextResponse } from "next/server";
import pool from "@/lib/db-dashboard";

export async function GET() {
  try {
    const { rows } = await pool.query(
      "SELECT id, titulo, monto::float AS monto, tipo, categoria, fecha FROM movements ORDER BY id DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/movements error:", error);
    return NextResponse.json({ error: "Error al cargar movimientos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const titulo = String(body.titulo || "").trim();
    const monto = Number(body.monto);
    const tipo = body.tipo === "ingreso" ? "ingreso" : "gasto";
    const categoria =
      tipo === "ingreso" ? "Ingresos" : String(body.categoria || "Alimentación").trim();
    const fecha = String(body.fecha || "Hoy").trim();

    if (!titulo || isNaN(monto) || monto <= 0) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { rows } = await pool.query(
      `INSERT INTO movements (titulo, monto, tipo, categoria, fecha)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, titulo, monto::float AS monto, tipo, categoria, fecha`,
      [titulo, monto, tipo, categoria, fecha]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/movements error:", error);
    return NextResponse.json({ error: "Error al guardar movimiento" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    await pool.query("DELETE FROM movements WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/movements error:", error);
    return NextResponse.json({ error: "Error al eliminar movimiento" }, { status: 500 });
  }
}
