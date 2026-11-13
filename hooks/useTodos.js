import { useState, useEffect } from "react";
import { data } from "../data/todos";
import { saveTodos, getTodos } from "../services/todoStorage";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const storedTodos = await getTodos();

    if (storedTodos.length > 0) {
      setTodos(storedTodos);
    } else {
      setTodos(data.sort((a, b) => b.id - a.id));
    }
  };

  const addTodo = async (title) => {
    if (!title.trim()) return false;

    const newId = todos.length > 0 ? todos[0].id + 1 : 1;

    const updatedTodos = [
      {
        id: newId,
        title,
        completed: false,
      },
      ...todos,
    ];

    setTodos(updatedTodos);
    await saveTodos(updatedTodos);

    return true;
  };

  const toggleTodo = async (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo,
    );

    setTodos(updatedTodos);
    await saveTodos(updatedTodos);
  };

  const removeTodo = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
    await saveTodos(updatedTodos);
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
}
