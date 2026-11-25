import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db-dashboard";
import { getAuthenticatedUserId } from "@/lib/auth-user";

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const result = await pool.query(
      `SELECT id, user_id, titulo, monto, tipo, categoria, fecha
       FROM movements
       WHERE user_id = $1
       ORDER BY id DESC`,
      [userId]
    );

    return NextResponse.json({
      userId,
      movements: result.rows,
    });
  } catch (error) {
    console.error("Error en GET /api/movements:", error);
    return NextResponse.json(
      { error: "Error al obtener movimientos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { titulo, monto, tipo, categoria, fecha } = body;

    if (!titulo || typeof monto !== "number" || monto <= 0 || !tipo) {
      return NextResponse.json(
        { error: "Datos de movimiento inválidos" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO movements (user_id, titulo, monto, tipo, categoria, fecha)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, user_id, titulo, monto, tipo, categoria, fecha`,
      [
        userId,
        titulo,
        monto,
        tipo,
        categoria || "General",
        fecha || new Date().toISOString().slice(0, 10),
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/movements:", error);
    return NextResponse.json(
      { error: "Error al crear movimiento" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id || Number.isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const result = await pool.query(
      `DELETE FROM movements
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [id, userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Movimiento no encontrado o sin permiso" },
        { status: 404 }
      );
    }

    return NextResponse.json({ deleted: true, id });
  } catch (error) {
    console.error("Error en DELETE /api/movements:", error);
    return NextResponse.json(
      { error: "Error al eliminar movimiento" },
      { status: 500 }
    );
  }
}
