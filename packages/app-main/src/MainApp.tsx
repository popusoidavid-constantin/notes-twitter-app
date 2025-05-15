import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserInfo } from "../utils/getUserInfo";
import { User } from "@/types/User";
import Link from "next/link";
import Loading from "@/components/ui/loading";

export function MainApp({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isActiveLink = (path: string) => router.pathname === path;

  const fetchUserInfo = async (token: string) => {
    try {
      const userInfo = await getUserInfo(token);
      setUser(userInfo);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
      return;
    }
    fetchUserInfo(token);
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (res.ok) {
        localStorage.removeItem("token");
        router.push("/");
      } else {
        console.error("Failed to log out");
      }
    } catch (err) {
      console.error("An error occurred during logout:", err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <p>User not found.</p>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
        >
          {" "}
          Go to login
        </button>
      </>
    );
  }

  let navBar;

  if (router.pathname.startsWith("/notes") && user.role === "STUDENT") {
    navBar = (
      <div className="w-[50%] h-16 bg-[#263340] flex justify-between items-center px-6 text-white">
        <Link href="/notes/new" className={`px-4 py-2 ${isActiveLink("/notes/new") ? "underline" : ""} hover:bg-blue-700 rounded-lg`}>
          New Note
        </Link>
        <Link href="/notes/my-notes" className={`px-4 py-2 ${isActiveLink("/notes/my-notes") ? "underline" : ""} hover:bg-blue-700 rounded-lg`}>
          My Notes
        </Link>
        <Link href="/notes" className={`px-4 py-2 ${isActiveLink("/notes") ? "underline" : ""} hover:bg-blue-700 rounded-lg`}>
          Public Notes
        </Link>
      </div>
    );
  }

  if (router.pathname.startsWith("/notes") && user.role === "TEACHER") {
    navBar = (
      <div className="w-[50%] h-16 bg-[#263340] flex justify-between items-center px-6 text-white">
        <Link href="/notes/new" className={`px-4 py-2 ${isActiveLink("/notes/new") ? "underline" : ""} hover:bg-blue-700 rounded-lg`}>
          New Note
        </Link>
        <Link href="/notes/my-notes" className={`px-4 py-2 ${isActiveLink("/notes/my-notes") ? "underline" : ""} hover:bg-blue-700 rounded-lg`}>
          My Notes
        </Link>
        <Link href="/notes/students-notes" className={`px-4 py-2 ${isActiveLink("/notes/students-notes") ? "underline" : ""} hover:bg-blue-700 rounded-lg`}>
          Student Notes
        </Link>
        <Link href="/notes" className={`px-4 py-2 ${isActiveLink("/notes") ? "underline" : ""} hover:bg-blue-700 rounded-lg`}>
          Public Notes
        </Link>
      </div>
    );
  }

  if (router.pathname.startsWith("/twitter")) {
    navBar = (
      <div className="w-[50%] h-16 bg-[#263340] flex justify-between items-center px-6 text-white">
        <Link href="/twitter/new" className={`px-4 py-2 ${isActiveLink("/twitter/new") ? "underline" : ""} hover:bg-blue-700 rounded-lg`}>
          New Post
        </Link>
        <Link href="/twitter/my-posts" className={`px-4 py-2 ${isActiveLink("/twitter/my-posts") ? "underline" : ""} hover:bg-blue-700 rounded-lg`}>
          My Posts
        </Link>
        <Link href="/twitter" className={`px-4 py-2 ${isActiveLink("/twitter") ? "underline" : ""} hover:bg-blue-700 rounded-lg`}>
          Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#15202B]">
      <aside className="w-20 bg-blue-900 flex flex-col items-center pt-6 space-y-6">
        <button onClick={() => router.push("/notes")} className="border-2 border-white text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200">
          📝
        </button>
        <button onClick={() => router.push("/twitter")} className="border-2 border-white text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200">
          🐦
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-[#1E2732] flex justify-between items-center px-6 text-white">
          {navBar}
          <div className="w-[20%] h-16 flex justify-between items-center px-4">
            <Link href="/dashboard" className="text-lg font-semibold hover:text-blue-400 transition duration-200">
              {user.username}
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
