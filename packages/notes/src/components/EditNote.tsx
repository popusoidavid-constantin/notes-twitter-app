import { useEffect } from "react";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Teacher = {
  id: string;
  username: string;
};

type Note = {
  id: string;
  title: string;
  content: string;
  isPublic: boolean;
};

export function EditNote() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [note, setNote] = useState<Note | null>(null);
  const [teacherId, setTeacherId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const getTeachers = async () => {
    try {
      const response = await fetch(`/api/profile/get-teachers`, {
        method: "GET",
      });

      if (!response.ok) {
        console.error("Something went wrong");
        return;
      }

      const data = await response.json();
      setTeachers(data.teachers);
    } catch (err) {
      console.error("Note info could not be fetched", err);
    }
  };

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
      setTitle(data.note.title);
      setContent(data.note.content);
      setIsPublic(data.note.isPublic);
    } catch (err) {
      console.error("Note info could not be fetched", err);
    }
  };

  useEffect(() => {
    if (!id) return;
    getNoteInfo(id);
    getTeachers();
  }, [id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/notes/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          isPublic,
          noteId: note.id,
          teacherId: teacherId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || data.message || "Something went wrong");
        return;
      }
      router.push("/notes");
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  const handleDeleteNote = async () => {
    try {
      const response = await fetch("/api/notes/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noteId: note.id,
        }),
      });

      alert(`Note ${note.title} deleted`);

      router.push("/notes");
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 ">
        <div className="bg-white p-8 rounded-lg shadow-lg shadow-[#787878] w-[90%] h-[90%] mt-20">
          <h2 className="text-2xl font-semibold text-center mb-6">Edit Note</h2>
          <form className="space-y-4" onSubmit={handleEdit}>
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
                onChange={(e) => setTitle(e.target.value)}
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
                className="mt-1 w-full text-start px-3 h-[20vh] py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="isPublic" className="block text-sm font-medium text-gray-700">
                Is Public
              </label>
              <input type="checkbox" id="isPublic" name="isPublic" className="mt-1" checked={isPublic} onChange={() => setIsPublic((prev) => !prev)} />
            </div>
            <div>
              <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">
                Share Note With Teacher:
              </label>
              <select
                id="teacher"
                name="teacher"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
              >
                <option value="">Select a teacher or not:</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[100%] flex flex-col items-center justify-center">
              <button type="submit" className="w-[20%] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none font-semibold">
                Edit Note
              </button>
            </div>
          </form>
          <div className="w-[100%] flex flex-col items-center justify-center">
            <button onClick={handleDeleteNote} className="w-[20%] mt-10 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none font-semibold">
              Delete Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
