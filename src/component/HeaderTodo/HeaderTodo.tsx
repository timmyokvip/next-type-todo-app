"use client";
import { Select } from "antd";
import React from "react";

interface Props {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  edit: boolean;
  addTodo: () => void;
  updateTodo: () => void;
}

const HeaderTodo = (props: Props) => {
  const { newTodo, setNewTodo, edit, addTodo, updateTodo } = props;
  return (
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
        <button
          className="editBtn bg-yellow-500 text-white"
          onClick={() => updateTodo()}
        >
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
  );
};

export default HeaderTodo;
