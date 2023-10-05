describe('Sample Test', () => {
    it('Visits the app, clicks a button, and checks if the UI updates', () => {
      cy.visit('/');
      cy.contains('Filter by Code Length').should('exist');

      cy.get('button').click();
      
  
      cy.contains('Filtered Data').should('exist');
    });
  });
  