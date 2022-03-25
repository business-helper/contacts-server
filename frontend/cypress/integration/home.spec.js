const baseUrl = Cypress.env("base_url");

describe("Home page", () => {
  it("should show add contact button", () => {
    cy.visit(baseUrl);
    const addContactButton = cy.get("[data-testid=add-contact");
    addContactButton.should("exist");
    addContactButton.should("have.text", "Add Contact");
  });

  it("should navigate to /contacts/add on click add button", () => {
    cy.visit(baseUrl);
    cy.get("[data-testid=add-contact]").click();
    cy.url().should("include", "/contacts/add");
  });
});
