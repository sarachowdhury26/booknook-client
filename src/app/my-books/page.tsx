"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyBooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingBook, setEditingBook] = useState<any>(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Fiction",
    image: "",
    description: "",
    totalCopies: 1,
  });

  const fetchMyBooks = async () => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setMessage("Please login first.");
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      const response = await fetch("http://localhost:5000/api/books");
      const data = await response.json();

      if (!response.ok) throw new Error();

      const allBooks = Array.isArray(data) ? data : data.books || [];

      setBooks(
        allBooks.filter(
          (book: any) => book.createdByEmail === user.email
        )
      );
    } catch {
      setMessage("Unable to load your books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const handleEdit = (book: any) => {
    setEditingBook(book);

    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      image: book.image,
      description: book.description,
      totalCopies: book.totalCopies,
    });

    setMessage("");
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${editingBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Update failed.");
        return;
      }

      setMessage("Book updated successfully!");
      setEditingBook(null);
      await fetchMyBooks();
    } catch {
      setMessage("Server connection failed.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Delete failed.");
        return;
      }

      setMessage("Book deleted successfully!");
      await fetchMyBooks();
    } catch {
      setMessage("Server connection failed.");
    }
  };

  if (loading) {
    return <p className="py-20 text-center">Loading your books...</p>;
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] px-5 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-[#284d3c]">
          My Books
        </h1>

        <p className="mb-8 text-gray-600">
          Manage the books you have added to BookNook.
        </p>

        {message && (
          <p className="mb-5 text-center text-sm text-[#284d3c]">
            {message}
          </p>
        )}

        {editingBook && (
          <form
            onSubmit={handleUpdate}
            className="mb-10 space-y-4 rounded-xl bg-white p-6 shadow"
          >
            <h2 className="text-2xl font-bold text-[#284d3c]">
              Edit Book
            </h2>

            <input
              required
              placeholder="Book Title"
              className="w-full rounded-lg border p-3"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              required
              placeholder="Author"
              className="w-full rounded-lg border p-3"
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
            />

            <select
              className="w-full rounded-lg border p-3"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Kids">Kids</option>
              <option value="Others">Others</option>
            </select>

            <input
              required
              placeholder="Image URL"
              className="w-full rounded-lg border p-3"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
            />

            <textarea
              required
              placeholder="Description"
              rows={4}
              className="w-full rounded-lg border p-3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="number"
              min="1"
              required
              className="w-full rounded-lg border p-3"
              value={form.totalCopies}
              onChange={(e) =>
                setForm({
                  ...form,
                  totalCopies: Number(e.target.value),
                })
              }
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-lg bg-[#284d3c] px-5 py-3 font-semibold text-white"
              >
                Update Book
              </button>

              <button
                type="button"
                onClick={() => setEditingBook(null)}
                className="rounded-lg border px-5 py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {books.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="mb-5 text-gray-600">
              You have not added any books yet.
            </p>

            <Link
              href="/add-book"
              className="rounded-full bg-[#284d3c] px-6 py-3 font-semibold text-white"
            >
              Add Your First Book
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-5 text-gray-600">
              Total books: {books.length}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="overflow-hidden rounded-xl bg-white shadow"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">
                    <p className="text-sm text-[#b47b45]">
                      {book.category}
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-gray-800">
                      {book.title}
                    </h2>

                    <p className="mt-1 text-gray-600">
                      By {book.author}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      Available copies: {book.availableCopies}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={`/books/${book._id}`}
                        className="rounded-lg bg-[#284d3c] px-4 py-2 text-sm font-semibold text-white"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => handleEdit(book)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}