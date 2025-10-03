import { test, expect } from "@playwright/test";

const BASE_URL = "https://restful-booker.herokuapp.com";

// Helper for POST /auth
test.describe("API Auth - /auth endpoint", () => {
  const endpoint = `${BASE_URL}/auth`;

  test("TC-01 | Valid login with correct credentials", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "admin", password: "password123" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeDefined();
  });

  test("TC-02 | Invalid username, valid password", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "wrongUser", password: "password123" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-03 | Valid username, invalid password", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "admin", password: "wrongPass" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-04 | Both username and password invalid", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "wrongUser", password: "wrongPass" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-05 | Empty username", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "", password: "password123" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-06 | Empty password", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "admin", password: "" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-07 | Both fields empty", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "", password: "" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-08 | Username with whitespaces", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "   ", password: "password123" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-09 | Password with whitespaces", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "admin", password: "   " },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-10 | Special characters in username", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "!@#$%^&*", password: "password123" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-11 | Special characters in password", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "admin", password: "!@#$%^&*" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-12 | Unicode characters in username", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "ãdmín", password: "password123" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-13 | Unicode characters in password", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "admin", password: "pässwörd123" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-14 | Case sensitivity check", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "Admin", password: "Password123" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-15 | SQL Injection attempt in username", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "admin'", password: "password123" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-16 | SQL Injection attempt in password", async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { username: "admin", password: "password123'" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });

  test("TC-17 | Malformed JSON body", async ({ request }) => {
    const response = await request.fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Intentionally malformed JSON
      body: "{ username: admin, password: password123 }",
    } as any);
    const responseBody = await response.json();
    expect(responseBody.reason).toContain("Bad credentials");
  });

  test("TC-18 | Wrong HTTP method", async ({ request }) => {
    const response = await request.get(endpoint, {
      params: { username: "admin", password: "password123" },
    });
    expect(response.status()).toBe(404);
  });
});
