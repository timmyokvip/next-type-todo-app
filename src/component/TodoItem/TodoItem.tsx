"use client";
import { Button, Pagination, PaginationProps } from "antd";
import React, { useState } from "react";
import { TodoItems } from "../Todo/Todo";

interface Props {
  todo: TodoItems[];
  editTodo: (id: string | number, item: string) => void;
  doneTodo: (id: string | number) => void;
  deleteTodo: (id: string | number) => void;
  filterTask: TodoItems[];
  currentPage: number;
  paginate: (pageNumber: number) => void;
  total: number;
}

const TodoItem = (props: Props) => {
  const {
    todo,
    editTodo,
    doneTodo,
    deleteTodo,
    filterTask,
    currentPage,
    paginate,
    total,
  } = props;
  const [postsPerPage, setPostsPerPage] = useState<number>(10); // 1 trang có bao nhiêu todo
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = todo.slice(indexOfFirstPost, indexOfLastPost);
  const currentFilter = filterTask.slice(indexOfFirstPost, indexOfLastPost);
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPostsPerPage(pageSize);
  };
  return (
    <div>
      <ul
        id="myUL "
        className="listtodo w-[1280px] m-auto mt-6 border border-gray-300 rounded-xl shadow-xl overflow-hidden"
      >
        {currentFilter && currentFilter.length > 0
          ? currentFilter.map((item, index) => {
              return (
                <li
                  key={item.id}
                  className={
                    item.completed === true
                      ? "flex justify-between checked"
                      : "flex justify-between"
                  }
                >
                  {item.title}
                  <div>
                    <Button
                      className="bg-yellow-500 text-white"
                      onClick={() => editTodo(item.id, item.title)}
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
            })
          : currentPosts.map((item, index) => {
              return (
                <li
                  key={item.id}
                  className={
                    item.completed === true
                      ? "flex justify-between checked"
                      : "flex justify-between"
                  }
                >
                  {item.title}
                  <div>
                    <Button
                      className="bg-yellow-500 text-white"
                      onClick={() => editTodo(item.id, item.title)}
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

        {todo.length === 0 && <li>Không có task !!!</li>}
      </ul>
      <div className="my-14 text-right mr-12">
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={total ? total : todo.length}
          onChange={(pageNumber) => paginate(pageNumber)}
          defaultPageSize={postsPerPage} // 1 trang có bao nhiêu todo
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </div>
  );
};

export default TodoItem;
