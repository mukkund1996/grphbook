describe("grphbook landing page", () => {
  const blankStart = "blank-start";
  const predefinedStart = "template-start";
  const url = "http://localhost:3000";

  beforeEach(() => {
    cy.visit(url);
  });

  it("displays two entry points by default", () => {
    cy.getBySel(blankStart);
    cy.getBySel(predefinedStart);
  });

  describe("starting from a predefined layout", () => {
    beforeEach(() => {
      cy.getBySel(predefinedStart).click();
    });

    it("displays coding and description nodes", () => {
      cy.getBySel("coding-node").should("exist");
      cy.getBySel("desc-node").should("exist");
    });
  });

  describe("starting from a predefined layout", () => {
    beforeEach(() => {
      cy.getBySel(blankStart).click();
    });

    it("displays the import notebook prompt", () => {
      cy.getBySel("upload-dialog").should("exist");
    });
  });
});
