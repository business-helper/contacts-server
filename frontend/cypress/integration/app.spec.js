describe("visit home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    it("should show add contact button", () => {
      cy.get("[data-testid=add-contact").should("exist");
    });
  });
});

it("should show add contact button", () => {
  cy.visit("http://localhost:3000");
  const addContactButton = cy.get("[data-testid=add-contact");
  addContactButton.should("exist");
  addContactButton.should("have.text", "Add Contact");
});
