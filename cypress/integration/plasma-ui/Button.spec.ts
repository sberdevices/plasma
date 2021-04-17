context('Button', () => {
    beforeEach(() => {
        cy.visit('/iframe.html?id=controls-button--default&viewMode=story');
    });

    it('snapshot', () => {
        cy.matchImageSnapshot();
    });
});
