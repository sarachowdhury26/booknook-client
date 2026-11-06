"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Step 1: Login with Better Auth
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error || !data) {
        setMessage(error?.message || "Login failed.");
        return;
      }

      // Step 2: Get Better Auth JWT
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        setMessage("Unable to get authentication token.");
        return;
      }

      // Step 3: Get user information
      const { data: sessionData, error: sessionError } =
        await authClient.getSession();

      if (sessionError || !sessionData?.user) {
        setMessage("Unable to get user information.");
        return;
      }

      // Step 4: Save token and user
      localStorage.setItem("token", tokenData.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: sessionData.user.name,
          email: sessionData.user.email,
          photoURL: sessionData.user.image || "",
        })
      );

      window.dispatchEvent(new Event("auth-change"));

      // Step 5: Go to Books page
      router.push("/books");

    } catch (error) {
      setMessage("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Login to your BookNook account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-blue-500"
            />
          </div>

          {message && (
            <p className="text-center text-sm text-red-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}