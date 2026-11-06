"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getBook() {
      const { id } = await params;

      try {
        const res = await fetch(`http://localhost:5000/api/books/${id}`);
        const data = await res.json();

        if (res.ok) {
          setBook(data.book || data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getBook();
  }, [params]);

  const handleBorrow = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first to borrow this book.");
      return;
    }

    if (book.availableCopies < 1) {
      setMessage("This book is currently unavailable.");
      return;
    }

    setBorrowing(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/borrows/${book._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to borrow book.");
        return;
      }

      setBook((prev: any) => ({
        ...prev,
        availableCopies: prev.availableCopies - 1,
      }));

      setMessage("Book borrowed successfully!");
    } catch {
      setMessage("Server connection failed.");
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) return <p>Loading book details...</p>;

  if (!book) return <p>Book not found.</p>;

  return (
    <main className="max-w-5xl mx-auto p-8">
      <Link href="/books" className="text-teal-700">
        ← Back to Books
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-96 object-cover rounded-xl"
        />

        <div>
          <p className="text-teal-700">{book.category}</p>

          <h1 className="text-3xl font-bold mt-3">
            {book.title}
          </h1>

          <p className="mt-3 text-gray-600">
            By {book.author}
          </p>

          <p className="mt-5 text-gray-700">
            {book.description}
          </p>

          <p className="mt-5">
            Total Copies: {book.totalCopies}
          </p>

          <p>
            Available Copies: {book.availableCopies}
          </p>

          <button
            onClick={handleBorrow}
            disabled={borrowing || book.availableCopies < 1}
            className="mt-6 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {borrowing
              ? "Borrowing..."
              : book.availableCopies < 1
              ? "Unavailable"
              : "Borrow This Book"}
          </button>

          {message && (
            <p className="mt-4 text-sm font-medium text-teal-700">
              {message}
            </p>
          )}

          <Link
            href="/my-borrows"
            className="ml-4 text-teal-700 underline"
          >
            My Borrows
          </Link>
        </div>
      </div>
    </main>
  );
}