import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <input
        className="form-control me-5 "
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        placeholder="Enter a new todo"
      />
      <button
        className="btn btn-success text-white me-2"
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click">
        Add
      </button>
      <button
        className="btn btn-warning text-dark"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click">
        Update
      </button>
    </li>
  );
}
