import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { handleTokenExpiration } from "../../../app-main/utils/handleTokenExpiration";
import NoteCard from "./NoteCard";
import Loading from "@/components/ui/loading";
import { User, Note } from "@/types/User";

export function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    return <Loading />;
  }

  if (error) {
    return <p>No notes available</p>;
  }

  if (!notes || notes.length === 0) {
    return <p>No notes available</p>;
  }

  return (
    <div className="min-h-screen bg-blue-900 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-white text-3xl font-bold mb-8 text-center">📘 Public Student Notes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <NoteCard note={note} index={index} />
        ))}
      </div>
    </div>
  );
}
