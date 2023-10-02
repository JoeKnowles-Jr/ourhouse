import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const TodoContext = createContext({});

export const useTodos = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const addTodo = async (todo) => {
    todo.created_at = new Date();
    todo.updated_at = new Date();
    const { data, error } = await supabase
      .from("todos")
      .insert(todo)
      .select();
    if (data) {
      setTodos((prevTodos) => [...prevTodos, data[0]]);
      setMsg("Todo Added Successfully");
    }
    if (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  const editTodo = async (todo, id) => {
    const { data, error } = await supabase
      .from("todos")
      .update(todo)
      .eq("id", id)
      .select();
    if (error) {
      setErrorMsg(error.message);
      console.error(error);
    }
    if (data) {
      setMsg("Todo Updated");
      const updatedTodos = todos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, ...data[0] };
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setMsg("Todo Deleted Successfully");
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== id)
      );
    }
  };

  const fetchAll = async () => {
    const { data, error } = await supabase.from("todos").select();
    if (data) setTodos(data);
    if (error) setErrorMsg("Error in Fetching Todos");
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        msg,
        setMsg,
        errorMsg,
        setErrorMsg,
        editTodo,
        deleteTodo
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;