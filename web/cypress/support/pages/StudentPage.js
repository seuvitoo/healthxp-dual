import navbar from "../pages/components/NavBar";
import popup from "../pages/components/PopUp";

class StudentPage {
  constructor() {
    this.navbar = navbar;
    this.popup = popup;
  }

  goToRegister() {
    cy.get("a[href='/students/new']").click();
  }

  submitForm(student) {
    cy.get("input[name=name]").type(student.name);
    cy.get("input[name=email]").type(student.email);
    cy.get("input[name=age]").type(student.age);
    cy.get("input[name=weight]").type(student.weight);
    cy.get("input[name=feet_tall]").type(student.feet_tall);

    cy.contains("button", "Cadastrar").click();
  }

}

export default new StudentPage();
