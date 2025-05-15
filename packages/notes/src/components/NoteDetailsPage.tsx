import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getUserInfo } from "../../../app-main/utils/getUserInfo";
import Loading from "@/components/ui/loading";
import { Note, User } from "@/types/User";

export function NoteDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState<Note>();
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string | null>(null);
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
    return <Loading />;
  }
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-blue-900 mb-6">Note Details</h2>

      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-800">
          <strong>Title:</strong> {note.title}
        </p>

        <p className="text-lg font-medium text-gray-800">
          <strong>Content:</strong> {note.content}
        </p>

        <p className="text-lg font-medium text-gray-800">
          <strong>Author:</strong> {note.author?.username || "Unknown"}
        </p>
      </div>

      {hasAccess && (
        <div className="mt-6">
          <Link href={`/notes/edit/${note.id}`} className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300">
            Edit Note
          </Link>
        </div>
      )}

      <div className="mt-4">
        <button onClick={() => router.push("/notes")} className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300">
          Back to Notes
        </button>
      </div>
    </div>
  );
}
