describe('map', () => {

    it('initial load match snapshot', () => {

        cy.clearLocalStorage();

        cy.visit('/',{

            onBeforeLoad: function (window) {
                window.localStorage.setItem('animation', true);
            }
        })
        .then(() => {
            cy.document()
                .toMatchImageSnapshot();
        });

    });

});