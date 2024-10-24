import React from "react";

export default function ClientList({ logo, name, address }) {
  return (
    <div className="w-full sm:w-80 p-4 rounded-xl flex items-center gap-2 shadow-lg">
      <img src={logo} className="h-20" />
      <div className="flex-1">
        <h1 className="text-md font-extrabold text-wrap">{name}</h1>
        <p className="text-sm">{address}</p>
      </div>
    </div>
  );
}
