const baseUrl = Cypress.env("base_url");

describe("Update Contact", () => {
  let lenBefore;

  it("get the number of contacts before delete", () => {
    cy.visit(baseUrl);
    cy.get("table")
      .find("[data-testid=delete-icon]")
      .its("length")
      .then((len) => {
        lenBefore = len;
      });
  });

  it("should not delete when user does not confirm", () => {
    cy.visit(baseUrl);
    cy.get("[data-testid=delete-icon]").first().click();
    // click cancel when conirm alert shows
    cy.on("window:confirm", () => false);
    cy.get("[data-testid=delete-icon]").should("have.length", lenBefore);
  });

  it("should delete when user confirms", () => {
    cy.visit(baseUrl);
    cy.get("[data-testid=delete-icon]").first().click();
    // click ok when conirm alert shows
    cy.on("window:confirm", () => true);
    cy.get("[data-testid=delete-icon]").should("have.length", lenBefore - 1);
  });
});
