"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

interface User {
  userName?: string | number;
  password?: string | number;
}

interface ErrorType {
  userName?: string | number;
  password?: string | number;
}

const RegisterPage = () => {
  const router = useRouter();
  const [isEye, setIsEye] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [formError, setFormError] = useState<ErrorType>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const isEmptyValue = (value: any) => {
    return !value || value.trim().length < 1;
  };

  // const isPasswordValid = (password: string | number) => {
  //   return /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,}$/.test(password);
  // };

  const isUsernameValid = (userName: any) => {
    return /^[a-z A-Z 0-9]+$/.test(userName);
  };

  const validateForm = () => {
    const error: ErrorType = {};

    if (isEmptyValue(user?.userName)) {
      error.userName = "Vui lòng điền username!";
    } else {
      if (!isUsernameValid(user?.userName)) {
        error.userName = "Không nhập ký tự đặt biệt!";
      }
    }
    if (isEmptyValue(user?.password)) {
      error.password = "Vui lòng điền password!";
    }

    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("get user", user);
    if (validateForm()) {
      toast.success("Đăng ký thành công!");
    } else {
      toast.error("Đăng ký thất bại !!!");
      return;
    }
    // router.push("/login");
  };

  return (
    <>
      {loading ? (
        <div className="translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
          <Spin size="large" />
        </div>
      ) : (
        <section className="container m-auto p-12">
          <form onSubmit={(e) => handleSubmit(e)}>
            <header className="flex justify-end gap-4">
              <h1>Bạn đã có tài khoản ?</h1>
              <div className=" ">
                <Link
                  href={"/login"}
                  className="bg-gray-600 text-white p-3 rounded-xl"
                >
                  Đăng nhập
                </Link>
                <Link
                  href={"/"}
                  className="border border-gray-500 p-3 rounded-xl ml-3"
                >
                  Về trang chủ
                </Link>
              </div>
            </header>
            <p className="text-center mb-6 ">ĐĂNG KÝ</p>
            <div className="w-[800px] m-auto p-5 border rounded-xl overflow-hidden shadow-xl">
              <div className="flex flex-col ">
                <label>User name </label>
                <input
                  type="text"
                  placeholder="User name..."
                  className="border border-solid border-gray-400 shadow-xl rounded-xl outline-none w-full mt-2 mb-6"
                  name="userName"
                  value={user?.userName}
                  onChange={(e) => handleOnChange(e)}
                />
                {formError.userName && (
                  <p className="text-red-500">{formError.userName}</p>
                )}
              </div>

              <div className="flex flex-col ">
                <label>Password </label>
                <input
                  type={isEye ? "password" : "text"}
                  placeholder="Password..."
                  className="border border-solid border-gray-400 shadow-xl rounded-xl outline-none w-full mt-2"
                  name="password"
                  value={user?.password}
                  onChange={(e) => handleOnChange(e)}
                />{" "}
                <span
                  className="cursor-pointer text-right"
                  onClick={() => setIsEye(!isEye)}
                >
                  {isEye ? (
                    <EyeOutlined style={{ fontSize: "26px" }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ fontSize: "26px" }} />
                  )}
                </span>{" "}
                {formError.password && (
                  <p className="text-red-500">{formError.password}</p>
                )}
              </div>

              <div>
                <button
                  className="w-full bg-gray-600 text-white p-3 rounded-xl mt-6"
                  // disabled={isLoading}
                >
                  {/* {isLoading === true && (
              <AiOutlineLoading3Quarters className="loaderIcon" />
            )} */}
                  Register
                </button>
              </div>
            </div>
          </form>
          <ToastContainer autoClose={3000} />
        </section>
      )}
    </>
  );
};

export default RegisterPage;
