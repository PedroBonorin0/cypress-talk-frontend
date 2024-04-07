import 'dotenv/config';
import { useEffect, useState } from "react";
import TodoInput from "./todo-components/todoInput";
import TodoList from "./todo-components/todoList";
import axios from 'axios';

const secretUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [todosList, setTodosList] = useState([]);
  
  useEffect(() => {
    console.log(secretUrl);
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoaded(false);
    try {
      const res = await axios.get(`${secretUrl}/todos`);
      setTodosList(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoaded(true);
  }

  const handleCreate = async (todo) => {
    try {
      await createTodo(todo);

      fetchTodos();
    } catch (error) {
      console.log(error); 
    }
  };

  const handleDelete = async (todo) => {
    try {
      await axios.delete(`${secretUrl}/todos/${todo._id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }

  const createTodo = async (name) => {
    try {
      await axios.post(`${secretUrl}/todos`, { name });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24`}
    >
      <h1 className="font-bold text-center text-4xl h-12 border-b w-full mb-4">Rockers Todo List</h1>
      <TodoInput handleSubmit={handleCreate}/>
      {
        !loaded && (
          <h1>Loading...</h1>
        )
      }
      {
        loaded && (
          <TodoList todosList={todosList} handleDelete={handleDelete}/>
        )
      }
    </main>
  );
}
