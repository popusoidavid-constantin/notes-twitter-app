import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Post } from "@/types/User";
import Loading from "@/components/ui/loading";

export function TweetsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>();
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
    return <Loading />;
  }

  if (!posts) {
    return <p>No tweets</p>;
  }

  console.log(posts);

  return (
    <div className="min-h-screen bg-[#15202B] py-10 px-4 sm:px-6 lg:px-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">🐦 Twitter Feed</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-[#1E2732] p-6 rounded-2xl shadow hover:bg-[#263340] transition duration-200 cursor-pointer flex flex-col items-center"
            onClick={() => router.push(`/twitter/${p.id}`)}
          >
            <h2 className="text-lg font-semibold text-white">{p.title}</h2>
            {p.imageUrl && <Image src={p.imageUrl} alt="Tweet Post" width={400} height={200} className="rounded" />}
          </div>
        ))}
      </div>
    </div>
  );
}
