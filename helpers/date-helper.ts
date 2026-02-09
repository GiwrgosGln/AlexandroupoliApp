/**
 * Formats an ISO date string to 'DD/MM/YYYY'.
 * @param isoString - A valid ISO date string (e.g., '2024-02-10T12:00:00Z').
 * @returns The formatted date as 'DD/MM/YYYY', or an empty string if input is invalid.
 */
export const formatDateToDDMMYYYY = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formats an ISO date string to 'HH:mm' (24-hour time).
 * @param isoString - A valid ISO date string.
 * @returns The formatted time as 'HH:mm', or an empty string if input is invalid.
 */
export const formatTime = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
