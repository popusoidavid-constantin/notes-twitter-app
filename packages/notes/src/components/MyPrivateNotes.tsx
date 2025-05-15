import React, { useState, useEffect } from "react";
import { Note } from "../../../../apps/web/types/User";
import NoteCard from "./NoteCard";
import Loading from "@/components/ui/loading";

export default function MyPrivateNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/notes/private", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNotes(data.notes || []);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (notes && notes.length === 0) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center">
        <p className="text-white text-lg">You don't have any private notes.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-900 py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-white text-3xl font-bold mb-8 text-center">🔒 My Private Notes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <NoteCard index={index} note={note} />
        ))}
      </div>
    </div>
  );
}
