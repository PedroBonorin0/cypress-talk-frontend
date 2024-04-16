import 'dotenv/config';
import { useEffect, useState } from "react";
import TodoInput from "./todo-components/todoInput";
import TodoList from "./todo-components/todoList";
import axios from 'axios';
import icon from './images/Icon.png'
import Image from 'next/image';

const USERNAME = 'PedroBonorino';

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
    <main className='bg-slate-800 min-h-screen w-screen m-0 p-0'>
      <div
        className="flex flex-col justify-start items-center pt-20 px-1 mx-auto w-1/3 text-slate-100 font-sans"
      >
        <div className="flex items-center justify-between w-full">
          <h1 className="text-5xl">Rockers
            <strong className="block font-bold">To do List</strong>
          </h1>
          <Image src={icon.src} width={120} height={120} alt="img" />
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
      </div>
    </main>
  );
}
