export default function TodoItem(props) {
  return (
    <div className="flex items-center justify-between py-2 mt-2 w-full h-8 pl-4 bg-slate-200">
      <h2 className="text-lg">{props.todo.name}</h2>
      <button
        onClick={() => props.handleDelete(props.todo)}
        className="w-8 h-8 bg-red-500 text-white"  
      >X</button>
    </div>
  )
}