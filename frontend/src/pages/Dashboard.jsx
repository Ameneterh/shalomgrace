import { useLocation } from "react-router-dom";

import React, { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashboardComponent from "../components/DashboardComponent";
// import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import CreatePostPage from "./CreatePostPage";
// import DashComments from "../components/DashComments";
// import DashboardComponent from "../components/DashboardComponent";
// import DashMessages from "../components/DashMessages";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>

      {/* profile ... */}
      {tab === "profile" && <DashProfile />}

      {/* for posts */}
      {/* {tab === "posts" && <DashPosts />} */}

      {/* for users */}
      {tab === "users" && <DashUsers />}

      {/* for comments */}
      {/* {tab === "comments" && <DashComments />} */}

      {/* for comments */}
      {/* {tab === "messages" && <DashMessages />} */}

      {/* for dashboard */}
      {tab === "dash" && <DashboardComponent />}
    </div>
  );
}
