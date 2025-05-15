"use client";

import React, { useEffect, useState } from "react";
import { Comment } from "@/types/User";

export default function CommentsSection({ postId, authorId }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments/${postId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/comments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          authorId,
          content,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setContent("");
        await fetchComments();
        console.log(result);
      } else {
        console.error("Error posting comment:", result.error);
      }
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Add a comment..." className="flex-1 border rounded px-3 py-2" disabled={loading} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      <ul>
        {comments.length === 0 && <li className="text-gray-500">No comments yet.</li>}
        {comments.map((comment) => (
          <li key={comment.id} className="border-b py-2">
            <strong>{comment.author?.username || "Anonymous"}:</strong> {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
