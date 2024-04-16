import { useState } from "react"

export default function TodoInput({handleSubmit}) {
  const [input, setInput] = useState('');
  
  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const submitEvent = (e) => {
    e.preventDefault();

    if(input === '')
      return;

    handleSubmit(input);
    setInput('');
  }

  return (
    <form className="flex align-middle justify-center mt-8 w-full">
      <input
        name="todo" value={input} onChange={handleChange} placeholder="Type new Todo"
        data-cy="todo-input"
        className="outline-none border-2 border-b-4 rounded-md border-[#7C95EB] mr-2 h-10 px-2 text-zinc-800 bg-white w-3/4 shadow-md opacity-85"
      />
      <button
        type="submit" onClick={(e) => submitEvent(e)}
        data-cy="create-todo-btn"
        className="bg-[#7C95EB] text-white rounded-full w-1/4 leading- text-3xl line hover:bg-[#6C82CA] shadow-md"
      >&#43;</button>
    </form>
  )
}