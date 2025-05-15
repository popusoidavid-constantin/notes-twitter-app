import React from "react";
import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link href={`/twitter/${post.id}`} className="block bg-[#1E2732] p-6 rounded-2xl shadow hover:bg-[#263340] transition duration-200 cursor-pointer">
      <h1 className="text-2xl font-bold text-white mb-2">{post.title}</h1>
      <h2 className="text-md text-white">{post.content}</h2>
    </Link>
  );
}
