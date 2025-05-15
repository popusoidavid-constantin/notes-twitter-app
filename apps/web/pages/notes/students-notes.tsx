import React, { useState, useEffect } from "react";
import NoteCard from "../../../../packages/notes/src/components/NoteCard";

export default function MyStudentsNotes() {
  const [notes, setNotes] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/notes/students-shared-notes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setStatus(res.status);
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
    return <p>Loading...</p>;
  }

  if (notes && notes.length === 0) {
    return <p>You don't have any notes</p>;
  }

  console.log("Status Code:", status);
  console.log(notes);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold ">My Students Notes</h2>
      <ul className="flex flex-col items-center justify-center mt-2">
        {notes.map((note, index) => (
          <li key={note.id} className="cursor-pointer text-blue-700 font-semibold text-center mt-5">
            <NoteCard note={note} index={index}></NoteCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
