import { test, expect } from "@playwright/test";

const BASE_URL = "https://restful-booker.herokuapp.com";
const endpoint = `${BASE_URL}/booking`;

test.describe("Booking API - /booking/:id endpoint", () => {
  test("TC-01 | Verify valid booking schema for existing booking ID (1)", async ({
    request,
  }) => {
    const response = await request.get(`${endpoint}/1`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(typeof body.firstname).toBe("string");
    expect(typeof body.lastname).toBe("string");
    expect(typeof body.totalprice).toBe("number");
    expect(typeof body.depositpaid).toBe("boolean");
    expect(typeof body.bookingdates).toBe("object");
    expect(typeof body.bookingdates.checkin).toBe("string");
    expect(typeof body.bookingdates.checkout).toBe("string");
    expect(
      typeof body.additionalneeds === "string" ||
        typeof body.additionalneeds === "undefined"
    ).toBe(true);
  });

  test("TC-02 | Verify non-existent booking ID returns error", async ({
    request,
  }) => {
    const response = await request.get(`${endpoint}/99999`);
    expect(response.status()).toBe(404);
    const text = await response.text();
    expect(text.toLowerCase()).toContain("not found");
  });

  test("TC-03 | Verify booking ID = 0 (Boundary Value)", async ({
    request,
  }) => {
    const response = await request.get(`${endpoint}/0`);
    expect(response.status()).toBe(404);
    const text = await response.text();
    expect(text.toLowerCase()).toContain("not found");
  });

  test("TC-04 | Verify invalid booking ID type = string ('abc')", async ({
    request,
  }) => {
    const response = await request.get(`${endpoint}/abc`);
    expect(response.status()).toBe(404);
    const text = await response.text();
    expect(text.toLowerCase()).toContain("not found");
  });

  test("TC-05 | Verify invalid booking ID type = special characters ('!@#')", async ({
    request,
  }) => {
    const response = await request.get(`${endpoint}/!@#`);
    expect(response.status()).toBe(404);
    const text = await response.text();
    expect(text.toLowerCase()).toContain("not found");
  });

  test("TC-06 | Verify wrong HTTP method (POST instead of GET)", async ({
    request,
  }) => {
    const response = await request.post(`${endpoint}/1`);
    expect(response.status()).toBe(404);
    const text = await response.text();
    expect(text.toLowerCase()).toContain("not found");
  });
});
