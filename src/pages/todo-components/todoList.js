import NoTodos from "./noTodos"
import TodoItem from "./todoItem"

export default function TodoList(props) {
  return (
    <div className="flex flex-col justify-center align-middle w-full mt-4">
      {
        !props.todosList?.length && (
          <NoTodos />
        )
      }
      {
        props.todosList?.map((todo) => {
          return (
            <TodoItem todo={todo} key={todo._id} handleDelete={props.handleDelete} />
          )
        })
      }
    </div>
  )
}