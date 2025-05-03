import { useEffect } from "react";
import { useRouter } from "next/router";
import React, { useState } from "react";
export function NewNotePage() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
          } else {
            console.error(data.error);
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/notes/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, userId: user.id }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Note created", data);
        router.push("/notes");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 ">
        <div className="bg-white p-8 rounded-lg  shadow-lg shadow-[#787878] w-[90%] h-[90%] mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6">New Note</h2>
          <p className="text-red-500 text-center mb-4"></p>
          <form className="space-y-4" onSubmit={handleCreate}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Note Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Note Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                className="mt-1  w-full text-start px-3 h-[20vh] py-2  border  border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <div className=" w-[100%] flex flex-col items-center justify-center">
              <button type="submit" className="w-[20%] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none font-semibold">
                Create Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
