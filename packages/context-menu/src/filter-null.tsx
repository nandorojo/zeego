export const filterNull = <T extends unknown | null | undefined>(
  t: T
): t is NonNullable<T> => {
  return t != null
}
