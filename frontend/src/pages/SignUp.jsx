import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { FaEdit, FaEye, FaEyeSlash, FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../components/Divider";
import { useAuthStore } from "../store/authStore";

export default function SignUp() {
  const { registerUser, error, isLoading } = useAuthStore();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  console.log(formData);

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    try {
      await registerUser(
        formData.fullname,
        formData.email,
        formData.phone,
        formData.password
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen max-w-xl mx-auto mt-4 lg:mt-20 px-4 md:px-8 mb-24">
      <div className="flex-1 flex flex-col justify-between gap-5 lg:gap-8 w-full text-[#D75825] bg-white py-3 md:py-8 px-4 md:px-8 rounded-lg">
        <div className="py-2 w-full">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-[#D75825]">
            <FaEdit className="text-xl" />
            Sign Up
          </h1>
          <Divider />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleRegisterUser}>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="fullname" value="Full Name" className="font-bold" />
            <TextInput
              id="fullname"
              type="text"
              placeholder="Ex: Eliza Maguire"
              required
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="email" value="Your Email" className="font-bold" />
            <TextInput
              id="email"
              type="email"
              placeholder="Ex: Maguire@FlexUI.com"
              required
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label
              htmlFor="phone"
              value="Your Phone Number"
              className="font-bold"
            />
            <TextInput
              id="phone"
              type="text"
              placeholder="Ex: +2348123456789"
              required
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="email" value="Password:" className="font-bold" />
            <div className="flex items-center w-full relative">
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                // rightIcon={FaEye}
                placeholder="Enter Password"
                className="w-full"
                required
                onChange={handleChange}
              />
              <span
                className="absolute right-2 text-[#999BA1] text-xl cursor-pointer"
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
            className="bg-[#d75825] hover:opacity-85 cursor-pointer flex items-center flex-row gap-10 mt-10 py-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="md" />
                <span className="pl-3">Creating Account ...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        <p className="flex flex-col lg:flex-row items-center justify-center gap-1 text-[#999BA1] text-xs">
          By creating an account, you agree to our
          <Link to="/tnc" className="text-[#6236F5] font-semibold">
            Terms & Conditions
          </Link>
        </p>

        <div className="w-full flex flex-col gap-4 ">
          <div className="w-full flex items-center justify-between gap-2 text-[#999BA1]">
            <div className="flex-1 border-b-[1px] border-[#999BA1]"></div>
            <p className="text-sm font-bold">OR</p>
            <div className="flex-1 border-b-[1px] border-[#999BA1]"></div>
          </div>

          <Button
            as="div"
            className="bg-[#F8F8F8] text-[#19191B] hover:opacity-85 cursor-pointer flex items-center flex-row"
          >
            <FaApple className="pr-2 h-6 w-6" />
            Continue with Apple
          </Button>
          <Button
            as="div"
            className="bg-[#F8F8F8] text-[#19191B] hover:opacity-85 cursor-pointer flex items-center flex-row"
          >
            <FcGoogle className="pr-2 h-6 w-6" />
            Continue with Google
          </Button>
          <Button
            as="div"
            className="bg-[#F8F8F8] text-[#19191B] hover:opacity-85 cursor-pointer flex items-center flex-row"
          >
            <FaFacebook className="pr-2 h-6 w-6 text-blue-700" />
            Continue with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
