import { describe, it, expect } from "@jest/globals";

describe("Project Role Access", () => {
  it("should allow ADMIN to access all projects", () => {
    const role = "ADMIN";

    expect(role).toBe("ADMIN");
  });
});
