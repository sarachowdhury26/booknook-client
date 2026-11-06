"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);useEffect(() => {
  const checkUser = () => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  checkUser();

  window.addEventListener("auth-change", checkUser);
  window.addEventListener("storage", checkUser);

  return () => {
    window.removeEventListener("auth-change", checkUser);
    window.removeEventListener("storage", checkUser);
  };
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setProfileOpen(false);

    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e9e7df] bg-[#faf9f5]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#284d3c] text-xl text-white">
            B
          </span>

          <span className="text-2xl font-bold tracking-tight">
            Book<span className="text-[#b47b45]">Nook.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href="/" className="hover:text-[#b47b45]">Home</Link>
          <Link href="/books" className="hover:text-[#b47b45]">All Books</Link>

          {user && (
            <>
              <Link href="/add-book" className="hover:text-[#b47b45]">Add Book</Link>
              <Link href="/my-books" className="hover:text-[#b47b45]">My Books</Link>
              <Link href="/my-borrows" className="hover:text-[#b47b45]">My Borrows</Link>
            </>
          )}
        </div>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#284d3c] font-bold text-white"
            >
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border bg-white p-3 shadow-lg">
                <p className="mb-3 truncate font-semibold text-gray-800">
                  {user.name}
                </p>

                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded px-3 py-2 text-sm hover:bg-gray-100"
                >
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full bg-[#284d3c] px-6 py-3 text-sm font-semibold text-white hover:bg-[#193729]"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-full border border-[#284d3c] px-5 py-3 text-sm font-semibold text-[#284d3c] hover:bg-[#284d3c] hover:text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}