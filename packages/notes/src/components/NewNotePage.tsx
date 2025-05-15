import { useEffect } from "react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { User } from "@/types/User";
export function NewNotePage() {
  const [user, setUser] = useState<User>();
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
        router.push("/notes/my-notes");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-start h-screen bg-[#15202B]">
      <div className="bg-blue-900 p-8 rounded-xl shadow-lg w-[90%] h-[65%]">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">New Note</h2>
        <p className="text-red-500 text-center mb-4">{error}</p>
        <form className="space-y-6" onSubmit={handleCreate}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white">
              Note Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-bold text-white bg-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-white">
              Note Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              className="mt-1 w-full text-start px-4 h-[20vh] py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-bold text-white bg-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-[20%] bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none font-semibold transition duration-200">
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
