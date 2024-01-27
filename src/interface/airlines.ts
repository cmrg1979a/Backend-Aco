export interface ModelAirlines {
  id?: number;
  code_iata?: string;
  name?: string;
  code_icao?: string;
  code_three?: bigint;
  id_pais?: number;
  code?: string;
  status?: boolean | "true" | "false" | "null" | null; // Tipo de unión que permite booleanos, 'true', 'false' o null
  id_branch?: number;
}
