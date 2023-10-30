import { TodoItems } from "@/component/Todo/Todo";
import axios from "@/utils/axiosCustomize";

const getAllTodos = () => {
  return axios.get<TodoItems[]>(`/todos/`);
};

export { getAllTodos };
