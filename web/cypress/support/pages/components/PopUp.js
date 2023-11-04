class PopUp {
  content() {
    return cy.get("#swal2-content");
  }

  haveText(text) {
    this.content().should("be.visible").should("have.have.text", text);
  }

  back() {
    cy.get(".swal2-cancel").click();
  }

  confirm() {
    cy.get('button.swal2-confirm').click()
}
}

export default new PopUp();
