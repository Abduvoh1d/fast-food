describe('template spec', () => {
    it('Enter Auth', () => {
        // Login sahifasiga o'ting
        cy.visit('http://localhost:5050/login');

        cy.get('input[id="basic_username"]').type('sys');
        cy.get('input[id="basic_password"]').type('123');


        // Tugmani bosish
        cy.get('button[type="submit"]').click();
        cy.intercept('POST', 'http://51.20.10.41:8080/auth/login').as('loginRequest');

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    });
});
