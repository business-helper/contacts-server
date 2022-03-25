const baseUrl = Cypress.env("base_url");

describe("Update Contact", () => {
  it("should submit form", () => {
    cy.visit(baseUrl);

    cy.get("[data-testid=edit-icon]").first().click();

    // should be in update contact page.
    cy.url().should("include", `${baseUrl}/contacts/`);

    // update the tags and submit
    cy.get("[data-testid=input-tags]").type(",updated");
    cy.get("form").submit();
    cy.url().should("eq", `${baseUrl}/contacts`);
  });
});
