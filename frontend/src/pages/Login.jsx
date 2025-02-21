import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { HiMail, HiPhone } from "react-icons/hi";
import { FaSignInAlt } from "react-icons/fa";
import React from "react";
import { useState } from "react";
import Divider from "../components/Divider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";

export default function Login() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please, fill out all fields."));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/server/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <div className="block">
                  <Label
                    htmlFor="email"
                    value="Your email"
                    className="text-[#D75825]"
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  // icon={HiMail}
                  placeholder="name@company.com"
                  className="border-[#D75825] placeholder-[#D75825] border rounded-lg outline-transparent w-full"
                  onChange={handleChange}
                  required
                  shadow
                />
              </div>

              <div>
                <div className="block">
                  <Label
                    htmlFor="password"
                    value="Your Password"
                    className="text-[#D75825]"
                  />
                </div>
                <input
                  id="password"
                  type="password"
                  // icon={HiPhone}
                  placeholder="***********"
                  className="border-[#D75825] placeholder-[#D75825] border rounded-lg outline-transparent w-full"
                  onChange={handleChange}
                  required
                  shadow
                />
              </div>

              <Button
                type="submit"
                className="bg-[#D75825] hover:bg-[#D75825] hover:opacity-65 mt-10"
                disabled={loading}
              >
                {loading ? (
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
