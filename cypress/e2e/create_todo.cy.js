describe('Creation', () => {
  before(() => {
    cy.intercept('GET', '/api/todos/*').as('fetchTodos');
    cy.visit('http://localhost:3000');
    cy.wait('@fetchTodos');
  });

  it('Create Todo', () => {
    cy.intercept('POST', '/api/todos').as('createTodo');

    cy.get('[data-cy="todo-input"]').type('Automated todo');
    cy.get('[data-cy="create-todo-btn"]').click();
    cy.wait('@createTodo').then((res) => {
      cy.task('saveTodoId', res.response.body._id);
    });

    cy.task('getTodoId').then((todoId) => {
      cy.get(`[data-cy="todo-item-${todoId}"]`).should('exist');
    });
  });

  after(() => {
    cy.deleteTodo();
  });
});