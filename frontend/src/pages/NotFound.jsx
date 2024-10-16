import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex mt-4 md:mt-4 p-2">
      <div className="relative max-w-6xl mx-auto flex flex-col items-center gap-4">
        <h1 className="text-6xl font-extrabold text-red-700">404</h1>
        <div className="absolute top-0 h-16 w-16 border-4 rounded-full border-red-700 border-r-transparent animate-spin opacity-50"></div>
        <h1 className="text-3xl font-bold">Oops!</h1>
        <p className="text-md font-bold text-center">
          Looks like the site has flatlined!{" "}
          <span className="block text-pink-500 font-normal">
            We'll commence CPR and get it working in no time
          </span>
        </p>
        <img src="/flatlined.jpg" className="h-40 rounded-xl" />

        <Link
          to={"/"}
          className="flex items-center bg-green-700 px-8 py-3 text-sm font-medium text-white hover:bg-green-500 active:bg-blue-600 rounded-md"
        >
          <RiArrowGoBackFill className="h-4 w-6" />
          GO HOME
        </Link>
      </div>
    </div>
  );
}
