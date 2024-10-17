import React from "react";

export default function ServicesComponent({ title }) {
  return (
    <div className="flex items-center gap-2 w-full max-w-96 border-[1px] border-[#D75825] shadow-md rounded-lg p-4">
      <div className="border-[12px] border-r-transparent -rotate-45 border-[#D75825] h-16 w-16 rounded-full"></div>

      <p className="text-xl sm:text-3xl flex-1 font-bold text-[#D75825]">
        {title}
      </p>
    </div>
  );
}
