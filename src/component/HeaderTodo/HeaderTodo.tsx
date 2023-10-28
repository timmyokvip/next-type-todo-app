"use client";
// import { Select } from "antd";
import React, { useState, KeyboardEvent } from "react";
import { Switch } from "antd";

import Link from "next/link";

interface Props {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  edit: boolean;
  addTodo: () => void;
  updateTodo: () => void;
  enter: (e: KeyboardEvent) => void;
  inputRef: HTMLInputElement | null | any;
}

const HeaderTodo = (props: Props) => {
  const { newTodo, setNewTodo, edit, addTodo, updateTodo, enter, inputRef } =
    props;
  const [isTheme, setIsTheme] = useState<boolean>(true);

  const onChange = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    setIsTheme(!isTheme);
  };

  return (
    <div
      className={
        isTheme ? "bg-slate-600 text-white" : "bg-fuchsia-900 text-white"
      }
    >
      <nav className="flex justify-end py-6 mr-12 ">
        <div className=" ">
          <Switch defaultChecked onChange={onChange} />
          <Link
            href={"/login"}
            className="bg-gray-900 text-white p-3 rounded-xl ml-5"
          >
            Đăng nhập
          </Link>
          <Link
            href={"/register"}
            className="border border-gray-500 p-3 rounded-xl ml-3"
          >
            Đăng ký
          </Link>
        </div>
      </nav>
      <div id="myDIV" className="header">
        <h2>My To Do List </h2>
        <input
          className="text-black outline-none"
          type="text"
          id="myInput"
          placeholder={edit === true ? "Update to do..." : "Add to do..."}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyUp={enter}
          ref={inputRef}
        />
        {edit === false ? (
          <button className="addBtn" onClick={() => addTodo()}>
            Add
          </button>
        ) : (
          <button
            className="editBtn bg-yellow-500 text-white"
            onClick={() => updateTodo()}
          >
            Update
          </button>
        )}
      </div>
      {/* <Select
        defaultValue="Filter"
        className="mb-2 ml-12 text-left"
        style={{ width: 240 }}
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "done", label: "Done" },
        ]}
      /> */}
    </div>
  );
};

export default HeaderTodo;
