import { test, expect, Page } from "@playwright/test";

const LOGIN_URL = "https://the-internet.herokuapp.com/login";
const SECURE_URL = "https://the-internet.herokuapp.com/secure";

// Helper for login
async function login(page: Page, username: string, password: string) {
  await page.goto(LOGIN_URL);
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
}

test.describe("Login Page - The Internet", () => {
  test("TC-01: Valid login and logout", async ({ page }) => {
    await login(page, "tomsmith", "SuperSecretPassword!");
    await expect(
      page.getByText("You logged into a secure area!")
    ).toBeVisible();
    await expect(page).toHaveURL(SECURE_URL);
    await page.getByRole("link", { name: "Logout" }).click();
    await expect(
      page.getByText("You logged out of the secure area!")
    ).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("TC-02: Invalid login — incorrect username", async ({ page }) => {
    await login(page, "wronguser", "SuperSecretPassword!");
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("TC-03: Invalid login — incorrect password", async ({ page }) => {
    await login(page, "tomsmith", "wrongpass");
    await expect(page.getByText("Your password is invalid!")).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("TC-04: Both username & password invalid", async ({ page }) => {
    await login(page, "wronguser", "wrongpass");
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });
  test("TC-05: Username composed only of spaces", async ({ page }) => {
    await login(page, "   ", "SuperSecretPassword!");
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });
  test("TC-06: Password composed only of spaces", async ({ page }) => {
    await login(page, "tomsmith", "   ");
    await expect(page.getByText("Your password is invalid!")).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("TC-07: Empty fields (both blank)", async ({ page }) => {
    await login(page, "  ", "  ");
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("TC-08: SQL Injection attempt in username", async ({ page }) => {
    await login(page, "tomsmith' OR '1'='1", "anything");
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("TC-09: Special characters in username", async ({ page }) => {
    await login(page, "!@#$%^&*", "SuperSecretPassword!");
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("TC-10: Case sensitivity check for username", async ({ page }) => {
    await login(page, "TomSmith", "SuperSecretPassword!");
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("TC-11: Leading/trailing spaces in username & password", async ({
    page,
  }) => {
    await login(page, " tomsmith ", " SuperSecretPassword! ");
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("TC-12: Browser refresh after successful login (session persistence)", async ({
    page,
  }) => {
    await login(page, "tomsmith", "SuperSecretPassword!");
    await expect(
      page.getByText("You logged into a secure area!")
    ).toBeVisible();
    await expect(page).toHaveURL(SECURE_URL);
    await page.reload();
    // Check if still in Secure Area or redirected
    expect([SECURE_URL, LOGIN_URL]).toContain(page.url());
  });

  test("TC-13: Valid login → refresh → logout (combined flow)", async ({
    page,
  }) => {
    await login(page, "tomsmith", "SuperSecretPassword!");
    await expect(
      page.getByText("You logged into a secure area!")
    ).toBeVisible();
    await expect(page).toHaveURL(SECURE_URL);
    await page.reload();
    expect([SECURE_URL, LOGIN_URL]).toContain(page.url());
    if (page.url() === SECURE_URL) {
      await page.getByRole("link", { name: "Logout" }).click();
      await expect(
        page.getByText("You logged out of the secure area!")
      ).toBeVisible();
      await expect(page).toHaveURL(LOGIN_URL);
    }
  });
});
