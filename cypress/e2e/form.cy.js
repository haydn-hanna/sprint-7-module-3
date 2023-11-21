describe('check form input',()=>{
    it('can be submitted',()=>{
        cy.visit('http://localhost:3003/')
        cy.get("#username").type("Haydn").should('have.value',"Haydn")
        cy.get('#javascript-radio').check()
        cy.get('#favFood').select('Pizza')
        cy.get("#agreement").check().should('not.be.disabled')
        cy.get("#submit").should('not.be.disabled')
        cy.get('#submit').click()
        cy.get('.success').should('be.visible') 
    })
})