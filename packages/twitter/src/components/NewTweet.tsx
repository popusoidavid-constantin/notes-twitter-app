import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function NewTweet() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");
  const router = useRouter();

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

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    if (!user) {
      setError("You must be logged in to create a post");
      setUploading(false);
      return;
    }

    if (!title || !content) {
      setError("Title and content are required");
      setUploading(false);
      return;
    }

    let imageUrl = "";

    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("userId", user.id);

        const uploadRes = await fetch("/api/twitter/upload-image", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          setError("Image upload failed: " + (uploadData.error || ""));
          setUploading(false);
          return;
        }

        imageUrl = uploadData.url;
        console.log("Image uploaded URL:", imageUrl);
      } catch (err) {
        console.error("Upload error:", err);
        setError("Image upload failed");
        setUploading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/twitter/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          content,
          authorId: user.id,
          imageUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Post created successfully:", data);
        router.push("/twitter");
      } else {
        setError(data.error || "Post creation failed");
      }
    } catch (err) {
      console.error("Post creation error:", err);
      setError("An error occurred: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/twitter/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Upload reqult: ", data);
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

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg shadow-[#787878] w-[90%] h-[90%] mt-20">
        <h2 className="text-2xl font-semibold text-center mb-6">New Post</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleCreate}>
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
              {uploading ? "Processing..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
