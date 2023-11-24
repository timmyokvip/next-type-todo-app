import { TodoItems } from "@/component/Todo/Todo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TodoState {
  arrTodo: TodoItems[];
}

const initialState: TodoState = { arrTodo: [] };

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodoAction: (state, action: PayloadAction<TodoItems>) => {
      state.arrTodo.push(action.payload);
    },
    getTodoActionLocal: (state, action: PayloadAction<TodoItems[]>) => {
      state.arrTodo = action.payload;
    },
  },
});

export const { addTodoAction, getTodoActionLocal } = todoSlice.actions;

export default todoSlice.reducer;
