describe("importing notebooks", () => {
  const url = "http://localhost:3000";
  let notebook;
  beforeEach(() => {
    cy.fixture("testImport.json").then(data => {
      notebook = JSON.stringify(data);
    });
    cy.visit(url);
    cy.getBySel("blank-start").click();
  });

  describe("imports the inputted notebook", () => {
    beforeEach(() => {
      cy.getBySel("upload-textarea").type(notebook, {
        parseSpecialCharSequences: false,
      });
      cy.getBySel("upload-submit-button").click();
    });

    it("closes the upload dialog box", () => {
      cy.getBySel("upload-dialog").should("not.exist");
    });

    it("displays the coding node with the correct value", () => {
      cy.getBySel("coding-node").should("exist");
      cy.getBySel("desc-node").should("exist");
    });
  });

  describe("cancellation and wrong inputs", () => {
    beforeEach(() => {
      cy.getBySel("upload-textarea").type("not a notebook");
      cy.getBySel("upload-submit-button").click();
    });

    it("submits an incorrect input", () => {
      cy.getBySel("upload-error-textarea").should("exist");
    });

    it("closes the upload dialog box and reopens with a reset dialog", () => {
      cy.getBySel("upload-dialog").children("button").click();
      cy.getBySel("upload-dialog").should("not.exist");
      cy.getBySel("upload-button").click();
      cy.getBySel("upload-error-textarea").should("not.exist");
    });
  });
});
