---
description: "Automate sending API requests and handling responses using Playwright."
mode: agent
tools: ["playwright"]
model: "GPT-4.1"
---

## Code Quality Standards

- **Assertions**: Use auto-retrying web-first assertions. These assertions start with the `await` keyword (e.g., `await expect(responseBody).toBe(<expectedValue>), await expect(responseBody).toBeDefined(), await expect(responseBody).toContain(<expectedSubstring>)`).
- **Timeouts**: Rely on Playwright's built-in auto-waiting mechanisms. Avoid hard-coded waits or increased default timeouts.
- **Clarity**: Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.

## Test Structure 

- **Imports**: Start with `import { test, expect } from '@playwright/test';`.
- **Organization**: Group related tests for a feature under a `test.describe()` block.
- **Hooks**: Use `beforeEach` for setup actions common to all tests in a `describe` block (e.g., navigating to a page).
- **Titles**: Follow a clear naming convention, such as `Feature - Specific action or scenario`.

## File Organization

- **Location**: Store all test files in the `tests/` directory.
- **Naming**: Use the convention `<feature-or-page>.spec.ts` (e.g., `login.spec.ts`, `search.spec.ts`).
- **Scope**: Aim for one test file per major application feature or page.

## Assertion Best Practices
- **Status Codes**: Use `toBe` for exact matches (e.g., `expect(response.status()).toBe(200)`).
- **Existence**: Use `toBeDefined` to check if a value exists.
- **Text Content**: Use `toContain` for matches.

## Example Test Structure

```typescript
import { test, expect } from "@playwright/test";

const BASE_URL = "https://testapi.com";

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
});

```

## Test Execution Strategy

1. **Debug Failures**: Analyze test failures and identify root causes
2. **Iterate**:  assertions, or test logic as needed
3. **Validate**: Ensure tests pass consistently and cover the intended functionality
4. **Report**: Provide feedback on test results and any issues discovered

## Quality Checklist

Before finalizing tests, ensure:

- [ ] Tests are grouped logically and follow a clear structure
- [ ] Assertions are meaningful and reflect user expectations
- [ ] Tests follow consistent naming conventions
- [ ] Code is properly formatted and commented
