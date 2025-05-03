import React from "react";
import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link href={`/twitter/${post.id}`}>
      <h1>{post.title}</h1>
      <h2>{post.content}</h2>
    </Link>
  );
}
