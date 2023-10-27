"use client";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [isEye, setIsEye] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };
  return (
    <section className="container m-auto p-12">
      <header className="flex justify-end gap-4">
        <h1>Bạn chưa có tài khoản ?</h1>
        <div className=" ">
          <Link
            href={"/register"}
            className="bg-gray-600 text-white p-3 rounded-xl"
          >
            Đăng ký
          </Link>
          <Link
            href={"/"}
            className="border border-gray-500 p-3 rounded-xl ml-3"
          >
            Về trang chủ
          </Link>
        </div>
      </header>
      <p className="text-center mb-6">ĐĂNG NHẬP</p>
      <div className="w-[800px] m-auto p-5 border rounded-xl overflow-hidden shadow-xl">
        <div className="flex flex-col ">
          <label>User name </label>
          <input
            type="text"
            className="border border-solid border-gray-400 shadow-xl rounded-xl outline-none w-full mt-2 mb-6"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col ">
          <label>Password </label>
          <input
            type={isEye ? "password" : "text"}
            className="border border-solid border-gray-400 shadow-xl rounded-xl outline-none w-full mt-2"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <span
            className="cursor-pointer text-right"
            onClick={() => setIsEye(!isEye)}
          >
            {isEye ? (
              <EyeOutlined style={{ fontSize: "26px" }} />
            ) : (
              <EyeInvisibleOutlined style={{ fontSize: "26px" }} />
            )}
          </span>
        </div>

        <div>
          <button
            className="w-full bg-gray-600 text-white p-3 rounded-xl mt-6"
            onClick={() => handleLogin()}
            // disabled={isLoading}
          >
            {/* {isLoading === true && (
              <AiOutlineLoading3Quarters className="loaderIcon" />
            )} */}
            Login{" "}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
