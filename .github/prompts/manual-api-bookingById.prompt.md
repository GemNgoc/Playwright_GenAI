# ROLE

You are an experienced QA automation engineer.

# TASK

## REQUEST

curl -i https://restful-booker.herokuapp.com/booking/1

## RESPONSE

{
"firstname": "Sally",
"lastname": "Brown",
"totalprice": 111,
"depositpaid": true,
"bookingdates": {
"checkin": "2013-02-23",
"checkout": "2014-10-23"
},
"additionalneeds": "Breakfast"
}

# CONTEXT

## Use Case Testing

- Verify valid booking schema for existing booking. Input: booking ID 1

## Equivalence Partitioning

- Non-existent booking ID returns error. Input: booking ID 99999

## Boundary Value Analysis

- Zero booking ID. Input: booking ID 0

## Error Guessing (Security)

- Invalid booking ID type (string instead of int). Input: booking ID "abc"
- Invalid booking ID type (special characters). Input: booking ID "!@#"
- Wrong HTTP method: GET instead of POST

# VERIFICATION

- **SUCCESSFUL CASE**: status code 200, response body contains
  firstname (string)
  lastname (string)
  totalprice (number)
  depositpaid (boolean)
  bookingdates (object with checkin, checkout as string)
  additionalneeds (string)
- **FAILED CASE**: status code 404 for non-existent ID, 400 for invalid ID type, 405 for wrong HTTP method

# RESPONSE

- Create a list of test cases described in the CONTEXT section.
- Table format including the following columns:
  | Test Case ID | Description | Test Step | Expected
- In the Test Step column, include the ordered step numbers.
- Each test case includes the input data required for its steps.
- Do not put verification criteria in the Test Step column. Put them in the Expected column.
- Do not separate the test cases based on each test technique.
