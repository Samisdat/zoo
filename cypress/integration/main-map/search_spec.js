describe('search on map', () => {

    it('find affenhaus', () => {

        cy.clearLocalStorage();

        cy.visit('/',{

            onBeforeLoad: function (window) {
                window.localStorage.setItem('animation', true);
            }
        });

        cy.get('#map-teaser').should('not.exist');

        cy.get('#map-search').get('input').type('Affenhaus');
        cy.get('.MuiAutocomplete-groupUl').contains('Affenhaus').click();

        cy.get('#map-teaser').should('exist');

    });

});