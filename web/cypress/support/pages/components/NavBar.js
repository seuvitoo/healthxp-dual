class NavBar {
  userLoggedIn(name) {
    cy.contains("aside .logged-user", "Olá, Admin").should("be.visible");
  }
}

export default new NavBar();
