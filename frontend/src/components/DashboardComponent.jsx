import React, { useEffect, useState } from "react";
import { FaRegSadTear } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline, IoIosTimer } from "react-icons/io";
import { SiParamountplus } from "react-icons/si";
import { FiPieChart } from "react-icons/fi";
import { PiInvoiceBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import AdminDashboardComponent from "./AdminDashboardComponent";
import { UserDashboardComponents } from "./AdminDashboardComponent";
import Divider from "./Divider";
import { Button, Table } from "flowbite-react";
import moment from "moment";

export default function DashboardComponent() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { user, getUsers, getLastMonthUsers } = useAuthStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users.users);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchLastMonthUsers = async () => {
      try {
        const usersLastMonth = await getLastMonthUsers();
        setLastMonthUsers(usersLastMonth);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (user.isAdmin) {
      fetchUsers();
      fetchLastMonthUsers();
    }
  }, [user]);

  console.log(lastMonthUsers);

  return (
    <div className="flex flex-col gap-4 w-full p-3">
      <div className="flex-wrap flex gap-4 justify-between">
        {/* admin views ----------------- total users, invoices, businesses */}
        {/* show total number of registered users */}
        <AdminDashboardComponent
          totalUsers={users.length}
          type="Users"
          heading={"all users"}
          lastMonthUsers={lastMonthUsers.lastMonthUsers}
        />

        {/* total invoices created */}
        <AdminDashboardComponent
          totalUsers={totalPosts}
          type="Posts"
          heading={"all posts"}
          lastMonthUsers={lastMonthPosts}
        />

        {/* show total number of businesses */}
        <AdminDashboardComponent
          totalUsers={totalComments}
          type="Comments"
          heading={"all comments"}
          lastMonthUsers={lastMonthComments}
        />
        {/* show total number of businesses */}
        <AdminDashboardComponent
          totalUsers={totalComments}
          type="Messages"
          heading={"all messages"}
          lastMonthUsers={lastMonthComments}
        />
      </div>

      <Divider />

      <div className="flex-wrap flex gap-4 justify-between"></div>

      {/* tables - display all users */}
      <div className="flex flex-wrap gap-4 py-3 w-full bg-white rounded shadow-md">
        <div className="flex flex-col w-full md:w-auto  p-2 rounded-md flex-1">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Full Name</Table.HeadCell>
                <Table.HeadCell>User Email</Table.HeadCell>
                <Table.HeadCell>Phone Number</Table.HeadCell>
                <Table.HeadCell>Reg. On</Table.HeadCell>
                <Table.HeadCell>Last Log</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              {users?.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-xs">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.fullname}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>
                      {moment(user.createdAt).format("MM/DD/YYYY")}
                    </Table.Cell>
                    <Table.Cell>
                      {moment(user.lastLogin).format("MM/DD/YYYY HH:mm:ss")}
                    </Table.Cell>
                    <Table.Cell className="uppercase">{user.role}</Table.Cell>
                    <Table.Cell className="uppercase">
                      {user.isActive === true ? "active" : "blocked"}
                    </Table.Cell>
                    <Table.Cell>Actions</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>
        </div>

        {/* second */}
        {/* <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 flex-1">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div> */}
      </div>
      {/* third - SHOWING RECENT POSTS*/}
      {/* <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 flex-1">
        <div className="flex justify-between p-3 text-sm font-semibold">
          <h1 className="text-center p-2">Recent Posts</h1>
          <Button outline gradientDuoTone="purpleToPink">
            <Link to={"/dashboard?tab=posts"}>See all</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
          </Table.Head>
          {posts &&
            posts.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <img
                      src={post.image}
                      alt="user"
                      className="w-14. h-10 rounded-md bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell className="w-96">{post.title}</Table.Cell>
                  <Table.Cell className="w-5">{post.category}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div> */}
    </div>
  );
}
