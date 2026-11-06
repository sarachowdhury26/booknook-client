"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f5]">
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h1 className="mb-4 text-2xl font-bold text-[#284d3c]">
            Please Login First
          </h1>
          <Link
            href="/login"
            className="rounded-lg bg-[#284d3c] px-6 py-3 text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] px-5 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#284d3c]">
          My Profile
        </h1>

        <div className="mb-8 flex flex-col items-center">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#284d3c] text-4xl font-bold text-white">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.name || "BookNook User"}
          </h2>

          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-[#faf9f5] p-4">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-semibold text-gray-800">
              {user.name || "Not available"}
            </p>
          </div>

          <div className="rounded-lg bg-[#faf9f5] p-4">
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-semibold text-gray-800">
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/my-books"
            className="rounded-lg bg-[#284d3c] px-5 py-3 font-semibold text-white"
          >
            My Books
          </Link>

          <Link
            href="/my-borrows"
            className="rounded-lg border border-[#284d3c] px-5 py-3 font-semibold text-[#284d3c]"
          >
            My Borrows
          </Link>
        </div>
      </div>
    </main>
  );
}