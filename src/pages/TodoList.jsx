import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import TodoModal from "../components/todo/TodoModal";
import { useTodos } from "../context/TodoProvider";
import ConfirmTodoDeleteModal from "../components/todo/ConfirmTodoDeleteModal";
import ToastMessage from "../components/ToastMessage";

const TodoList = () => {
  const { todos } = useTodos();
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [type, setType] = useState("");
  const [activeTodo, setActiveTodo] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const closeTodoModal = () => {
    setActiveTodo({});
    setShowTodoModal(false);
    setType("");
  };

  const closeConfirmModal = () => {
    setActiveTodo({});
    setShowConfirmModal(false);
  };

  const handleAdd = () => {
    setType("Add");
    setShowTodoModal(true);
  };

  return (
    <div>
      {/* <ToastMessage
        type="Success"
        show={msg ? true : false}
        message={msg}
        handleClose={() => setMsg("")}
      /> */}
      {/* <ToastMessage
        type="Error"
        show={errorMsg ? true : false}
        message={errorMsg}
        handleClose={() => setErrorMsg("")}
      /> */}
      <TodoModal
        show={showTodoModal}
        handleClose={closeTodoModal}
        type={type}
        todo={activeTodo}
      />
      <ConfirmTodoDeleteModal
        show={showConfirmModal}
        handleClose={closeConfirmModal}
        id={activeTodo.id}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
          marginBottom: "10px"
        }}>
        <h2 className="text-center">Todo List</h2>
        <Button onClick={handleAdd}>Add Todo</Button>
      </div>
      <Table
        striped
        bordered
        responsive
        variant="dark"
      // style={{ maxWidth: "800px", justifyContent: "center" }}
      >
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Id</th>
            <th style={{ width: "30%" }}>Title</th>
            <th style={{ width: "30%" }}>Priority</th>
            <th style={{ width: "30%" }}>Description</th>
            <th style={{ width: "5%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, idx) => (
            <tr key={idx}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.priority}</td>
              <td>{todo.description}</td>
              <td className="d-flex flex-row justify-content-around">
                <i
                  className="bi bi-pencil-square icon"
                  onClick={() => {
                    setActiveTodo(todo);
                    setType("Edit");
                    setShowTodoModal(true);
                  }}></i>
                <i
                  className="bi bi-trash icon"
                  onClick={() => {
                    setActiveTodo(todo);
                    setShowConfirmModal(true);
                  }}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TodoList;