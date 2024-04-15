describe('Deletion', () => {
  before(() => {
    cy.visitAndCreateTodo();
  });

  it('Delete one Todo', () => {
    cy.intercept('DELETE', '/api/todos/*').as('deleteTodo');

    cy.task('getTodoId').then((todoId) => {
      cy.get(`[data-cy="todo-item-${todoId}"]`).find('[data-cy="delete-todo-btn"]').click();
      cy.wait('@deleteTodo');
      cy.get(`[data-cy="todo-item-${todoId}"]`).should('not.exist');
    });
  });
});