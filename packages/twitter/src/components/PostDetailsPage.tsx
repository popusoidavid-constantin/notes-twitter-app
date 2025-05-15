import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getUserInfo } from "../../../app-main/utils/getUserInfo";
import CommentsSection from "./CommentsSection";
import Loading from "@/components/ui/loading";

interface User {
  id: string;
  username: string;
}
interface Post {
  id: string;
  title: string;
  content: string;
  author?: {
    username: string;
  };
  authorId: string;
  imageUrl?: string;
  likes?: { userId: string }[];
}

export function PostDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const fetchUserInfo = async (token) => {
    const userInfo = await getUserInfo(token);
    setUser(userInfo);
  };

  const getPostInfo = async (postId) => {
    try {
      const response = await fetch(`/api/twitter/${postId}`, {
        method: "GET",
      });

      if (!response.ok) {
        console.error("Something went wrong");
        return;
      }

      const data = await response.json();
      setPost(data.post);
    } catch (err) {
      console.error("Note info could not be fetched", err);
    }
  };

  const handleLikePost = async (postId, userId) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/twitter/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId }),
      });

      if (response.ok) {
        await getPostInfo(postId); // Refresh likes
        setHasLiked(true);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislikePost = async (postId, userId) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/twitter/dislike", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userId }),
      });

      if (response.ok) {
        await getPostInfo(postId);
        setHasLiked(false);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady || !id || !token) return;

    const init = async () => {
      const userInfo = await getUserInfo(token);
      setUser(userInfo);
      await getPostInfo(String(id));
    };

    init();
  }, [router.isReady, id, token]);

  useEffect(() => {
    if (post && user) {
      setHasAccess(post.authorId === user.id);
      const liked = post.likes?.some((like) => like.userId === user.id);
      setHasLiked(!!liked);
    }
  }, [post, user]);

  if (!post || !user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#15202B] py-10 px-4 sm:px-6 lg:px-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">📜 Post Details</h1>

      <div className="max-w-2xl mx-auto space-y-6 bg-[#1E2732] p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold text-white mb-4">{post.title}</h2>
        <p className="text-white mb-4">Content: {post.content}</p>
        <p className="text-white mb-4">Author: {user.username || "Unknown"}</p>
        <p className="text-white mb-4">Likes: {post.likes?.length || 0}</p>

        {post.imageUrl && <img src={post.imageUrl} alt="Post Image" className="w-full h-[300px] object-cover rounded-lg mb-6" />}

        {hasAccess && (
          <Link href={{ pathname: `/twitter/edit/${post.id}` }} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg text-center block">
            Edit Post
          </Link>
        )}

        <div className="flex justify-between mt-4">
          {hasLiked ? (
            <button onClick={() => handleDislikePost(post.id, user.id)} className="px-6 py-3 bg-red-500 text-white rounded-lg w-[48%]" disabled={isLoading}>
              {isLoading ? "Loading..." : "Dislike"}
            </button>
          ) : (
            <button onClick={() => handleLikePost(post.id, user.id)} className="px-6 py-3 bg-emerald-500 text-white rounded-lg w-[48%]" disabled={isLoading}>
              {isLoading ? "Loading..." : "Like"}
            </button>
          )}

          <button onClick={() => router.push("/twitter")} className="px-6 py-3 bg-blue-500 text-white rounded-lg w-[48%]">
            Back to Feed
          </button>
        </div>

        <div className="mt-6">
          <CommentsSection postId={String(post.id)} authorId={user.id} />
        </div>
      </div>
    </div>
  );
}
