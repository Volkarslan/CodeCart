import { describe, it, expect } from "vitest"; // Vitest fonksiyonlarını import ediyoruz
import { getInitials } from "../../utils/stringUtils";

describe("getInitials", () => {
  it("should return initials for a full name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("should return an empty string for an empty name", () => {
    expect(getInitials("")).toBe("");
  });
});
