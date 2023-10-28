"use client";
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const todoData = localStorage.getItem("todoList");
    if (todoData) setTodo(JSON.parse(todoData));
  }, []);

  const saveTodo = (todo: TodoItems[]) => {
    localStorage.setItem("todoList", JSON.stringify(todo));
  };

  // valid
  const validTodo = (text: string | number) => {
    return String(text)
      .toLowerCase()
      .match(/^[a-z A-Z 0-9]+$/);
  };

  const addTodo = () => {
    const newId = uuidv4();
    const newTodoItem: TodoItems = {
      id: newId,
      task: newTodo,
      completed: false,
    };

    if (newTodo === "") {
      toast.warning("Vui lòng nhập todo!");
      return;
    }

    // validate
    const isValid = validTodo(newTodo);
    if (!isValid) {
      toast.error("Không nhập kí tự đặt biệt !!!");
      return;
    }

    let check = true;
    todo.map((item, index) => {
      if (item.task.includes(newTodoItem.task)) {
        check = false;
        return;
      }
    });

    if (newTodo !== "") {
      if (check === true) {
        setTodo([...todo, newTodoItem]);
        setNewTodo("");
        toast("Thêm todo thành công!");
        saveTodo([...todo, newTodoItem]);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      } else {
        toast.error("Đã có task này !!!");
        setNewTodo("");
      }
    }
  };

  const enter = (e: KeyboardEvent): void => {
    const newId = uuidv4();
    const newTodoItem: TodoItems = {
      id: newId,
      task: newTodo,
      completed: false,
    };

    if (e.key === "Enter") {
      if (edit === true) {
        if (newTodo === "") {
          toast.warning("Không được để trống!");
          setEdit(false);
          return;
        }

        const isValid = validTodo(newTodo);
        if (!isValid) {
          toast.error("Không nhập kí tự đặt biệt !!!");
          setNewTodo("");
          setEdit(false);
          return;
        }

        if (idEdit) {
          setTodo((prevTasks) => {
            const updatedTodos: any = prevTasks.find(
              (task) => task.id === idEdit
            );
            updatedTodos.task = newTodo;
            return [...prevTasks];
          });
          setNewTodo("");
          setEdit(false);
          toast.success("Sửa todo thành công!");
          saveTodo(todo);
        }
      } else {
        if (newTodo === "") {
          toast.warning("Không được để trống!");
          return;
        }

        // validate
        const isValid = validTodo(newTodo);
        if (!isValid) {
          toast.error("Không nhập kí tự đặt biệt !!!");
          return;
        }

        let check = true;
        todo.map((item, index) => {
          if (item.task.includes(newTodoItem.task)) {
            check = false;
            return;
          }
        });

        if (newTodo !== "") {
          if (check === true) {
            setTodo([...todo, newTodoItem]);
            setNewTodo("");
            toast("Thêm todo thành công!");
            saveTodo([...todo, newTodoItem]);
          } else {
            toast.error("Đã có task này !!!");
            setNewTodo("");
          }
        }
      }
    }
  };

  const editTodo = (id: string | number, item: string) => {
    setNewTodo(item);
    setIdEdit(id);
    setEdit(true);
  };

  const updateTodo = () => {
    if (newTodo === "") {
      toast.warning("Không được để trống!");
      return;
    }

    const isValid = validTodo(newTodo);
    if (!isValid) {
      toast.error("Không nhập kí tự đặt biệt !!!");
      return;
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
    saveTodo(todo);
  };

  const doneTodo = (id: string | number) => {
    const updatedTodos = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodo(updatedTodos);
    saveTodo(updatedTodos);
  };

  const deleteTodo = (id: string | number) => {
    const updatedTodos = todo.filter((todo) => todo.id !== id);
    setTodo(updatedTodos);
    toast.info("Xóa todo thành công!");
    setNewTodo("");
    setEdit(false);
    saveTodo(updatedTodos);
  };

  return (
    <div>
      <HeaderTodo
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        edit={edit}
        addTodo={addTodo}
        updateTodo={updateTodo}
        enter={enter}
        inputRef={inputRef}
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
