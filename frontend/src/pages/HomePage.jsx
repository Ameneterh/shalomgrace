import React from "react";
import { Link } from "react-router-dom";
import heroimage from "/hero_img.png";

export default function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url(${heroimage})`,
        backgroundPosition: "center",
        // backgroundSize: "",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen w-full flex justify-start"
    >
      <div className="text-white text-xl bg-[#D75825] px-4 sm:px-20 w-full bg-opacity-70 py-20 sm:py-40 flex flex-col gap-4">
        <p>We provide</p>
        <h1 className="text-5xl sm:text-7xl font-extrabold">
          Innovative <br />
          Healthcare <br />
          Solutions
        </h1>

        <Link
          to={"/services"}
          className="px-4 py-3 bg-white text-[#D75825] text-sm w-96 text-center rounded-lg hover:bg-[#D75825] hover:text-white"
        >
          View Solutions
        </Link>
      </div>
    </div>
  );
}
