import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowSmRight,
  HiDocumentAdd,
  HiChartPie,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import { TbMessage } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    logout();
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {user && user.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={user.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {user.isAdmin && (
            <Link to="/create-post">
              <Sidebar.Item
                // active={tab === "create-post"}
                icon={HiDocumentAdd}
                as="div"
              >
                Create Post
              </Sidebar.Item>
            </Link>
          )}

          {user.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}

          {user.isAdmin && (
            <Link to="/dashboard?tab=messages">
              <Sidebar.Item
                active={tab === "messages"}
                icon={TbMessage}
                as="div"
              >
                Messages
              </Sidebar.Item>
            </Link>
          )}

          {user.isAdmin && (
            <>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=comments">
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  as="div"
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
