"use client";
import React, { FC, useEffect, useState } from "react";
import { Button, Select } from "antd";
// import TableTodo from "../TableTodo/TableTodo";
import { v4 as uuidv4 } from "uuid";

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

const Todo: FC = () => {
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [getTodo, setGetTodo] = useState<null | {}>();

  const addTodo = () => {
    if (newTodo !== "") {
      const newId = uuidv4();
      const newTodoItem: TodoItem = {
        id: newId,
        task: newTodo,
        completed: false,
      };
      setTodo([...todo, newTodoItem]);
      setNewTodo("");
    }
  };

  const editTodo = (id: string | number, item: string) => {
    setNewTodo(item);
    // console.log(item);
    console.log(newTodo);
    setEdit(true);
  };

  const updateTodo = () => {
    const updatedTodos = todo.find((item) => {});
  };

  const doneTodo = (id: string | number) => {
    const updatedTodos = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodo(updatedTodos);
  };

  const deleteTodo = (id: string | number) => {
    const updatedTodos = todo.filter((todo) => todo.id !== id);
    setTodo(updatedTodos);
  };

  return (
    <div>
      <div id="myDIV" className="header bg-slate-600 text-white">
        <h2>My To Do List </h2>
        <input
          className="text-black"
          type="text"
          id="myInput"
          placeholder="Add to do..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        {edit === false ? (
          <button className="addBtn" onClick={() => addTodo()}>
            Add
          </button>
        ) : (
          <button className="addBtn" onClick={() => updateTodo()}>
            Update
          </button>
        )}
        <Select
          defaultValue="Filter"
          className="mt-2"
          style={{ width: 120 }}
          options={[
            { value: "all", label: "All" },
            { value: "pending", label: "Pending" },
            { value: "done", label: "Done" },
          ]}
        />
      </div>
      <ul
        id="myUL "
        className="w-[1280px] m-auto border border-gray-300 rounded-xl shadow-xl overflow-hidden"
      >
        {todo.map((item, index) => {
          return (
            <li
              key={item.id}
              className={
                item.completed === true
                  ? "flex justify-between checked"
                  : "flex justify-between"
              }
            >
              {item.task}
              <div>
                <Button
                  className="bg-yellow-500 text-white"
                  onClick={() => editTodo(item.id, item.task)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-blue-500 text-white mx-6"
                  onClick={() => doneTodo(item.id)}
                >
                  Done
                </Button>
                <Button
                  className="text-white bg-red-600"
                  onClick={() => deleteTodo(item.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      {/* <TableTodo
        todoList={todoList}
        setTodoList={setTodoList}
        setTodo={setTodo}
      /> */}
    </div>
  );
};

export default Todo;
