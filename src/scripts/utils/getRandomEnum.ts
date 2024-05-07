/**
 * Returns a vrandom value from an enum
 * @param enumValue the enum
 * @returns one enum
 */
export function getRandomEnum<T>(enumValue: any): T {
  const values = Object.values(enumValue);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as T;
}
