import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Post } from "@/types/User";
import Loading from "@/components/ui/loading";

export default function MyPrivatePosts() {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/twitter/private", {
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
          setPosts(data.posts || []);
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

  if (posts && posts.length === 0) {
    return <p>You don't have any post</p>;
  }

  console.log("Status Code:", status);
  return (
    <div className="min-h-screen bg-[#15202B] py-10 px-4 sm:px-6 lg:px-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">My Posts</h1>

      <ul className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
