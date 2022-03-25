const baseUrl = Cypress.env("base_url");

describe("Add Contact", () => {
  it("should not submit without required values filled", () => {
    cy.visit(`${baseUrl}/contacts/add`);
    cy.get("form").submit();

    cy.get(".form-error").should("exist");
    cy.contains("Name is required!");
    cy.contains("Last name is required!");
    cy.contains("Email is required!");
    cy.contains("PhoneNumber is required!");
    cy.contains("Age is required!");
  });

  it("should show avatar image on select file", () => {
    cy.visit(`${baseUrl}/contacts/add`);
    cy.get("[data-testid=input-avatarFile]").attachFile("avatar.gif");
    cy.get("[data-testid=img-avatar]").should("exist");
  });

  it("should submit form", () => {
    cy.get("[data-testid=input-name]").type("AAA");
    cy.get("[data-testid=input-lastName]").type("Test");
    cy.get("[data-testid=input-email]").type("aaa@test.com");
    cy.get("[data-testid=input-phoneNumber]").type("1234567890");
    cy.get("[data-testid=input-age]").type(25);
    cy.get("[data-testid=input-tags]").type("aaa,test,cypress");
    cy.get("[data-testid=input-avatarFile]").attachFile("avatar.gif");
    cy.get("[data-testid=input-linkToWebsite]").type("https://google.com");
    cy.get("[data-testid=input-tags]").type("aaa,test,cypress");
    cy.get("[type=submit").click();

    cy.url().should("eq", `${baseUrl}/contacts`); //.to.equal(`${baseUrl}/contacts`);
  });
});
