import students from "../fixtures/students.json";
import studentPage from "../support/pages/StudentPage";

describe("Alunos", () => {
  it("deve cadastrar um novo aluno", () => {
    const student = students.create;
    cy.task("deleteStudents", student.email);

    cy.adminLogin();

    studentPage.goToRegister();
    studentPage.submitForm(student);

    studentPage.popup.haveText("Dados cadastrados com sucesso.");
  });

  it("não deve cadastrar um novo aluno com email já cadastrado", () => {
    const student = students.duplicate;
    cy.task("resetStudent", student);

    cy.adminLogin();

    studentPage.goToRegister();
    studentPage.submitForm(student);
    studentPage.popup.haveText("O email informado já foi cadastrado!");
  });

  it("todos os campos devem ser obrigatórios", () => {
    const student = students.required;

    cy.adminLogin();

    studentPage.goToRegister();
    studentPage.submitForm(student);

    studentPage.alertMessage("Nome completo", "Nome é obrigatório");
    studentPage.alertMessage("E-mail", "O email é obrigatório");
    studentPage.alertMessage("Idade", "A idade é obrigatória");
    studentPage.alertMessage("Peso (em kg)", "O peso é obrigatório");
    studentPage.alertMessage("Altura", "A altura é obrigatória");
  });

  it("Não deve cadastrar aluno com menos de 16 anos", () => {
    const student = students.under_16_years;

    cy.adminLogin();
    studentPage.goToRegister();
    studentPage.submitForm(student);

    studentPage.alertMessage("Idade", "A idade mínima para treinar é 16 anos!");
  });

  it("Deve remover um aluno sem matrícula", () => {
    const student = students.remove;
    cy.resetStudent(student);

    cy.adminLogin();

    studentPage.search(student.name);
    studentPage.remove(student.email);

    studentPage.popup.confirm();
    studentPage.popup.haveText("Exclusão realizada com sucesso.");
  });

  it.skip("Não deve cadastrar aluno com peso igual ou menor que 0", () => {
    const student = students.invalid_weight;

    cy.adminLogin();

    studentPage.goToRegister();
    studentPage.submitForm(student);

    studentPage.alertMessage("Peso (em kg)", "Peso não permitido");
  });

  it.skip("Não deve cadastrar aluno com altura igual ou menor que 0", () => {
    const student = students.invalid_width;

    cy.adminLogin();

    studentPage.goToRegister();
    studentPage.submitForm(student);

    studentPage.alertMessage("Altura", "Altura não permitida");
  });
});
