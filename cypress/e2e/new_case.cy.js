describe("grphbook landing page", () => {
  const blankStart = "Start from blank";
  const predefinedStart = "Use a starting layout";

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays two entry points by default", () => {
    cy.contains(blankStart);
    cy.contains(predefinedStart);
  });

  describe("starting from a predefined layout", () => {
    beforeEach(() => {
      cy.contains(predefinedStart).click();
    });

    it("displays 2 nodes", () => {
      cy.get("[data-testid=coding-node]").should("have.length", 1);
      cy.get("[data-testid=desc-node]").should("have.length", 1);
    });
  });

  describe("starting from a predefined layout", () => {
    beforeEach(() => {
      cy.contains(blankStart).click();
    });

    it("displays the import notebook prompt", () => {
      cy.get("[aria-labelledby=download-header-id]").should("have.length", 1);
    });
  });
});
