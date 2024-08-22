// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.request({
        url: '/api/login',
        method: 'POST',
        body: {
            "email": email,
            "password": password
        },
        failOnStatusCode: false // Prevents the test from failing automatically on non-2xx status codes
    }).then((response) => {
        if (response.status === 200) {
            return response.body.token; // Return the token if successful
        } else {
            return response.body.error || `Error: ${response.status}`; // Return the error message or status code
        }
    });
});

