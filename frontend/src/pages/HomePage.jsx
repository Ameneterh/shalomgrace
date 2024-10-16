import React from "react";
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
      className="min-h-screen w-full"
    >
      HomePage
    </div>
  );
}
