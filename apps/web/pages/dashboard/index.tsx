import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/profile/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            setUserPosts(data.userPosts);
            setUserNotes(data.userNotes);
          } else {
            console.error(data.error);
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log(userPosts, userNotes);
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="p-8 rounded-lg shadow-lg w-[90%] h-[50%] sm:w-[80%] sm:h-[80%] flex flex-col justify-center items-center bg-gray-100 ">
          <h2 className="text-2xl font-semibold text-center mb-6">Dashboard</h2>
          <h3>{user.username}</h3>
          <h4>{user.role}</h4>

          <div className="sm:p-8 rounded-lg shadow-lg w-[100%] sm:w-[80%] sm:h-[80%] h-[100%] flex flex-row justify-between items-center bg-gray-100 ">
            <div className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-[50%] h-[50%] sm:h-[100%] sm:w-[50%] text-center">
              <h1>Notes</h1>
              <h2>{userNotes?.length}</h2>
            </div>

            <div className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-[50%] h-[50%] sm:h-[100%] sm:w-[50%] text-center">
              <h1>Tweets</h1>
              <h2>{userPosts?.length}</h2>
            </div>
          </div>
          <Link href="/.." className="w-[80%] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none text-center">
            Go back
          </Link>
        </div>
      </div>
    </>
  );
}
