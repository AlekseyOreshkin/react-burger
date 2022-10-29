export const makeLogin = () => {
    let emailInput = cy.get('input[name="email"]');
    emailInput.next('div').click();
    emailInput.type('alxrsk@yandex.ru');
    cy.get('input[name="password"]').type('yandex_pwd');
    cy.get('button').contains('Войти').click();
}
