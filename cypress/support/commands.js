Cypress.Commands.add('visitAndCreateTodo', () => {
  cy.intercept('GET', '/api/todos/*').as('fetchTodos');
  cy.intercept('POST', '/api/todos').as('createTodo');

  cy.visit(Cypress.env('base_front'));
  cy.wait('@fetchTodos');

  cy.get('[data-cy="todo-input"]').type('Automated todo');
  cy.get('[data-cy="create-todo-btn"]').click();
  cy.wait('@createTodo').then((res) => {
    cy.task('saveTodoId', res.response.body._id);
  });

  cy.task('getTodoId').then((todoId) => {
    cy.get(`[data-cy="todo-item-${todoId}"]`).should('exist');
    });
});

Cypress.Commands.add('deleteTodo', () => {
  cy.task('getTodoId').then(todoId => {
    cy.request('DELETE', `${Cypress.env('base_url')}/api/todos/${todoId}`);
    cy.log('Deleted todo: ', todoId);
  });
});