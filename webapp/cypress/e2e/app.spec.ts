// import { getMyButton } from '../page-objects/app.po'

describe('My App', () => {
  beforeEach(() => cy.visit('http://localhost:4200/login'));

  it('should display the title of the application in the browser tab', () => {
    cy.title().should('include', 'My App');
  });
  /*
  it('should display a sample button', () => {
    getMyButton().contains('My Button')
  })
  */
});
