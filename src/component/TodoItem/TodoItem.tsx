"use client";
import { Button, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { TodoItems } from "../Todo/Todo";

interface Props {
  todo: TodoItems[];
  editTodo: (id: string | number, item: string) => void;
  doneTodo: (id: string | number) => void;
  deleteTodo: (id: string | number) => void;
}

const TodoItem = (props: Props) => {
  const { todo, editTodo, doneTodo, deleteTodo } = props;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const response = await fetch(` `);
    const result = await response.json();
    // setCoinsData(result);
    // setTotalPages(totalPages);
  };

  const handlePrevPage = (prevPage: number) => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    setPage((nextPage) => nextPage + 1);
  };

  return (
    <div>
      <ul
        id="myUL "
        className="listtodo w-[1280px] m-auto mt-6 border border-gray-300 rounded-xl shadow-xl overflow-hidden"
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
      <div className="my-14 text-right mr-12">
        <Pagination defaultCurrent={1} total={20} />
      </div>
    </div>
  );
};

export default TodoItem;
