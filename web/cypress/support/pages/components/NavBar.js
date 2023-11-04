class NavBar {
  userLoggedIn(name) {
    cy.contains("aside .logged-user", "Olá, Admin").should("be.visible");
  }

  goToEnrolls() {
    cy.get("a[href='/enrollments']").click();
    
  }
}

export default new NavBar();
