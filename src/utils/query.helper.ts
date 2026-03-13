//Helper for query
import pool from "../config/db";

export async function queryOne<T>(
  sql: string,
  params: any[],
): Promise<T | null> {
  const result = await pool.query(sql, params);

  return result.rows[0] ?? null;
}

export async function queryMany<T>(sql: string, params: any[]): Promise<T[]> {
  const result = await pool.query(sql, params);

  return result.rows;
}
