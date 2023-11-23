import { TodoItems } from "@/component/Todo/Todo";
import axios from "@/utils/axiosCustomize";

// const getAllTodos = () => {
//   return axios.get<TodoItems[]>(`/todos/`);
// };

const fetchTodos = (url: string) => {
  return axios.get<TodoItems[]>(url);
  // return fetch(url).then((res) => res.json());
};

export { fetchTodos };
