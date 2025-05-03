import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserInfo } from "../utils/getUserInfo";
import Link from "next/link";

export function MainApp({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
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
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error: User not found</div>;
  }

  let navBar;

  if (router.pathname.startsWith("/notes") && user.role === "STUDENT") {
    navBar = (
      <div className="w-[30%] h-16 bg-gray-200 flex justify-between items-center px-4">
        <Link href="/notes/new" className={isActiveLink("/notes/new") ? "underline" : ""}>
          New Note
        </Link>
        <Link href="/notes/my-notes" className={isActiveLink("/notes/notes") ? "underline" : ""}>
          My Notes
        </Link>
        <Link href="/notes" className={isActiveLink("/notes") ? "underline" : ""}>
          Public Notes
        </Link>
      </div>
    );
  }
  if (router.pathname.startsWith("/notes") && user.role === "TEACHER") {
    navBar = (
      <div className="w-[30%] h-16 bg-gray-200 flex justify-between items-center px-4">
        <Link href="/notes/new" className={isActiveLink("/notes/new") ? "underline" : ""}>
          New Note
        </Link>
        <Link href="/notes/my-notes" className={isActiveLink("/notes/notes") ? "underline" : ""}>
          My Notes
        </Link>
        <Link href="/notes/students-notes" className={isActiveLink("/notes/private/students") ? "underline" : ""}>
          Student Notes
        </Link>
        <Link href="/notes" className={isActiveLink("/notes") ? "underline" : ""}>
          Public Notes
        </Link>
      </div>
    );
  }

  if (router.pathname.startsWith("/twitter")) {
    navBar = (
      <div className="w-[30%] h-16 bg-gray-200 flex justify-between items-center px-4">
        <Link href="/twitter/new" className={isActiveLink("/twitter/new") ? "underline" : ""}>
          New Post
        </Link>
        <Link href="/twitter/my-posts" className={isActiveLink("/twitter/my-posts") ? "underline" : ""}>
          My Posts
        </Link>
        <Link href="/twitter/" className={isActiveLink("/twitter") ? "underline" : ""}>
          Feed
        </Link>
      </div>
    );
  }
  return (
    <div className="flex h-screen">
      <aside className="w-20 bg-blue-900 flex flex-col items-center pt-4 space-y-4">
        <button onClick={() => router.push("/notes")} className="border-2 border-white px-4 py-2 rounded-xl">
          📝
        </button>
        <button onClick={() => router.push("/twitter")} className="border-2 border-white px-4 py-2 rounded-xl">
          🐦
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-gray-200 flex justify-between items-center px-4">
          {navBar}
          <div className=" w-[15%] h-16 bg-gray-200 flex justify-between items-center px-4">
            <Link href="/dashboard">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
