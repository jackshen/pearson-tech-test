context("ChangeInput", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234");
  });

  it("works properly", () => {
    cy.findByLabelText("Velocity (km/s)").type("-100");

    cy.document().toMatchImageSnapshot();

    cy.findByLabelText("Velocity (km/s)").type("{selectall}{backspace}");

    cy.findByLabelText("Velocity (km/s)").type("100");

    cy.document().toMatchImageSnapshot();
  });
});
