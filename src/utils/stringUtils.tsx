/**
 * Generates the initials from a given name.
 * @param name - name string
 * @returns Initials (Ex. "John Doe" → "JD")
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("");
};
