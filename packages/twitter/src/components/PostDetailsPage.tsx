import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getUserInfo } from "../../../app-main/utils/getUserInfo";
import CommentsSection from "./CommentsSection";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Post Details</h2>
      <p>Title: {post.title}</p>
      <p>Content: {post.content}</p>
      <p>Author: {user.username || "Unknown"}</p>
      <p>Likes: {post.likes?.length || 0}</p>
      <img src={post.imageUrl} alt="" className="w-[30%] h-[30%]" />

      {hasAccess && (
        <Link href={{ pathname: `/twitter/edit/${post.id}` }} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Edit
        </Link>
      )}
      <div className="w-[30%] flex flex-row items-center justify-around">
        {hasLiked ? (
          <button onClick={() => handleDislikePost(post.id, user.id)} className="mt-4 w-[30%] py-2 bg-red-500 text-white rounded" disabled={isLoading}>
            {isLoading ? "Loading..." : "Dislike"}
          </button>
        ) : (
          <button onClick={() => handleLikePost(post.id, user.id)} className="mt-4 w-[30%] py-2 bg-emerald-500 text-white rounded" disabled={isLoading}>
            {isLoading ? "Loading..." : "Like"}
          </button>
        )}

        <button onClick={() => router.push("/twitter")} className="mt-4 w-[30%] py-2 bg-blue-500 text-white rounded">
          Back to Feed
        </button>
      </div>
      <CommentsSection postId={String(post.id)} authorId={user.id} />
    </div>
  );
}
