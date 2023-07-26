/// <reference types="cypress" />

import { validateYoutubeURL } from "@/utils/validateYoutubeURL"

// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('dropDBUser', () => {
  cy.task("clearUsers")
})

Cypress.Commands.add('dropDBMovie', () => {
  cy.task("clearMovies")
})

Cypress.Commands.add('login', (email, password, success = true) => {
  let loginbtn = cy.get('button[data-cy=login-button]')
  loginbtn.should('have.text', "Login")
  cy.get('input[data-cy=login-email]').type(email)
  cy.get('input[data-cy=login-password]').type(password)
  cy.intercept('/api/user/login').as('login')
  loginbtn.click();
  cy.wait('@login').its('response.statusCode').should('be.oneOf', success ? [200] : [400, 401, 500])
})

Cypress.Commands.add('logout', () => {
  let logoutbtn = cy.get('button[data-cy=logout-button]')
  logoutbtn.should('have.text', "Logout")
  cy.get('input[data-cy=user-email]').should("not.be.empty")
  cy.intercept('/api/user/logout').as('logout')
  logoutbtn.click();
  cy.wait('@logout').its('response.statusCode').should('be.oneOf', [200])
  cy.get('button[data-cy=login-button]').should("exist");
})

Cypress.Commands.add('navigateToShare', () => {
  let shareBtn = cy.get('button[data-cy=share-button]')
  shareBtn.should("have.text", "Share a movie")
  shareBtn.click();
})


Cypress.Commands.add('share', (url, errorText) => {
  let shareBtn = cy.get('button[data-cy=share-submit]')
  shareBtn.should("have.text", "Share")
  cy.get('input[data-cy=share-input]').type(url)
  cy.intercept('/api/movie/share').as('shareMovie')
  shareBtn.click();
  if (validateYoutubeURL(url)) {
    cy.wait('@shareMovie').its('response.statusCode').should('be.oneOf', [200, 400])
  }
  cy.get('[data-cy=share-alert]').should("have.text", errorText)
})

declare global {
  namespace Cypress {
    interface Chainable {
      dropDBUser(): Chainable<void>
      dropDBMovie(): Chainable<void>
      login(email: string, password: string, success?: boolean): Chainable<void>
      logout(): Chainable<void>
      navigateToShare(): Chainable<void>
      share(url: string, errorText: string): Chainable<void>
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export { }
