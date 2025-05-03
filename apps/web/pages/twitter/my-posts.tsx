import React, { useState, useEffect } from "react";
import PostCard from "../../../../packages/twitter/src/components/PostCard";
export default function MyPrivatePosts() {
  const [posts, setPosts] = useState(null);
  const [status, setStatus] = useState(null);
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
    return <p>Loading...</p>;
  }

  if (posts && posts.length === 0) {
    return <p>You don't have any post</p>;
  }

  console.log("Status Code:", status);
  return (
    <div>
      <h1>My posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post}></PostCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
