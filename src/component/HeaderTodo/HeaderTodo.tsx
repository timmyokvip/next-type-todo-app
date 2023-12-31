"use client";
import React, { useState, KeyboardEvent } from "react";
import { Select, Switch } from "antd";
import Link from "next/link";
import NewTodo from "../NewTodo";

interface Props {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  edit: boolean;
  addTodo: () => void;
  updateTodo: () => void;
  enter: (e: KeyboardEvent) => void;
  inputRef: HTMLInputElement | null | any;
  searchItem: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterTodo: (value: string) => void;
}

const HeaderTodo = (props: Props) => {
  const {
    newTodo,
    setNewTodo,
    edit,
    addTodo,
    updateTodo,
    enter,
    inputRef,
    searchItem,
    handleInputChange,
    handleFilterTodo,
  } = props;
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
        <h2 className="uppercase">My To Do List </h2>

        <NewTodo />
      </div>
      <div className="p-12 pt-0 flex  gap-5">
        <div className="w-[55%] ">
          <span className="block">Search Todo</span>
          <input
            type="text"
            placeholder="Search Todo..."
            className="text-black w-full outline-none"
            value={searchItem}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="w-[25%] ">
          <p>Filter Todo</p>
          <Select
            className="w-full"
            size="large"
            defaultValue="all"
            onChange={(value) => handleFilterTodo(value)}
            options={[
              {
                value: "all",
                label: "All",
              },
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "done",
                label: "Done",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderTodo;
