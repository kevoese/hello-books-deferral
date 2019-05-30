describe('Books Dashboard', () => {
    it('succesfully performs login action to access dashboard', () => {
        // visit 'baseUrl'
        cy.visit('/');
        // assert if we are in good place - search for a 'get full access  phrase
        // cy.contains('Get unlimited & full access to books on the go ');
        // Locate the hamburger
        cy.get('button[data-testid="nav-hamburger"]').click();
        // get Login button and click it
        cy.get('a[data-testid="signin-test"]').click();
        // check if url have changed
        cy.url().should('includes', '/signin');
        // submit inputs and click submit button
        cy.get('input[data-testid="login-form-email"]').type(
            'admin.user@gmail.com'
        );
        cy.get('input[data-testid="login-form-password"]').type('password');
        cy.get('button[data-testid="login-form-submit"]').click();
        // verify that we were redirected
        cy.url({ timeout: 3000 }).should('includes', '/admin-dashboard');
        // visit 'books'
        cy.visit('/admin/library');
        // assert if we are in good place - search for a 'All Books'  phrase
        cy.contains('All Books');
        cy.contains('TITLE');
        cy.contains('AUTHOR');
        cy.contains('ISBN');
        cy.contains('YEAR');
        cy.contains('ACTION');
        cy.contains('COPIES AVAILABLE');
        // Locate the next pagination button
        cy.get('input[data-testid="nav-next"]').click();
        // Locate the prev pagination button
        cy.get('input[data-testid="nav-prev"]').click();

        // Locate the add book modal
        cy.get('button[data-testid="modal"]').click();

        // submit inputs and click submit button
        cy.get('input[data-testid="form-title"]').type('Test Book');
        cy.get('select[data-testid="form-author"]')
            .select('Green Ernie')
            .should('have.value', '13');
        cy.get('input[data-testid="form-publisher"]').type(
            'Publisher Somebody Book'
        );
        cy.get('textarea[data-testid="form-description"]').type(
            'Publisher Somebody Book'
        );
        cy.get('input[data-testid="form-price"]').type('8900');
        cy.get('input[data-testid="form-year"]').type('2019');
        cy.get('input[data-testid="form-copiesavailable"]').type('19');
        cy.get('input[data-testid="form-isbn"]').type('2019890876557899');
        cy.get('select[data-testid="form-select"]')
            .select('Soft')
            .should('have.value', 'Soft');

        // Submit form
        cy.get('button[data-testid="add-book"]').click();
    });
});
