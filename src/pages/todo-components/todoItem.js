export default function TodoItem(props) {
  return (
    <div className="bg-white flex items-center justify-between p-2 mb-2 w-full h-12 shadow-md rounded-md text-zinc-800"
      data-cy={`todo-item-${props.todo?._id}`}
    >
      <h2 className="text-lg opacity-85">{props.todo?.name}</h2>
      <button
        onClick={() => props.handleDelete(props.todo)}
        className="w-8 h-8 text-white rounded-full text-2xl bg-[#f68686] hover:bg-[#E97E7E] content-center"
        data-cy={'delete-todo-btn'}
      >&#215;</button>
    </div>
  )
}