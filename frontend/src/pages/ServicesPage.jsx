import React from "react";

export default function ServicesPage() {
  return (
    <div className="w-full overflow-hidden flex justify-center flex-col items-center mb-10">
      {/* top section of services page */}
      <div className="w-[2000px] h-[150px] sm:h-[300px] flex justify-center relative bg-white overflow-hidden border-0">
        <div className="w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-white border-[10px] border-[#D75825] absolute -top-[150px] sm:-top-[300px] flex items-center justify-center p-5 sm:p-14">
          <div className="w-full h-full rounded-full bg-black"></div>
        </div>
        <div className="w-[1000px] sm:w-[2000px] h-[1800px] rounded-full bg-[#D75825] mt-10"></div>
      </div>
      <div className="max-w-4xl mx-auto text-white px-4">
        <h1 className="text-5xl uppercase font-extrabold mt-4 text-center">
          our services
        </h1>
        <p className="mt-4 text-md sm:text-xl">
          At Shalom Global Ventures Limited, our services are driven by a deep
          commitment to improving healthcare systems and addressing societal
          challenges such as drug abuse. With a focus on quality and innovation,
          we provide a wide range of services designed to meet the needs of
          healthcare institutions, universities, and industries. Our solutions
          are tailored to ensure efficiency, safety, and long-term impact.
        </p>
        <div className="mt-6 sm:mt-14 flex flex-col gap-y-4 sm:gap-y-10">
          {/* medical consumables supply */}
          <div className="flex gap-2 w-full items-start justify-start">
            <div className="border-[8px] sm:border-[12px] border-white rounded-full h-10 w-10 sm:h-16 sm:w-16 border-r-transparent -rotate-45"></div>
            <p className="text-md sm:text-lg flex-1">
              <span className="text-3xl text-black font-extrabold block mb-1">
                Medical Consumables Supply
              </span>
              We offer a comprehensive range of medical consumables that are
              essential for healthcar eoperations, ensuring that hospitals,
              clinics, and healthcare facilities have the resources they need
              for effective patient care. Our products include gloves, syringes,
              face masks,bandages, and other single-use items that meet global
              standards for safety and hygiene.
            </p>
          </div>
          {/* hospital equipment and infrastructure */}
          <div className="flex gap-2 w-full items-start justify-start">
            <div className="border-[8px] sm:border-[12px] border-white rounded-full h-10 w-10 sm:h-16 sm:w-16 border-r-transparent -rotate-45"></div>
            <p className="text-md sm:text-lg flex-1">
              <span className="text-3xl text-black font-extrabold block mb-1">
                Hospital Equipment and Infrastructure
              </span>
              SupplyFrom diagnostic tools to hospital beds and sterilization
              equipment, we provide a wide selection of hospital equipment to
              support the smooth functioning of medical facilities. Our quick
              delivery and commitment to quality ensure that healthcare
              providers can offer the best care with state-of-the-art equipment.
            </p>
          </div>
          {/* multi drug test kit */}
          <div className="flex gap-2 w-full items-start justify-start">
            <div className="border-[8px] sm:border-[12px] border-white rounded-full h-10 w-10 sm:h-16 sm:w-16 border-r-transparent -rotate-45"></div>
            <p className="text-md sm:text-lg flex-1">
              <span className="text-3xl text-black font-extrabold block mb-1">
                Multi-Drug Test Kits
              </span>
              In line with our mission to combat drug abuse, we specialize in
              supplying multi-drug test kits to universities, schools, and
              organisations. The drugs test kits are specifically manufactured
              to fit substances of abuse in Nigeria.
            </p>
          </div>
          {/* multi drug test kit */}
          <div className="flex gap-2 w-full items-start justify-start">
            <div className="border-[8px] sm:border-[12px] border-white rounded-full h-10 w-10 sm:h-16 sm:w-16 border-r-transparent -rotate-45"></div>
            <p className="text-md sm:text-lg flex-1">
              <span className="text-3xl text-black font-extrabold block mb-1">
                Laboratory Equipment, Reagents, and Chemicals
              </span>
              We are trusted suppliers of laboratory equipment, reagents, and
              chemicals for academic and industrial research. Our products cater
              to a variety of laboratories, ensuring they are equipped with the
              latest technologies for accurate and reliable results. Whether for
              teaching, medical diagnostics, or research, we have the right
              tools for success.
            </p>
          </div>
          {/* multi drug test kit */}
          <div className="flex gap-2 w-full items-start justify-start">
            <div className="border-[8px] sm:border-[12px] border-white rounded-full h-10 w-10 sm:h-16 sm:w-16 border-r-transparent -rotate-45"></div>
            <p className="text-md sm:text-lg flex-1">
              <span className="text-3xl text-black font-extrabold block mb-1">
                Industrial Machines and Services
              </span>
              We also cater to the industrial sector with cutting-edge
              industrial machines such as bottling machines and bottle recycling
              systems. These machines improve production efficiency and align
              with sustainability goals by reducing waste. Our industrial
              solutions help businesses achieve greater operational efficiency
              and eco-friendly practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
