import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function TweetsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/twitter/public", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPosts(data.posts);
          setLoading(false);
        } else {
          console.error(data.error);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!posts) {
    return <p>No tweets</p>;
  }

  console.log(posts);

  return (
    <div className="flex flex-col items-center w-[100%] justify-center">
      <h2 className="text-2xl font-bold flex items-center w-[100%] justify-center">Twitter</h2>
      <ul className="flex flex-col items-center w-[100%] justify-center mt-10">
        {posts.map((p) => (
          <li key={p.id}>
            <div className="cursor-pointer text-blue-500 underline" onClick={() => router.push(`/twitter/${p.id}`)}>
              {p.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
