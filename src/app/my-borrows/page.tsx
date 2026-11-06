"use client";

import { useEffect, useState } from "react";

export default function MyBorrowsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBorrows = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/borrows", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load borrowed books.");
        return;
      }

      setRecords(data);
    } catch {
      setMessage("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  const handleReturn = async (borrowId: string) => {
    if (!window.confirm("Are you sure you want to return this book?")) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/borrows/${borrowId}/return`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to return book.");
        return;
      }

      setMessage("Book returned successfully!");
      await fetchBorrows();
    } catch {
      setMessage("Server connection failed.");
    }
  };

  if (loading) {
    return <p className="py-20 text-center">Loading borrowed books...</p>;
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] px-5 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-[#284d3c]">
          My Borrows
        </h1>

        <p className="mb-8 text-gray-600">
          View and manage your borrowed books.
        </p>

        {message && (
          <p className="mb-5 text-center text-sm text-[#284d3c]">
            {message}
          </p>
        )}

        {records.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-gray-600">
              You have not borrowed any books yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="w-full text-left">
              <thead className="bg-[#284d3c] text-white">
                <tr>
                  <th className="p-4">Book</th>
                  <th className="p-4">Borrow Date</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {records.map((record) => (
                  <tr key={record._id} className="border-b">
                    <td className="p-4 font-medium">
                      {record.bookTitle}
                    </td>

                    <td className="p-4">
                      {new Date(record.borrowDate).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      {new Date(record.dueDate).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <span
                        className={
                          record.status === "Borrowed"
                            ? "text-orange-600 font-semibold"
                            : "text-green-600 font-semibold"
                        }
                      >
                        {record.status}
                      </span>
                    </td>

                    <td className="p-4">
                      {record.status === "Borrowed" ? (
                        <button
                          onClick={() => handleReturn(record._id)}
                          className="rounded-lg bg-[#284d3c] px-4 py-2 text-sm font-semibold text-white"
                        >
                          Return
                        </button>
                      ) : (
                        <span className="text-gray-500">Returned</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}