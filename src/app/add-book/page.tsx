"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
    totalCopies: 1,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          availableCopies: form.totalCopies,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to add book");
        return;
      }

      setMessage("Book added successfully!");
      setTimeout(() => router.push("/books"), 1000);
    } catch {
      setMessage("Server connection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Link href="/" className="text-teal-700">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mt-6 mb-6">
        Add a New Book
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["title", "Book Title"],
          ["author", "Author"],
          ["category", "Category"],
          ["image", "Image URL"],
          ["description", "Description"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block mb-2 font-medium">
              {label}
            </label>

            {name === "description" ? (
              <textarea
                required
                className="w-full border rounded-lg p-3"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            ) : name === "category" ? (
              <select
                required
                className="w-full border rounded-lg p-3"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            ) : (
              <input
                required
                className="w-full border rounded-lg p-3"
                value={form[name as "title" | "author" | "image"]}
                onChange={(e) =>
                  setForm({ ...form, [name]: e.target.value })
                }
              />
            )}
          </div>
        ))}

        <label className="block font-medium">
          Total Copies
        </label>

        <input
          type="number"
          min="1"
          required
          className="w-full border rounded-lg p-3"
          value={form.totalCopies}
          onChange={(e) =>
            setForm({ ...form, totalCopies: Number(e.target.value) })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-700 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>

        {message && (
          <p className="text-center text-sm text-red-600">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}