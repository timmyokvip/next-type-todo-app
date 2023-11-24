export const getLocal = (key: string) => {
  const todoData = localStorage.getItem(key);
  if (todoData) return JSON.parse(todoData);
  return null;
};

export const setLocal = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data));
};
