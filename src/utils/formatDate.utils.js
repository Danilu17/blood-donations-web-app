// Crear funcion para formattear fecha 2007-02-05T00:00:00.000Z a DD/MM/YYYY

// utils/formatDate.utils.js

/**
 * Formatea una fecha ISO o Date a formato DD/MM/YYYY
 * @param {string | Date | null | undefined} value - Fecha en string (ej: "2007-02-05T00:00:00.000Z") o Date
 * @returns {string} - Fecha formateada en DD/MM/YYYY o "-" si es inválida
 */
export function formatDate(value) {
  if (!value) return "-";

  try {
    const date = value instanceof Date ? value : new Date(value);

    if (isNaN(date.getTime())) return "-"; // fecha inválida

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (err) {
    return "-";
  }
}
