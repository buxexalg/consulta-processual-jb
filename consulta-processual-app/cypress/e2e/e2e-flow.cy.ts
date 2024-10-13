describe("E2E Test - Processos app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  const numeroCnj = "0000001-23.2023.1.00.0000";
  const tribunal = "STF";

  describe("Test CNJ flow", () => {
    it("should allow search by valid CNJ number", () => {
      cy.get('input[placeholder="Número de processo"]').type(numeroCnj);

      cy.contains("button", "Buscar").click();

      cy.url().should("include", `/processos/${numeroCnj}`, { timeout: 20000 });

      cy.contains(`Processo n. ${numeroCnj}`);

      cy.contains("h3", `Processo n. ${numeroCnj} do STF`).click();

      cy.contains("Movimentações");
      cy.contains("Partes envolvidas");
    });

    it("should validate invalid CNJ number format", () => {
      cy.intercept("POST", "/graphql");

      cy.get('input[placeholder="Número de processo"]').type("123");

      cy.contains("button", "Buscar").click();

      cy.contains(
        "Valor inválido de CNJ. O formato deve ser NNNNNNN-NN.NNNN.N.NN.NNNN"
      );
    });
  });

  describe("Test Tribunal flow", () => {
    it("should allow search by Tribunal", () => {
      cy.get("select").select(tribunal);

      cy.contains("button", "Buscar").click();

      cy.url().should("include", `/processos/${tribunal}`, { timeout: 20000 });

      cy.contains("h3", `Processo n. ${numeroCnj} do STF`).click();

      cy.contains("Processo n.");
      cy.contains("Movimentações");
      cy.contains("Partes envolvidas");
    });

    it('should display "Nenhum processo encontrado" if no process is returned', () => {
      cy.get("select").select("TRT23");

      cy.contains("button", "Buscar").click();

      cy.url().should("include", "/processos/TRT23");

      cy.contains("Nenhum processo encontrado");
    });
  });

  describe("Error cases", () => {
    it("should validate empty inputs", () => {
      cy.contains("button", "Buscar").click();

      cy.contains("Selecione um tribunal ou insira um CNJ");

      cy.get("select").select("TRT23");

      cy.contains("Selecione um tribunal ou insira um CNJ").should("not.exist");

      cy.contains("button", "Buscar").click();

      cy.url().should("include", "/processos/TRT23");
    });
  });
});
