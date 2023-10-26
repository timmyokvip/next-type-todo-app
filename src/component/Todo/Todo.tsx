"use client";
import React, { FC, useEffect, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import HeaderTodo from "../HeaderTodo/HeaderTodo";

export interface TodoItems {
  id: string;
  task: string;
  completed: boolean;
}

const Todo: FC = () => {
  const [todo, setTodo] = useState<TodoItems[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string | number>("");

  const addTodo = () => {
    if (newTodo !== "") {
      const newId = uuidv4();
      const newTodoItem: TodoItems = {
        id: newId,
        task: newTodo,
        completed: false,
      };
      setTodo([...todo, newTodoItem]);
      setNewTodo("");
      toast("Thêm todo thành công!");
    } else {
      toast.warning("Vui lòng nhập todo!");
    }
  };

  const editTodo = (id: string | number, item: string) => {
    setNewTodo(item);
    setIdEdit(id);
    setEdit(true);
  };

  const updateTodo = () => {
    if (newTodo === "") {
      return toast.warning("Không được để trống!");
    }
    if (idEdit) {
      setTodo((prevTasks) => {
        const updatedTodos: any = prevTasks.find((task) => task.id === idEdit);
        updatedTodos.task = newTodo;
        return [...prevTasks];
      });
    }
    setNewTodo("");
    setEdit(false);
    toast.success("Sửa todo thành công!");
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
    toast.info("Xóa todo thành công!");
    setNewTodo("");
    setEdit(false);
  };

  return (
    <div>
      <HeaderTodo
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        edit={edit}
        addTodo={addTodo}
        updateTodo={updateTodo}
      />
      <TodoItem
        todo={todo}
        editTodo={editTodo}
        doneTodo={doneTodo}
        deleteTodo={deleteTodo}
      />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Todo;
