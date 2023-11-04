import popup from "../pages/components/PopUp";

class LoginPage {
  constructor() {
    this.popup = popup;
  }
  goTo() {
    cy.visit("http://localhost:3000/");
  }

  fill(user) {
    if (user.email) {
      cy.get("input[name=email]").clear().type(user.email);
    }

    if (user.password) {
      cy.get("input[name=password]").clear().type(user.password);
    }
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
