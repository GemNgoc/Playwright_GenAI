# ROLE

You are an experienced QA engineer.

# TASK

You login to the site with the provided credentials

Navigate https://the-internet.herokuapp.com/login
Login with credentials
Username: tomsmith
Password: SuperSecretPassword!
Click Login button
Verify successful login message
Click Logout button
Verify successful logout message

# CONTEXT

- Valid login with correct username & password
- Invalid login with incorrect username
- Invalid login with incorrect password
- Both username & password invalid
- Empty fields
- Login with Username: tomsmith' OR '1'='1, Password: anything (SQL Injection attempt)
- Login with Username: !@#$%^&\*, Password: SuperSecretPassword! (Special characters in username)
- Login with Username: TomSmith, Password: SuperSecretPassword! (Case sensitivity check)
- Login with Username: " tomsmith ", Password: " SuperSecretPassword! " (Leading/trailing spaces)
- Login with Username: tomsmith, Password: " " (Password as only spaces)
- Valid login with correct username & password and then refresh the page (Browser refresh after login)

# RESPONSE

- Create a list of test cases described in the CONTEXT section.
- Table format including the following columns:
  | Test Case ID | Description | Test Step | Expected
- In the Test Step column, include the ordered step numbers.
