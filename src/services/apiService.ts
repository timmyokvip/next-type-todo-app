import axios from "@/utils/axiosCustomize";

const postLogin = (userEmail: string, userPassword: string | number) => {
  return axios.post(`/api/v1/login`, {
    email: userEmail,
    password: userPassword,
    delay: 3000,
  });
};

export { postLogin };
