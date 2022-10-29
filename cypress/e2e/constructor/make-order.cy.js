import { makeLogin } from "./make-login";

describe('make order', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
    
    const addItem = (item, target) => {
        item.trigger('dragstart').trigger('dragleave');
        target.trigger('dragenter').trigger("dragover").trigger("drop").trigger("dragend");
    }

    const getItem = (item) => {
        return cy.get(`[data-testid=${item}]`);
    }

    const selectItem = (category) => {
        return category.children('a').first();
    }

    it ('add ingredients to constructor', () => {
        cy.visit('http://localhost:3000');
        cy.intercept('POST', '/api/orders').as('getOrder');


        cy.get('button').contains('Оформить заказ').should('be.disabled');

        const bun = selectItem(getItem('bun_cat'));
        const main = selectItem(getItem('main_cat'));
        const sauce = selectItem(getItem('sauce_cat'));
        const constructor = getItem('drop-target');
        addItem(bun, constructor);
        addItem(main, constructor);
        addItem(sauce, constructor);
        
        cy.get('button').contains('Оформить заказ').should('be.enabled');

        cy.get('button').contains('Оформить заказ').click();

        makeLogin();

        cy.get('button').contains('Оформить заказ').click();

        cy.wait('@getOrder');
        
        cy.get('[data-testid=close-modal-btn]').click();
    })

  }); 