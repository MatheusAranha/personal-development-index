describe("Newsletter Subscribe Form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })

    it("allows user to subscribe to the email list", () => {

        cy.getByData("email-input").type("tom@aol.com")
        cy.getByData("submit-button").click()

        cy.getByData("success-message").should("exist").contains("tom@aol.com")
    })

    it("does NOT allow an invalid email address", () => {

        cy.getByData("email-input").type("tom")
        cy.getByData("submit-button").click()

        cy.getByData("success-message").should("not.exist")
    })

    it("does NOT allow an already subscribed email address", () => {

        cy.getByData("email-input").type("john@example.com")
        cy.getByData("submit-button").click()

        cy.getByData("server-error-message").should("exist").contains("Please use a different email address.")
    })
})