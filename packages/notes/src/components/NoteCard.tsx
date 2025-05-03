import React from "react";
import Link from "next/link";

export default function NoteCard({ note }) {
  return (
    <Link href={`/notes/${note.id}`}>
      <h1>{note.title} wrote:</h1>
      <h2>{note.content}</h2>
    </Link>
  );
}
