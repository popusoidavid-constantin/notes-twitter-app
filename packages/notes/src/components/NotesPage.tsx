import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { handleTokenExpiration } from "../../../app-main/utils/handleTokenExpiration";

export function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const validToken = handleTokenExpiration(token);

      if (!validToken) {
        console.log("No valid token found");
        router.push("/");
      }

      try {
        const res = await fetch("/api/profile/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.status === 401 || data.error === "User not found") {
          console.log("Token expired or invalid, redirecting to login");
          localStorage.removeItem("token");
          router.push("/");
          return;
        }

        if (data.user) {
          setUser(data.user);
          fetchNotes();
        } else {
          console.error(data.error);
          setError(data.error);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to authenticate");
        setLoading(false);
      }
    };

    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes/public", {
          method: "GET",
        });

        const data = await res.json();

        if (data && data.notes) {
          setNotes(data.notes);
        } else {
          console.error(data.error);
          setError(data.error || "Failed to fetch notes");
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!notes || notes.length === 0) {
    return <p>No notes available</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold ">NotesPage</h2>
      <ul className="flex flex-col items-center justify-center mt-2">
        {notes.map((n) => (
          <li key={n.id}>
            <div className="cursor-pointer text-blue-700 font-semibold " onClick={() => router.push(`/notes/${n.id}`)}>
              {n.title} by {n.author.username}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
