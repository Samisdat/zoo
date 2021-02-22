describe('slash-animation', () => {

    it('No animation when session storage indicates that already shown', () => {

        cy.clearLocalStorage();

        cy.clock();

        cy.visit('/',{

            onBeforeLoad: function (window) {
                window.localStorage.setItem('animation', true);
            }
        });

        cy.tick(250);
        cy.get('#largeLogo')
            .should('have.css', 'width', '100px')
            .should('have.css', 'height', '82px')


    });

    it('Animation when session storage indicates that first time visit', () => {

        cy.clearLocalStorage();

        cy.clock();

        cy.visit('/');

        cy.tick(250);

        cy.get('#largeLogo')
            .should('have.css', 'width', Cypress.config().viewportWidth + 'px')
            .should('have.css', 'height', Cypress.config().viewportHeight + 'px')

        /*
        cy.screenshot('before animation starts');

        cy.tick(1000);
        cy.screenshot('logo black');

        cy.tick(1250);
        cy.screenshot('logo green');

        cy.tick(500);
        cy.screenshot('logo with pinguins');

        cy.tick(1500);
        cy.screenshot('logo small');
        */
    });

});