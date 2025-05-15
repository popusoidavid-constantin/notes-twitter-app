import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/ui/loading";
import { User, Post } from "@/types/User";

export function EditTweet() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [post, setPost] = useState<Post>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const postId = router.query.id;

    if (!token || !postId) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/twitter/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.post) {
          setPost(data.post);
          setTitle(data.post.title);
          setContent(data.post.content);
          setImagePreview(data.post.imageUrl);
          setLoading(false);
        } else {
          setError("Failed to fetch post.");
        }
      } catch (err) {
        console.error(err);
        setError("Error loading post.");
      }
    };

    fetchPost();
  }, [router.query.id]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthError("Not authenticated");
        router.push("/");
        return;
      }

      try {
        const res = await fetch("/api/profile/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          console.log("Token expired, redirecting to login");
          localStorage.removeItem("token");
          router.push("/");
          return;
        }

        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setAuthError(data.error || "User not found");
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setAuthError("Failed to authenticate");
      }
    };

    checkAuth();
  }, [router]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    const token = localStorage.getItem("token");
    const postId = router.query.id;
    const authorId = user?.id;

    if (!title || !content) {
      setError("Title and content are required");
      setUploading(false);
      return;
    }

    let imageUrl = "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("userId", user.id);

      const uploadRes = await fetch("/api/twitter/upload-image", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        setError("Image upload failed");
        setUploading(false);
        return;
      }

      imageUrl = uploadData.url;
    }

    try {
      const res = await fetch(`/api/twitter/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
          authorId,
          postId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/twitter");
      } else {
        setError(data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePost = async (e) => {
    try {
      const response = await fetch("/api/twitter/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post.id,
        }),
      });

      alert(`Note ${post.title} deleted`);

      router.push("/twitter");
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  if (authError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-500">{authError}</p>
          <button onClick={() => router.push("/")} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  console.log(imageFile);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-5 rounded-lg shadow-lg shadow-[#787878] w-[90%] h-[95%] mt-20">
        <h2 className="text-2xl font-semibold text-center mb-3">Edit Post</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleEdit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Post Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              className="mt-1 w-full text-start px-3 h-[20vh] py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Post Image
            </label>

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImageFile(file);
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />

            <div className="mt-2 text-sm text-gray-600">
              {imageFile ? `Selected: ${imageFile.name}` : imagePreview ? `Current: ${decodeURIComponent(imagePreview.split("/").pop())}` : "No image selected"}
            </div>

            {imagePreview && <img src={imagePreview} alt="Preview" className="w-[30%] mt-2 rounded shadow" />}
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <button type="submit" className="w-[20%] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none font-semibold disabled:bg-gray-400" disabled={uploading}>
              {uploading ? "Updating..." : "Update Post"}
            </button>
          </div>
          <div className="w-[100%] flex flex-col items-center justify-center">
            <button onClick={handleDeletePost} className="w-[20%] mt-5 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none font-semibold">
              Delete Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
