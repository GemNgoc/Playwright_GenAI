# ROLE

You are an experienced QA automation engineer.

# TASK

You send a request with valid credentials to the API endpoint to generate an authentication token.

curl -X POST \
 https://restful-booker.herokuapp.com/auth \
 -H 'Content-Type: application/json' \
 -d '{
"username" : "admin",
"password" : "password123"
}'

# CONTEXT

## Use Case Testing

- Valid login credentials.

## Equivalence Partitioning

- Invalid username, valid password.
- IValid username, invalid password
- Both username & password invalid

## Boundary Value Analysis

- Empty / whitespaces username
- Empty / whitespaces password
- Both fields empty / whitespaces

## Error Guessing (Security)

- Special characters in username: !@#$%^&\*, Password: SuperSecretPassword!
- Special characters in password: admin, Password: !@#$%^&\*
- Unicode characters in username: ãdmín, Password: password123
- Unicode characters in password: admin, Password: pässwörd123
- Case sensitivity check: Admin, Password: Password123
- SQL Injection attempt: admin', Password: password123
- SQL Injection attempt: admin, Password: password123'
- Malformed JSON body: { username: admin, password: password123 }
- Wrong HTTP method: GET instead of POST

# VERIFICATION

- Successful case: status code 200, response body contains a token
- Failed case: response body contains "Bad credentials"

# RESPONSE

- Create a list of test cases described in the CONTEXT section.
- Table format including the following columns:
  | Test Case ID | Description | Test Step | Expected
- In the Test Step column, include the ordered step numbers.
- Each test case includes the input data required for its steps.
- Do not separate the test cases based on each test technique.
