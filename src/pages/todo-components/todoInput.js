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
    <form className="flex align-middle justify-center mb-4">
      <input
        name="todo" value={input} onChange={handleChange} placeholder="Type new Todo"
        className="outline-none border-b border-violet-700 mr-2 h-8 px-2 bg-slate-100"
      />
      <button
        type="submit" onClick={(e) => submitEvent(e)}
        className="bg-violet-700 text-white h-8 w-16 text-lg"
      >New</button>
    </form>
  )
}