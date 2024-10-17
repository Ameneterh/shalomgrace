import React from "react";
import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram } from "react-icons/bs";

export default function FooterComponent() {
  const year = new Date().getFullYear();
  return (
    <Footer container className="text-[#D75825] border-t-2 border-t-[#D75825]">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/"
            src="/shalom_grace_logo.png"
            alt="shaom grace Logo"
            name="Shalom Grace"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          href="/"
          by="Shalom Grace Global Ventures Ltd"
          year={year}
        />
      </div>
    </Footer>
  );
}
