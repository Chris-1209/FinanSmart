import { NextRequest } from "next/server";
import pool from "@/lib/db-dashboard";

export async function getAuthenticatedUserId(
  req: NextRequest
): Promise<number | null> {
  const token = req.cookies.get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const result = await pool.query(
      `SELECT user_id
       FROM sessions
       WHERE token = $1 AND expires_at > NOW()
       LIMIT 1`,
      [token]
    );

    if (result.rows.length > 0 && result.rows[0].user_id) {
      return Number(result.rows[0].user_id);
    }

    return null;
  } catch (error) {
    console.error("Error verificando sesión:", error);
    return null;
  }
}
