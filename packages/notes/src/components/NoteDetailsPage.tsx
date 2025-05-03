import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getUserInfo } from "../../../app-main/utils/getUserInfo";

export function NoteDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const getNoteInfo = async (noteId) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "GET",
      });

      if (!response.ok) {
        console.error("Something went wrong");
        return;
      }

      const data = await response.json();
      setNote(data.note);
    } catch (err) {
      console.error("Note info could not be fetched", err);
    }
  };

  const fetchUserInfo = async (token) => {
    const userInfo = await getUserInfo(token);
    setUser(userInfo);
  };

  useEffect(() => {
    if (!id || !token) return;

    getNoteInfo(id);
    fetchUserInfo(token);
  }, [id, token]);

  useEffect(() => {
    if (note && user) {
      setHasAccess(note.authorId === user.id);
    }
  }, [note, user]);

  if (!note || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Note Details</h2>
      <p>Title: {note.title}</p>
      <p>Content: {note.content}</p>
      <p>Author: {note.author?.username || "Unknown"}</p>
      {hasAccess && (
        <Link href={{ pathname: `/notes/edit/${note.id}` }} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Edit
        </Link>
      )}
      <button onClick={() => router.push("/notes")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Back to Notes
      </button>
    </div>
  );
}
