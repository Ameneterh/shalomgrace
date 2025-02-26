import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { HiMail, HiPhone } from "react-icons/hi";
import {
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaApple,
  FaFacebook,
} from "react-icons/fa";

import React from "react";
import { useState } from "react";
import Divider from "../components/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { isLoading, loginUser, error } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(formData.email, formData.password);
      navigate("/dashboard?tab=dash");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen mt-20 px-4">
      <div className="flex px-4 md:px-8 py-3 md:py-8 max-w-xl mx-auto flex-col gap-4 bg-white rounded-lg">
        <div className="py-2 w-full">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-[#D75825]">
            <FaSignInAlt className="text-xl" />
            Login
          </h1>
          <Divider />
        </div>

        <div className="flex-1">
          <div className="">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <Label
                  htmlFor="email"
                  value="Your email"
                  className="text-[#D75825] font-bold"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="border-[#D75825] placeholder-[#D75825] border rounded-lg outline-transparent w-full"
                  onChange={handleChange}
                  required
                  shadow
                />
              </div>

              <div className="">
                <Label
                  htmlFor="email"
                  value="Password:"
                  className="text-[#D75825] font-bold"
                />
                <div className="flex items-center w-full relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="border-[#D75825] placeholder-[#D75825] border rounded-lg outline-transparent w-full"
                    required
                    onChange={handleChange}
                  />
                  <span
                    className="absolute right-2 text-[#D75825] text-xl cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-800 font-semibold mt-2 p-2 text-center bg-red-100 rounded">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="bg-[#D75825] hover:bg-[#D75825] hover:opacity-65 mt-10"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading ...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Dont have an account?</span>
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
