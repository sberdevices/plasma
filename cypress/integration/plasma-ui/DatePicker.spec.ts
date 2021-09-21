context('DatePicker', () => {
    beforeEach(() => {
        cy.visit('/iframe.html?id=controls-pickers--date-picker&viewMode=story');
    });

    it('snapshot', () => {
        cy.matchImageSnapshot();
    });
});
