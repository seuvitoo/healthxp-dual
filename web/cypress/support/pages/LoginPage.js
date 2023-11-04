import popup from "./components/PopUp";

class LoginPage {
  constructor() {
    this.popup = popup;
  }
  goTo() {
    cy.visit("http://localhost:3000/");
  }

  fill(user) {
    cy.get("input[name=email]").clear().as("email");
    cy.get("input[name=password]").clear().as("password");

    user.email ? cy.get('@email').type(user.email) : cy.log('empyt email');
    user.password ? cy.get('@password').type(user.password) : cy.log('empty password'); 
  }

  submit() {
    cy.contains("Entrar").click();
  }

  doLogin(user) {
    this.goTo();
    this.fill(user);
    this.submit();
  }
}

export default new LoginPage();
