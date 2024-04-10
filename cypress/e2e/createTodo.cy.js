const todoName = 'Automated todo';

describe('Todo creation', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('create basic todo', () => {
    cy.wait(2000);
    cy.get('[data-cy="todo-input"]').type(todoName);
    cy.get('[data-cy="create-todo-btn"]').click();
    cy.wait(2000);
    cy.contains(todoName).should('exist');
  });
});
