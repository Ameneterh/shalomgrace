import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";
import { LuClipboardSignature } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { signOutSuccess } from "../redux/user/userSlice";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useAuthStore } from "../store/authStore";

export default function HeaderComponent() {
  const path = useLocation().pathname;
  const [menuVisible, setMenuVisible] = useState(false);

  const { user, logout } = useAuthStore();
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    logout();
  };

  return (
    <Navbar fluid rounded className="md:px-14 py-4 sticky top-0 z-50">
      <Navbar.Brand href="/">
        <img
          src="/header_img.png"
          className="mr-3 h-12 sm:h-16 rounded-md"
          alt="mauve Logo"
        />
        {/* <p className="self-center whitespace-nowrap text-2xl sm:text-3xl font-bold text-[#D75825]">
          Shalom Grace
          <span className="block text-sm sm:text-xl -mt-2 font-medium">
            Global Ventures Ltd
          </span>
        </p> */}
      </Navbar.Brand>
      <div className="flex gap-3 items-center md:order-2">
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={user.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-semibold">
                {user.fullname}
              </span>
              <span className="block truncate text-xs font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard"}>
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
            {/* <Dropdown.Item>Earnings</Dropdown.Item> */}
            <Dropdown.Item>Create Post</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Link
              to="/login"
              className={`h-full flex items-center text-[#D75825] border hover:text-white border-[#D75825] px-4 py-2 rounded-lg hover:bg-[#D75825] hover:opacity-50`}
            >
              <FaSignInAlt className="inline-block md:hidden text-2xl" />
              <span className="hidden sm:inline-block">Login</span>
            </Link>
            <Link
              to="/sign-up"
              className={`h-full flex items-center text-[white] bg-[#D75825]
              px-4 py-2 rounded-lg hover:opacity-50`}
            >
              <LuClipboardSignature className="inline-block md:hidden text-2xl" />
              <span className="hidden sm:inline-block">Sign Up</span>
            </Link>
          </>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="">
        <Navbar.Link
          active={path === "/"}
          as="div"
          className="hover:opacity-50"
        >
          <Link
            to="/"
            className={`sm:text-[#D75825] text-[16px] w-full h-full ${
              path === "/" ? "text-white font-bold" : "text-[#D75825]"
            }`}
          >
            Home
          </Link>
          {path === "/" ? (
            <hr className="border-[1px] border-[#D75825] hidden sm:block" />
          ) : (
            <></>
          )}
        </Navbar.Link>
        <Navbar.Link
          active={path === "/services"}
          as="div"
          className="hover:opacity-50"
        >
          <Link
            to="/services"
            className={`sm:text-[#D75825] text-[16px] w-full h-full ${
              path === "/services" ? "text-white font-bold" : "text-[#D75825]"
            }`}
          >
            Services
          </Link>
          {path === "/services" ? (
            <hr className="border-[1px] border-[#D75825] hidden sm:block" />
          ) : (
            <></>
          )}
        </Navbar.Link>
        <Navbar.Link
          active={path === "/blog-posts"}
          as="div"
          className="hover:opacity-50"
        >
          <Link
            to="/blog-posts"
            className={`sm:text-[#D75825] text-[16px] w-full h-full ${
              path === "/blog-posts" ? "text-white font-bold" : "text-[#D75825]"
            }`}
          >
            Blog Posts
          </Link>
          {path === "/blog-posts" ? (
            <hr className="border-[1px] border-[#D75825] hidden sm:block" />
          ) : (
            <></>
          )}
        </Navbar.Link>
        <Navbar.Link
          active={path === "/gallery"}
          as="div"
          className="hover:opacity-50"
        >
          <Link
            to="/gallery"
            className={`sm:text-[#D75825] text-[16px] w-full h-full ${
              path === "/gallery" ? "text-white font-bold" : "text-[#D75825]"
            }`}
          >
            Gallery
          </Link>
          {path === "/gallery" ? (
            <hr className="border-[1px] border-[#D75825] hidden sm:block" />
          ) : (
            <></>
          )}
        </Navbar.Link>
        <Navbar.Link
          active={path === "/about"}
          as="div"
          className="hover:opacity-50"
        >
          <Link
            to="/about"
            className={`sm:text-[#D75825] text-[16px] w-full h-full ${
              path === "/about" ? "text-white font-bold" : "text-[#D75825]"
            }`}
          >
            About
          </Link>
          {path === "/about" ? (
            <hr className="border-[1px] border-[#D75825] hidden sm:block" />
          ) : (
            <></>
          )}
        </Navbar.Link>
        <Navbar.Link
          active={path === "/contact-us"}
          as="div"
          className="hover:opacity-50"
        >
          <Link
            to="/contact-us"
            className={`sm:text-[#D75825] text-[16px] w-full h-full ${
              path === "/contact-us" ? "text-white font-bold" : "text-[#D75825]"
            }`}
          >
            Contact
          </Link>
          {path === "/contact-us" ? (
            <hr className="border-[1px] border-[#D75825] hidden sm:block" />
          ) : (
            <></>
          )}
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
