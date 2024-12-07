import { useEffect, useState } from "react";

interface Todo {
  title: string;
  checked: boolean;
  id: number;
}

interface CreateTodo {
  title: string;
  checked: boolean;
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/todos");
  const responseJson = await response.json();

  return {
    props: { initialTodos: responseJson.todos },
  };
};

export default function Home({ initialTodos = [] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = document.querySelector("input");
    if (input) {
      const newTodo: CreateTodo = {
        title: input.value,
        checked: false,
      };

      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
      });

      const responseJson: {
        title: string;
        checked: boolean;
        id: number;
      } = await response.json();

      setTodos([...todos, responseJson]);
      input.value = "";
    }
  };

  const handleClickCheckbox = async (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });

    setTodos(newTodos);
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
    });
  };

  return (
    <div className="mt-11 w-96 mx-auto">
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input type="text" placeholder="Add a new todo" />
        <button>Add</button>
      </form>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="flex items-center">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleClickCheckbox(todo.id)}
              />
              <p className="ml-2">{todo.title}</p>
              <p>{todo.id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
