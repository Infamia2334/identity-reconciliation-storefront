# Identity Reconciliation Storefront (TypeScript)
This project implements a web service for identity reconciliation, designed to consolidate contact information based on email and phone number.

## Project Overview
This service provides a single endpoint, /identify, which accepts HTTP POST requests with a JSON body containing optional email and phoneNumber fields. It then performs the following actions:

* Consolidates contact information based on the provided data.
* Returns a JSON response with details about the consolidated contact.

## Functionality
The service prioritizes existing contacts in the database based on the following logic:

**Primary Contact**: If both email and phoneNumber match an existing contact, that contact is considered the primary contact.
**Secondary Contact**: If either email or phoneNumber matches an existing contact but contains new information (the other field is missing or different), a new "secondary" contact is created.
**New Contact**: If neither email nor phoneNumber matches any existing contact, a new contact is created and marked as "primary".

## Example Usage
### Request:

JSON
`{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}`

### Response:

`{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [23]
  }
}`

### Explanation:

* In this example, both email and phoneNumber match an existing contact (ID: 1) with an existing email ("lorraine@hillvalley.edu").
* The service consolidates the information, including the new email ("mcfly@hillvalley.edu").
* The response includes the primary contact ID, all associated emails and phone numbers, and the secondary contact ID (if any).
## Additional Notes:

The service allows for requests with only email or only phoneNumber. It will still attempt to identify and consolidate contacts based on the provided information.
If no matching contacts are found, a new primary contact is created.

## Installation
1. Clone this repository:

`git clone https://github.com/Infamia2334/identity-reconciliation-storefront.git`

2. Install dependencies:

`npm install`

3. Usage
#### Development:

Start the development server:

`npm run start:dev`
This will start the server in development mode with Nodemon for automatic restarts on code changes.

Production:

Build the project for production:

`npm run build`

This will compile the TypeScript code and create a production-ready build in the dist directory.

Run the production server:

`node ./dist/server.js`
Use code with caution.
**Note**: You will need to configure your environment variables (e.g., database connection URL) before running the server in production.

### Database Migrations
This project uses node-pg-migrate for database migrations. The following commands are available:

npm run migrate:create: Creates a new migration file.
npm run migrate:up: Applies pending migrations to the database.
npm run migrate:down: Reverts the latest migration applied to the database.
Note: You will need to set the DATABASE_URL environment variable before running any migration commands.

## Testing
While a test script is included in package.json, it currently exits with an error message. You can implement your own testing framework using tools like Jest or Mocha.

## Technologies Used
TypeScript: A superset of JavaScript that adds optional static typing for improved code maintainability.
Express.js: A popular Node.js web framework for building web applications and APIs.
pg-promise: A Node.js library for interacting with PostgreSQL databases.
node-pg-migrate: A library for managing database migrations with PostgreSQL.
## License
This project is licensed under the ISC License. See the LICENSE file for details.

## Contributing
We welcome contributions to this project. Please refer to the contributing guidelines (if available) before submitting any pull requests.
