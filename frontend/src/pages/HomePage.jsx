import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import heroimage from "/hero_img.png";
import ServicesComponent from "../components/ServicesComponent";
import ClientList from "../components/ClientList";
import { clientList } from "../assets/clientList";
import { team_List } from "../assets/shalomTeam";

export default function HomePage() {
  return (
    <>
      {/* hero section */}
      <div
        style={{
          backgroundImage: `url(${heroimage})`,
          backgroundPosition: "center",
          // backgroundSize: "",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen w-full flex justify-start"
      >
        <div className="text-[#D75825] text-xl px-4 sm:px-20 w-full bg-opacity-70 py-20 sm:py-40 flex flex-col gap-4">
          <p>We provide</p>
          <h1 className="text-5xl text-white sm:text-7xl font-extrabold drop-shadow-2xl">
            Innovative <br />
            Healthcare <br />
            Solutions
          </h1>

          <Link
            to={"/services"}
            className="px-4 py-3 bg-[#D75825] text-white font-semibold text-sm w-44 text-center rounded-lg hover:shadow-2xl hover:bg-opacity-75"
          >
            View Solutions
          </Link>
        </div>
      </div>

      {/* second section - introduction of company*/}
      <div className="w-full bg-white px-4 sm:px-20 py-20 flex flex-col items-center sm:flex-row gap-4 sm:gap-10">
        <div className="flex flex-1 flex-col gap-8">
          <p className="text-slate-600">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">
            Introduction of{" "}
            <span className="block text-[#D75825]">
              <img src="/header_img.png" className="rounded-xl h-40" />
            </span>
          </h1>
          <p className="flex flex-col gap-3">
            Shalom Grace Global Ventures Limited started as ShalomAkins
            enterprise in 2014 and later become Limited in the year 2017 as
            Shalom Grace Global Ventures Limited. Shalom Grace Global Ventures
            Limited is known for the quality of brands and efficient logistics.
            <span>
              Our portfolio includes: Medical Consumables Hospital Equipments
              Multi-drugs of addiction test kits, Laboratory Equipments,
              Reagents and Chemicals, Industrial machines and services
            </span>
          </p>

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col items-center justify-center text-[#D75825] border-2 border-[#D75825] rounded-lg p-3">
              <h1 className="text-4xl font-extrabold">10+</h1>
              <p className="font-bold">trusted partners</p>
            </div>
            <div className="flex flex-col items-center justify-center text-[#D75825] border-2 border-[#D75825] rounded-lg p-3">
              <h1 className="text-4xl font-extrabold">100+</h1>
              <p className="font-bold">satisfied clients</p>
            </div>
            <div className="flex flex-col items-center justify-center text-[#D75825] border-2 border-[#D75825] rounded-lg p-3">
              <h1 className="text-4xl font-extrabold">500k</h1>
              <p className="font-bold">supplies made</p>
            </div>
          </div>

          <Link
            to="/about"
            className="px-4 py-2 rounded-md border text-center bg-[#D75825] text-white hover:bg-opacity-65"
          >
            Read More
          </Link>
        </div>
        <div className="flex-1 w-full">
          <img src="/home_image2.jpeg" className="rounded-xl" />
        </div>
      </div>

      {/* third section - business units - services brief */}
      <div className="w-full bg-slate-100 px-4 sm:px-20 py-20 flex flex-col items-center sm:flex-row gap-4 sm:gap-10">
        <div className="flex flex-1 flex-col gap-8">
          <p className="text-slate-600">Areas of Activity</p>

          <div className="flex flex-col sm:flex-row items-start justify-between w-full">
            <h1 className="text-5xl font-bold text-slate-800 w-56 mb-4">
              Business <br />
              Units
            </h1>

            <p className="w-full sm:w-96">
              At the most demanding times, in the thickest of challenges, we
              have stood in the gap to ensure healthcare delivery and public
              safety is not compromised!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-10 gap-4 gap-y-4">
            <ServicesComponent title="Medical Consumables Supply" />
            <ServicesComponent title="Hospital Equipment & Infrastructure" />
            <ServicesComponent title="Multi-Drug of Abuse (DOA) Test Kits" />
            <ServicesComponent title="Lab Equipment, Reagents & Chemicals" />
            <ServicesComponent title="Industrial Machines and Services" />
          </div>
          <Link
            to={"/services"}
            className="px-4 py-3 bg-[#D75825] text-[white] text-sm w-full sm:w-96 text-center rounded-lg hover:bg-opacity-55"
          >
            Find Out More
          </Link>
        </div>
      </div>

      {/* fourth section */}
      <div
        style={{
          backgroundImage: `url(${heroimage})`,
          backgroundPosition: "center",
          // backgroundSize: "",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen w-full flex justify-start"
      >
        <div className="text-white text-xl bg-[#D75825] px-4 sm:px-20 w-full bg-opacity-70 py-20 sm:py-40 flex flex-col gap-4 items-center justify-center">
          <div className="flex items-start justify-between w-full max-w-3xl gap-4">
            <FaQuoteLeft className="text-5xl sm:text-7xl" />
            <div className="flex-1 flex flex-col gap-2">
              <h1 className="text-2xl sm:text-5xl flex-1 italic">
                Together with our clients and partners, we are shaping the
                future of healthcare and industry.
              </h1>
              <p className="font-bold text-2xl mt-3">Joel Afolabi</p>
              <p className="text-sm -mt-3">Chief Executive Officer</p>
            </div>
          </div>
        </div>
      </div>

      {/* valued clients section */}
      <div className="px-4 sm:px-20 w-full py-10 sm:py-20 flex flex-col justify-start bg-white text-[#D75825]">
        <h1 className="text-xl sm:text-4xl font-extrabold uppercase mb-6">
          our esteemed clients
        </h1>
        <p className=" mb-12">
          We have a long-standing relationship with some of Nigeria’s leading
          academic institutions and industries, supplying essential equipment
          and services that meet global standards. Below is a selection of
          universities and organizations we proudly serve:
        </p>
        <div className="flex flex-wrap justify-between gap-4 gap-y-4 sm:gap-y-10 mb-14">
          {clientList.map((client, index) => (
            <ClientList
              key={index}
              logo={client.logo}
              name={client.name}
              address={client.address}
            />
          ))}
        </div>
        <p>
          Why are we so trusted?{" "}
          <Link
            to={"/"}
            // bg-[#fdb396]
            className="text-lg rounded-md hover:opacity-65 font-bold hover:underline underline-offset-2 block sm:inline-block"
          >
            Please, click to find out
          </Link>
        </p>
      </div>

      {/* creative team section */}
      <div className="flex flex-col justify-start bg-white">
        <div className="px-4 sm:px-20 w-full max-w-6xl mx-auto py-10 sm:py-20 flex flex-col justify-start bg-[#D75825] text-white mb-10 rounded-2xl">
          <h1 className="text-xl sm:text-4xl font-extrabold uppercase mb-12 text-center">
            our
            <br />
            creative team
          </h1>

          <div className="flex flex-wrap justify-between gap-4 gap-y-4 sm:gap-y-10 mb-14">
            {team_List.map((member, index) => (
              <div className="flex flex-col gap-4">
                <div
                  key={index}
                  className="border-[30px] border-white rounded-full border-t-transparent rotate-45 w-60 h-60 flex items-center justify-center overflow-hidden"
                >
                  <div
                    className="h-[400px] w-[400px] -rotate-45"
                    style={{
                      backgroundImage: `url(${member.image})`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
                <div className="text-center text-white">
                  <h1 className="text-xl font-bold">{member.name}</h1>
                  <p className="text-sm">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
