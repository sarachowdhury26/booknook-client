"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Swiper = dynamic(
  () => import("swiper/react").then((mod) => mod.Swiper),
  { ssr: false }
);

const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    tag: "A WORLD OF STORIES",
    title: "Every book opens a new world.",
    description:
      "Find your next favourite read and explore stories that stay with you forever.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400",
  },
  {
    tag: "DISCOVER SOMETHING NEW",
    title: "A little reading goes a long way.",
    description:
      "Explore interesting books, discover new authors and make reading part of your everyday life.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1400",
  },
  {
    tag: "SHARE THE LOVE OF READING",
    title: "Good books are meant to be shared.",
    description:
      "Borrow a book, enjoy every page and return it for another reader to discover.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1400",
  },
];

const books = [
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Fiction",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "History",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500",
  },
  {
    title: "Wonder",
    author: "R. J. Palacio",
    category: "Kids",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500",
  },
];

const categories = [
  { name: "Fiction", icon: "✦", description: "Stories and imagination" },
  { name: "Science", icon: "⚛", description: "Explore the unknown" },
  { name: "History", icon: "⌛", description: "Discover the past" },
  { name: "Kids", icon: "☀", description: "Books for young minds" },
];

export default function Home() {
 const router = useRouter();

const [user, setUser] = useState<any>(null);
const [profileOpen, setProfileOpen] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (token && savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setUser(null);
  setProfileOpen(false);

  router.push("/");
}; 
  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#253b32]">

      {/* Hero Slider */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="overflow-hidden rounded-3xl"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative flex min-h-[440px] items-center overflow-hidden rounded-3xl bg-cover bg-center px-8 py-16 md:min-h-[510px] md:px-16"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#142c23]/95 via-[#142c23]/75 to-transparent" />

                <div className="relative z-10 max-w-2xl text-white">
                  <p className="mb-5 text-xs font-bold tracking-[0.3em] text-[#e5b77e]">
                    {slide.tag}
                  </p>

                  <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mb-8 max-w-lg text-base leading-7 text-gray-200 md:text-lg">
                    {slide.description}
                  </p>

                  <Link
                    href="/books"
                    className="inline-block rounded-full bg-[#d9a56d] px-8 py-4 font-semibold text-[#203b30] transition hover:bg-white"
                  >
                    Browse Books →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#b47b45]">
          Welcome to BookNook
        </p>
        <h2 className="mx-auto mb-5 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
          A quiet corner for people who love good books.
        </h2>
        <p className="mx-auto max-w-2xl leading-7 text-[#777d75]">
          Discover interesting reads, explore different genres and share
          the joy of reading with a community of book lovers.
        </p>
      </section>

      {/* New Arrivals */}
      <section className="bg-[#f0efe7] px-5 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#b47b45]">
                Fresh from the shelf
              </p>
              <h2 className="text-3xl font-bold md:text-4xl">
                New Arrivals
              </h2>
              <p className="mt-3 text-[#777d75]">
                Some new stories worth spending time with.
              </p>
            </div>

            <Link
              href="/books"
              className="font-semibold text-[#284d3c] hover:text-[#b47b45]"
            >
              See All Books →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
              <article
                key={index}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-64 overflow-hidden bg-[#e9e7df]">
                  <div
                    className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${book.image})` }}
                    role="img"
                    aria-label={book.title}
                  />
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-[#f0efe7] px-3 py-1 text-xs font-semibold text-[#947044]">
                    {book.category}
                  </span>

                  <h3 className="mt-4 text-xl font-bold">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#777d75]">
                    By {book.author}
                  </p>

                  <Link
                    href="/books"
                    className="mt-6 inline-block border-b border-[#284d3c] pb-1 text-sm font-semibold text-[#284d3c] hover:text-[#b47b45]"
                  >
                    View Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/books"
              className="inline-block rounded-full bg-[#284d3c] px-9 py-4 font-semibold text-white transition hover:bg-[#193729]"
            >
              Explore All Books
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#b47b45]">
            Simple and easy
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            How BookNook Works
          </h2>
          <p className="mt-3 text-[#777d75]">
            Your next favourite book is just three steps away.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Find a Book",
              description: "Browse our collection and discover something you would love to read.",
            },
            {
              number: "02",
              title: "Borrow It",
              description: "Choose a book and borrow it for a few days.",
            },
            {
              number: "03",
              title: "Return & Share",
              description: "Return your book on time so another reader can enjoy it.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="rounded-2xl border border-[#e9e7df] bg-white p-9 text-center"
            >
              <span className="text-4xl font-bold text-[#c69b69]">
                {item.number}
              </span>
              <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-7 text-[#777d75]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#284d3c] px-5 py-20 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#e5b77e]">
              Find your interest
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Explore by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {categories.map((category) => (
              <Link
                href="/books"
                key={category.name}
                className="rounded-2xl border border-white/20 bg-white/5 p-7 text-center transition hover:bg-white/15"
              >
                <span className="text-4xl text-[#e5b77e]">
                  {category.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#172d23] px-5 pb-8 pt-16 text-white lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold">
              Book<span className="text-[#d9a56d]">Nook.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-300">
              A small online library bringing books and readers
              together. Discover, borrow, read and share.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Quick Links</h3>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <Link href="/">Home</Link>
              <Link href="/books">All Books</Link>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Contact Us</h3>
            <p className="text-sm leading-7 text-gray-300">
              Email: hello@booknook.com
              <br />
              A little space for every reader.
            </p>
            <div className="mt-4 flex gap-5 text-sm text-[#e5b77e]">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/15 pt-7 text-center text-sm text-gray-400">
          © 2026 BookNook. All rights reserved.
        </div>
      </footer>

    </main>
  );
}