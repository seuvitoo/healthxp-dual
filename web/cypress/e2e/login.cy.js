/// <reference types="cypress" />

import users from "../fixtures/users.json";

import loginPage from "../support/pages/LoginPage";
import studentPage from "../support/pages/StudentPage";

describe("login", () => {
  it("deve logar com perfil de administrador", () => {
    const user = users.admin;

    loginPage.doLogin(user);
    studentPage.navbar.userLoggedIn(user.name);
  });

  it("não deve logar com senha incorreta", () => {
    const user = users.inv_pass;

    loginPage.doLogin(user);
    loginPage.popup.haveText(
      "Suas credenciais são inválidas, por favor tente novamente!"
    );
  });

  it("não deve logar com email não cadastrado", () => {
    const user = users.inv_pass;

    loginPage.doLogin(user);
    loginPage.popup.haveText(
      "Suas credenciais são inválidas, por favor tente novamente!"
    );
  });

  it("não deve logar com emails incorretos", () => {
    const emails = users.inv_emails;

    let outputMessage = [];
    let expectMessages = [];

    loginPage.goTo();
    emails.forEach((u) => {
      loginPage.fill(u);
      loginPage.submit();

      loginPage.popup
        .content()
        .invoke("text")
        .then((text) => {
          cy.log(text);
          outputMessage.push(text);
          expectMessages.push("Insira um email válido.");
        });

      loginPage.popup.back();
    });

    cy.wrap(outputMessage).should("deep.equal", expectMessages);
  });

  it("não deve logar com email em branco", () => {
    const user = users.empty_email;

    loginPage.doLogin(user);
    loginPage.popup.haveText("Os campos email e senha são obrigatórios.");
  });

  it("não deve logar com senha em branco", () => {
    const user = users.empty_password;

    loginPage.doLogin(user);
    loginPage.popup.haveText("Os campos email e senha são obrigatórios.");
  });
});
