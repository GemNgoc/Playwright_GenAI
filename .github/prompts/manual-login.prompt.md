# ROLE

You are an experienced QA automation engineer.

# TASK

You login to the site with the provided credentials

Navigate https://the-internet.herokuapp.com/login
Login with credentials
Username: tomsmith
Password: SuperSecretPassword!
Click Login button
Verify successful login message.
Click Logout button
Verify successful logout message.

# CONTEXT

## Use Case Testing

- Valid login with correct username & password.

## Equivalence Partitioning

- Invalid login with incorrect username.
- Invalid login with incorrect password
- Both username & password invalid

## Boundary Value Analysis

- Login with Username: "   ", Password: SuperSecretPassword! (Username as only spaces)
- Login with Username: tomsmith, Password: "   " (Password as only spaces)
- Both fields empty

## Error Guessing (Security)

- Login with Username: tomsmith, Password: " " (Password as only spaces)
- Login with Username: " tomsmith ", Password: " SuperSecretPassword! " (Leading/trailing spaces)
- Login with Username: !@#$%^&\*, Password: SuperSecretPassword! (Special characters in username)
- Login with Username: tomsmith, Password: Pässwørd123! (unicode characters in password)
- Login with Username: TomSmith, Password: SuperSecretPassword! (Case sensitivity check)
- Login with Username: tomsmith' OR '1'='1, Password: anything (SQL Injection attempt)
- Logout successfully and then check Cookies.

## State Transition Testing

- Valid login with correct username & password and then refresh the page (Browser refresh after login).
- Logout successfully and then press browser Back button.

# VERIFICATION

- Successful login: Message "You logged into a secure area!"
- Successful logout: Message "You logged out of the secure area!"
- Cookies after successful logout: Cookies cleared
- Failed login with wrong username: Message "Your username is invalid!"
- Failed login with wrong password: Message "Your password is invalid!"

# RESPONSE

- Create a list of test cases described in the CONTEXT section.
- Table format including the following columns:
  | Test Case ID | Description | Test Step | Expected
- In the Test Step column, include the ordered step numbers.
- Each test case includes the input data required for its steps.
