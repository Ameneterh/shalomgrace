import React from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { HiMail, HiPhone } from "react-icons/hi";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col mb-20">
      <div className="p-8 sm:p-12 flex items-center gap-4">
        <div className="bg-white p-3 rounded-full w-24 h-24">
          <img src="/logo_color.png" alt="" className="w-24 sm:w-48" />
        </div>
        <h1 className="text-2xl sm:text-5xl font-extrabold text-white uppercase">
          get in touch
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between p-4">
        <div className="text-white flex flex-col px-2 sm:px-20 max-w-2xl">
          <div className="flex flex-col w-full gap-8 sm:gap-y-14 px-4">
            {/* call */}
            <div className="flex gap-4 sm:gap-8 w-full">
              <div className="border-[8px] sm:border-[12px] border-white rounded-full h-10 w-10 sm:h-16 sm:w-16 border-r-transparent -rotate-45"></div>
              <div className="flex flex-col flex-1">
                <h1 className="text-2xl sm:text-4xl font-extrabold uppercase">
                  call us:
                </h1>
                <p className="text-lg sm:text-xl">
                  +234-806-301-5084 <br />
                  +234-708-200-6127
                </p>
              </div>
            </div>

            {/* email */}
            <div className="flex gap-4 sm:gap-8 w-full">
              <div className="border-[8px] sm:border-[12px] border-white rounded-full h-10 w-10 sm:h-16 sm:w-16 border-r-transparent -rotate-45"></div>
              <div className="flex flex-col flex-1">
                <h1 className="text-2xl sm:text-4xl font-extrabold uppercase">
                  email us:
                </h1>
                <p className="text-lg sm:text-xl text-wrap">
                  <Link
                    to="mailto:shalomgraceventures@gmail.com"
                    className="underline underline-offset-2 hover:opacity-55"
                  >
                    Shalom Grace Global Ventures
                  </Link>
                </p>
              </div>
            </div>

            {/* Office address */}
            <div className="flex gap-4 sm:gap-8 w-full">
              <div className="border-[8px] sm:border-[12px] border-white rounded-full h-10 w-10 sm:h-16 sm:w-16 border-r-transparent -rotate-45"></div>
              <div className="flex flex-col flex-1">
                <h1 className="text-2xl sm:text-4xl font-extrabold uppercase">
                  visit us:
                </h1>
                <p className="text-lg sm:text-xl font-bold">
                  Head Office:
                  <span className="block font-normal">
                    Office 1&2 Asipa, Akala express Ibadan, Oyo State. Nigeria
                  </span>
                </p>
                <p className="text-lg sm:text-xl font-bold mt-6">
                  Ado-Ekiti Office:
                  <span className="block font-normal">
                    No 1 Fakajob Fuel Station Beside Olo Motors Ado, Ekiti
                    State. Nigeria
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full flex-1 bg-white mt-10 sm:mt-0 p-4 sm:p-10 rounded-xl">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#D75825]">
            Direct Message Here:
          </h1>
          <form className="flex max-w-md flex-col gap-2 mt-4">
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
                icon={HiMail}
                placeholder="name@company.com"
                className="border-[#D75825] placeholder-[#D75825] border rounded-lg outline-transparent w-full"
                required
                shadow
              />
            </div>
            <div>
              <div className="block">
                <Label
                  htmlFor="phone_number"
                  value="Your Phone Number"
                  className="text-[#D75825]"
                />
              </div>
              <input
                id="phone_number"
                type="text"
                icon={HiPhone}
                placeholder="+2348012345678"
                className="border-[#D75825] placeholder-[#D75825] border rounded-lg outline-transparent w-full"
                required
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="message"
                  value="Your Message"
                  className="text-[#D75825]"
                />
              </div>
              <Textarea
                id="message"
                placeholder="Leave a message ..."
                className="border-[#D75825] placeholder-[#D75825]"
                required
                rows={4}
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Checkbox id="agree" />
              <Label htmlFor="agree" className="flex text-[#D75825]">
                I agree with the&nbsp;
                <Link href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </Link>
              </Label>
            </div>
            <Button
              type="submit"
              className="bg-[#D75825] hover:bg-[#D75825] hover:opacity-65"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
