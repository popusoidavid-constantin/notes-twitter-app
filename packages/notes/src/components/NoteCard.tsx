import React from "react";
import Link from "next/link";

export default function NoteCard({ note, index }) {
  return (
    <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-blue-900 mb-2">{note.title}</h2>
      <p className="text-gray-700 text-sm mb-4 line-clamp-4">{note.description}</p>
      <div className="text-right">
        <Link href={`/notes/${note.id}`} className="text-blue-600 hover:underline font-medium text-sm">
          View Note →
        </Link>
      </div>
    </div>
  );
}
