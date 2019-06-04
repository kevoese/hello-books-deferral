describe('Test Borrowed books Page', () => {
    after(() => {
        cy.clearCookies();
    });
    it('should sign in a patron', () => {
        cy.visit('/signin');
        cy.get('input[type=email]').type('patron.user@gmail.com');
        cy.get('input[type=password]').type('password');
        cy.get('button')
            .contains('Sign in')
            .click()
            .should('be.disabled');
        cy.get('div')
            .contains('Borrowed Books')
            .click();
        cy.url().should('include', '/borrowed');
    });

    // it ('should borrow a book', () => {
    //     if(nodeEnv === 'test') {
    //         cy.visit ('/');
    //         cy.get('a').contains('Explore Now').click();
    //         cy.get('.bookCard').contains(/^AVAILABLE/).click();
    //         cy.contains('button', 'Sign in to Borrow').click();
    //     }
    // });
});
