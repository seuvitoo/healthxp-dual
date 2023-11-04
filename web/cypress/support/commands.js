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

import users from "../fixtures/users.json";

import loginPage from "../support/pages/LoginPage";
import studentPage from "../support/pages/StudentPage";

const apiHelper = Cypress.env('API_HELPER')

Cypress.Commands.add("adminLogin", () => {
  const user = users.admin;

  loginPage.doLogin(user);
  studentPage.navbar.userLoggedIn(user.name);

});

Cypress.Commands.add('resetStudent', student => {
  cy.request({
      method: 'POST',
      url: `${apiHelper}/students`,
      body: student
  }).then(res => {
      expect(res.status).eq(201)
      cy.log(res.body.student_id)
      Cypress.env('studentId', res.body.student_id)
  })
})

Cypress.Commands.add('deleteStudent', email => {
  cy.request({
      method: 'DELETE',
      url: `${apiHelper}/students/${email}`
  }).its('status').should('eq', 204)
})

Cypress.Commands.add('createEnroll', enroll => {
  const payload = {
      email: enroll.student.email,
      plan_id: enroll.plan.id,
      price: enroll.plan.price
  }

  cy.request({
      method: 'POST',
      url: `${apiHelper}/enrollments`,
      body: payload
  }).its('status').should('eq', 200)
})

Cypress.Commands.add('createQuestion', question => {
  cy.request({
      method: 'POST',
      url: `http://localhost:3333/students/${Cypress.env('studentId')}/help-orders`,
      body: {
          question
      }
  }).its('status').should('eq', 201)
})