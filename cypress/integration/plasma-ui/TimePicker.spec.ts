context('TimePicker', () => {
    beforeEach(() => {
        cy.visit('/iframe.html?id=controls-pickers--time-picker&viewMode=story');
    });

    it('snapshot', () => {
        cy.matchImageSnapshot();
    });
});
