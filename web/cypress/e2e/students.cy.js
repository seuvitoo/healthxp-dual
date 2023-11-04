/// <reference types="cypress" />
import students from "../fixtures/students.json";

import studentsPage from "../support/pages/StudentPage";

describe("students", () => {
  it("deve cadastrar um novo aluno", () => {
    const student = students.create;

    cy.task("deleteStudents", student.email);
    cy.adminLogin();

    studentsPage.goToRegister();
    studentsPage.submitForm(student);

    studentsPage.popup.haveText("Dados cadastrados com sucesso.");
  });

  it.only("não deve cadastrar um novo aluno com email já cadastrado", () => {
    const student = students.duplicate;

    cy.task("resetStudents", student);

    cy.adminLogin();

    studentsPage.goToRegister();
    studentsPage.submitForm(student);
    studentsPage.popup.haveText("O email informado já foi cadastrado!");
  });
});
