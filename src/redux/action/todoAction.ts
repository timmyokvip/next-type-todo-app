import { TodoItems } from "@/component/Todo/Todo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TodoState {
  arrTodo: TodoItems[];
}

const initialState: TodoState = { arrTodo: [] };

const todoAction = createSlice({
  name: "todoAction",
  initialState,
  reducers: {
    addTodoAction: (state, action: PayloadAction<TodoItems>) => {
      state.arrTodo.push(action.payload);
    },
    editTodoAction: (state, action) => {
      state.arrTodo;
    },
    deleteTodoAction: () => {},
  },
});

export const { addTodoAction, editTodoAction } = todoAction.actions;

export default todoAction.reducer;
