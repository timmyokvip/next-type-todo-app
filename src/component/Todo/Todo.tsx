"use client";
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import HeaderTodo from "../HeaderTodo/HeaderTodo";
import { Spin } from "antd";
import { getAllTodos } from "@/services/apiService";
import useSWR from "swr";

export interface TodoItems {
  // id: string;
  // task: string;
  completed: boolean;
  id: number | string;
  title: string;
  userId: number | string;
}

interface AxiosResponse {}

const Todo: FC = () => {
  const [todo, setTodo] = useState<TodoItems[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string | number>("");
  const [searchItem, setSearchItem] = useState("");
  const [filterTask, setFilterTask] = useState<TodoItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1); // current page
  const [total, setTotal] = useState<number>(0);

  const fetchTodos = async (url: string) => {
    // return await fetch(url).then((res) => res.json());
    const res: any = await getAllTodos();
  };

  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/todos/",
    fetchTodos,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log("check data", todo);

  useEffect(() => {
    setTodo(data);
    // fetchTodos();
  }, []);

  // const fetchTodos = async () => {
  //   const res: any = await getAllTodos();
  //   if (res) {
  //     setTodo(res);
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // search todo
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTask = e.target.value;
    setSearchItem(searchTask);
    if (searchTask === "") {
      setSearchItem("");
      setFilterTask([]);
      setTotal(0);
      return;
    }

    const filterTodo = todo.filter((item) =>
      // item.task.toLowerCase().includes(searchTask.toLowerCase())
      item.title.toLowerCase().includes(searchTask.toLowerCase())
    );

    setFilterTask(filterTodo);
    setTotal(filterTodo.length);
    setCurrentPage(1);
  };

  // filter todo
  const handleFilterTodo = (value: string) => {
    // { value: "lucy", key: "lucy", label: "Lucy (101)" }

    if (value === "all") {
      setFilterTask(todo);
      setTotal(todo.length);
      setCurrentPage(1);
    } else if (value === "done") {
      let taskDone = todo.filter((task) => task.completed === true);
      setFilterTask(taskDone);
      setTotal(taskDone.length);
      setCurrentPage(1);
    } else {
      let taskPending = todo.filter((task) => task.completed === false);
      setFilterTask(taskPending);
      setTotal(taskPending.length);
      setCurrentPage(1);
    }
  };

  // save todo in localStorage
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
      // id: newId,
      // task: newTodo,
      completed: false,
      id: newId,
      title: newTodo,
      userId: newId,
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
      if (item.title === newTodoItem.title) {
        check = false;
        return;
      }
    });

    if (newTodo !== "") {
      if (check === true) {
        setTodo([...todo, newTodoItem]);
        setNewTodo("");
        setSearchItem("");
        setFilterTask([]);
        toast("Thêm todo thành công!");
        saveTodo([...todo, newTodoItem]);
        setTotal(0);
        setCurrentPage(1);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      } else {
        toast.error("Đã có task này !!!");
        setNewTodo("");
        setSearchItem("");
        setFilterTask([]);
        setTotal(0);
        setCurrentPage(1);
      }
    }
  };

  const enter = (e: KeyboardEvent): void => {
    const newId = uuidv4();
    const newTodoItem: TodoItems = {
      // id: newId,
      // task: newTodo,
      completed: false,
      id: newId,
      title: newTodo,
      userId: newId,
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
            updatedTodos.completed = false;
            return [...prevTasks];
          });
          setNewTodo("");
          setEdit(false);
          toast.success("Sửa todo thành công!");
          setSearchItem("");
          setFilterTask([]);
          setTotal(0);
          setCurrentPage(1);
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
          if (item.title === newTodoItem.title) {
            check = false;
            return;
          }
        });

        if (newTodo !== "") {
          if (check === true) {
            setTodo([...todo, newTodoItem]);
            setNewTodo("");
            setSearchItem("");
            setFilterTask([]);
            toast("Thêm todo thành công!");
            setTotal(0);
            setCurrentPage(1);
            saveTodo([...todo, newTodoItem]);
          } else {
            toast.error("Đã có task này !!!");
            setNewTodo("");
            setSearchItem("");
            setFilterTask([]);
            setTotal(0);
            setCurrentPage(1);
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
        updatedTodos.completed = false;
        return [...prevTasks];
      });
    }

    setNewTodo("");
    setEdit(false);
    toast.success("Sửa todo thành công!");
    setSearchItem("");
    setFilterTask([]);
    setTotal(0);
    setCurrentPage(1);
    saveTodo(todo);
  };

  const doneTodo = (id: string | number) => {
    const updatedTodos = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setSearchItem("");
    setFilterTask([]);
    setTotal(0);
    setCurrentPage(1);
    setTodo(updatedTodos);
    saveTodo(updatedTodos);
  };

  const deleteTodo = (id: string | number) => {
    const updatedTodos = todo.filter((todo) => todo.id !== id);
    toast.info("Xóa todo thành công!");
    setNewTodo("");
    setEdit(false);
    setSearchItem("");
    setFilterTask([]);
    setTotal(0);
    setCurrentPage(1);
    setTodo(updatedTodos);
    saveTodo(updatedTodos);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <div className="translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <HeaderTodo
            setTodo={setTodo}
            todo={todo}
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            edit={edit}
            addTodo={addTodo}
            updateTodo={updateTodo}
            enter={enter}
            inputRef={inputRef}
            searchItem={searchItem}
            handleInputChange={handleInputChange}
            handleFilterTodo={handleFilterTodo}
          />
          <TodoItem
            todo={todo}
            editTodo={editTodo}
            doneTodo={doneTodo}
            deleteTodo={deleteTodo}
            filterTask={filterTask}
            currentPage={currentPage}
            paginate={paginate}
            total={total}
          />
          <ToastContainer autoClose={3000} />
        </div>
      )}
    </>
  );
};

export default Todo;
