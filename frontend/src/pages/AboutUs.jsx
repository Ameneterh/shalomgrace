import React from "react";
import about_image from "/about_image.jpg";

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* hero section in about */}
      <div
        className="w-full min-h-[300px] sm:min-h-[800px] relative overflow-hidden flex items-center flex-col"
        style={{
          backgroundImage: `url(${about_image})`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-40 w-40 sm:h-80 sm:w-80 mx-auto bg-[#D75825] rounded-full absolute -top-[80px] sm:-top-[160px] right-[calc(50%-80px)] sm:right-[calc(50%-160px)] flex items-end justify-center p-3 sm:p-10">
          <img src="/logo_white.png" className="w-14 sm:h-24 sm:w-24" />
        </div>
        <div className="w-[1000px] h-[1000px] sm:w-[2000px] sm:h-[2000px] absolute top-1/2 bg-[#D75825] rounded-full flex items-center justify-center p-20">
          <div className="w-[900px] h-[900px] sm:w-[1800px] sm:h-[1800px] bg-white rounded-full"></div>
        </div>
      </div>
      <div className="w-full bg-white p-4 sm:p-10 sm:px-20 flex justify-center">
        <div className="-mt-24 sm:-mt-36 z-10 flex flex-col gap-14">
          <h1 className="text-xl sm:text-5xl uppercase font-extrabold text-center">
            about <br />
            company
          </h1>
          <p className="text-lg sm:text-2xl px-4 sm:px-20">
            Shalom Global Ventures Limited is a leading supplier in the medical
            and industrial sectors, renowned for delivering high-quality brands
            with a commitment to timely service. Established initially as
            <b>ShalomAkins Enterprise</b> in 2014, we expanded and rebranded in
            2017 to become <b>Shalom Grace Global Ventures Limited</b>, now
            known as Shalom Global Ventures Limited. We pride ourselves on our
            dedication to supporting the healthcare and industrial sectors
            through a wide range of essential products and services.
          </p>
        </div>
      </div>

      <div className="relative w-full min-h-[400px] sm:min-h-[800px] bg-white p-4 sm:p-40 flex overflow-hidden">
        <div className="flex items-center justify-center w-[250px] h-[250px] sm:w-[600px] sm:h-[600px] rounded-full bg-white border-[5px] border-[#D75825] absolute -right-3 top-4 z-10 p-5 sm:p-10">
          <div
            className="w-full h-full rounded-full"
            style={{
              backgroundImage: `url("/mission_vision_image.jpg")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <h1 className="mt-10 sm:mt-0 text-xl sm:text-5xl uppercase font-extrabold">
          mission & <br />
          vision
        </h1>
        <div className="w-[1000px] min-h-[1000px] sm:w-[2000px] sm:min-h-[1800px] absolute -left-14 sm:-left-20 top-[80px] sm:top-[200px] bg-[#D75825] rounded-[300px] sm:rounded-full p-2 sm:p-20">
          <div className="flex flex-col relative top-48 left-16 sm:top-96 sm:left-40"></div>
        </div>
        <div className="w-[1000px] min-h-[1000px] sm:w-[2000px] sm:min-h-[1800px] absolute -left-14 sm:-left-20 top-[80px] sm:top-[200px] bg-[#D75825] rounded-[300px] sm:rounded-full p-2 sm:p-20"></div>
      </div>
      <div className="max-w-3xl mx-auto relative -top-[50px] sm:-top-[150px] px-4">
        <div className="flex flex-col w-full gap-y-10 sm:gap-y-20">
          {/* vision statement */}
          <div className="flex gap-2 w-full">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-[12px] sm:border-[14px] border-white border-r-transparent -rotate-45"></div>
            <div className="flex flex-col gap-4 text-white flex-1">
              <h1 className="text-4xl sm:text-5xl font-extrabold">Vision</h1>
              <p className="text-xl max-w-[800px]">
                To be a leading force in improving healthcare and promoting a
                drug-free society through the delivery of innovative solutions
                and qualitymedical products.
              </p>
            </div>
          </div>

          {/* mission statement */}
          <div className="flex gap-2 w-full">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-[12px] sm:border-[14px] border-white border-r-transparent -rotate-45"></div>
            <div className="flex flex-col gap-4 text-white flex-1">
              <h1 className="text-4xl sm:text-5xl font-extrabold">Mission</h1>
              <p className="text-xl max-w-[800px]">
                To provide high-quality healthcare products andservices, while
                working to combat drug abuse insociety by supplying essential
                medical tools and testkits that foster healthier communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
