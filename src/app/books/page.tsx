"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);

useEffect(() => {
  fetch("https://booknook-server-9ypp.onrender.com/api/books")
    .then((res) => res.json())
    .then((data) => setBooks(data))
    .catch((error) => console.error(error));
}, []);
  return (
    <main className="min-h-screen bg-[#faf9f5]">

      {/* Page Heading */}
      <section className="bg-[#284d3c] px-5 py-20 text-center text-white">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#e5b77e]">
          Find Your Next Read
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">
          Explore Our Books
        </h1>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-200">
          From inspiring stories to interesting discoveries,
          find a book that matches your curiosity.
        </p>
      </section>

      {/* Books Collection */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#253b32]">
              Our Collection
            </h2>
            <p className="mt-2 text-sm text-[#777d75]">
              Browse books from different categories.
            </p>
          </div>

          <span className="rounded-full bg-[#eae9df] px-5 py-2 text-sm font-semibold text-[#284d3c]">
            {books.length} Books
          </span>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {books.map((book) => (
            <article
              key={book._id}
              className="group overflow-hidden rounded-2xl border border-[#eeece4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* Book Image */}
              <div
                role="img"
                aria-label={book.title}
                className="h-64 bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: `url("${book.image}")`
                }}
              />

              {/* Book Information */}
              <div className="p-6">

                <span className="rounded-full bg-[#f0efe7] px-3 py-1 text-xs font-semibold text-[#947044]">
                  {book.category}
                </span>

                <h3 className="mt-4 text-xl font-bold text-[#253b32]">
                  {book.title}
                </h3>

                <p className="mt-2 text-sm text-[#777d75]">
                  By {book.author}
                </p>

                <p className="mt-4 min-h-12 text-sm leading-6 text-[#777d75]">
                  {book.description}
                </p>

                <Link
                  href={`/books/${book._id}`}
                  className="mt-6 inline-block rounded-full bg-[#284d3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#193729]"
                >
                  View Details →
                </Link>

              </div>
            </article>
          ))}

        </div>
      </section>

      {/* Bottom Section */}
      <section className="bg-[#f0efe7] px-5 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#253b32]">
          A New Story Is Waiting for You
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-[#777d75]">
          Explore the collection, choose your favourite book
          and enjoy the experience of reading.
        </p>

        <Link
          href="/"
          className="mt-7 inline-block rounded-full bg-[#284d3c] px-8 py-4 font-semibold text-white hover:bg-[#193729]"
        >
          Back to Home
        </Link>
      </section>

    </main>
  );
}