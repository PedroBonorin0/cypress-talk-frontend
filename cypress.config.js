const { defineConfig } = require("cypress");

let todoId;

module.exports = defineConfig({
  projectId: "uch7h6",
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        saveTodoId(createdTodo) {
          todoId = createdTodo
          return todoId;
        },
        getTodoId() {
          return todoId;
        }
      })
    },
  },
});
