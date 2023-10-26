"use client";
import { Button } from "antd";
import React, { FC } from "react";
import { TodoItems } from "../Todo/Todo";

interface Props {
  todo: TodoItems[];
  editTodo: (id: string | number, item: string) => void;
  doneTodo: (id: string | number) => void;
  deleteTodo: (id: string | number) => void;
}

const TodoItem = (props: Props) => {
  const { todo, editTodo, doneTodo, deleteTodo } = props;

  return (
    <>
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
    </>
  );
};

export default TodoItem;
