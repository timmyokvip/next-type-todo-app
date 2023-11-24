import { addTodoAction } from "@/redux/reducers/todoSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { TodoItems } from "./Todo/Todo";
import { v4 as uuidv4 } from "uuid";
import { setLocal } from "@/utils/localStorage";

const NewTodo = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const submit = () => {
    if (input !== "") {
      const newId = uuidv4();
      const data: TodoItems = {
        completed: false,
        id: newId,
        title: input,
        userId: newId,
      };
      const arrData: TodoItems[] = [data];
      setLocal("todo-list", arrData);

      const action = addTodoAction(data);
      dispatch(action);
    }
  };

  return (
    <>
      <input
        className="text-black outline-none"
        type="text"
        id="myInput"
        // placeholder={edit === true ? "Update to do..." : "Add to do..."}
        placeholder={"Add to do..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        // value={newTodo}
        // onChange={(e) => setNewTodo(e.target.value)}
        // onKeyUp={enter}
        // ref={inputRef}
      />
      {/* {edit === false ? (
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
      )} */}
      <button className="addBtn" onClick={submit}>
        Add
      </button>
    </>
  );
};

export default NewTodo;
