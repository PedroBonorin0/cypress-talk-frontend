import 'dotenv/config';
import { useEffect, useState } from "react";
import TodoInput from "./todo-components/todoInput";
import TodoList from "./todo-components/todoList";
import NoTodos from './todo-components/noTodos';
import axios from 'axios';
import icon from './images/Icon.png'

const USERNAME = 'PedroBonorino';

const secretUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;
const imgSize = '120px';

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
      const res = await axios.get(`${secretUrl}/todos/${USERNAME}`);
      setTodosList(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaded(true);
    }
  }

  const handleCreate = async (todo) => {
    setLoaded(false);

    try {
      await axios.post(`${secretUrl}/todos`, { name: todo, user: USERNAME });
    } catch (error) {
      console.log(error);
    } finally {
      fetchTodos();
    }
  };

  const handleDelete = async (todo) => {
    setLoaded(false);

    try {
      await axios.delete(`${secretUrl}/todos/${todo._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      fetchTodos();
    }
  }

  return (
    <main
      className="flex flex-col justify-start items-center mt-20 p-1 mx-auto w-1/3 text-[#606060] font-sans"
    >
      <div className="flex items-center justify-between w-full">
        <h1 className="text-5xl">Rockers
          <strong className="block font-bold">To do List</strong>
        </h1>
        <img src={icon.src}  width={imgSize} />
      </div>
      <TodoInput handleSubmit={handleCreate}/>
      {
        !loaded && (
          <h1 className="mt-8 text-5xl">Loading...</h1>
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
