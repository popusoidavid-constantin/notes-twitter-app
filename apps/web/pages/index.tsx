import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { isLoggedIn } from "./utils/isLoggedIn";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/notes");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("User logged in:", data);
        localStorage.setItem("token", data.token);
        router.push("/notes");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg  shadow-lg shadow-[#787878] max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none font-semibold">
            Login
          </button>
        </form>
      </div>
      <div className="mt-10 bg-blue-500 p-8 rounded-lg shadow-lg shadow-[#787878] max-w-sm w-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Don't have an account?</h2>
        <Link
          href="/register"
          className=" bg-white font-semibold text-blue-500 py-2 px-20 rounded-lg border-2 border-blue-500 hover:bg-blue-500 hover:border-white hover: hover:text-slate-50  focus:outline-none"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
