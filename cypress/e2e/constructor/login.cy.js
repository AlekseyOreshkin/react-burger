import { makeLogin } from './make-login'

describe('perform login action', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })
    
    it ('should login', () => {
        cy.get('div').contains('Личный кабинет').click();

        makeLogin();
      })
});


