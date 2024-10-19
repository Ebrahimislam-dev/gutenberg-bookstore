"use client";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useRouter } from "next/navigation";

type Book = {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: { "image/jpeg": string };
};

export default function Wishlist() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
  }, []);

  // Fetch books from wishlist
  useEffect(() => {
    if (wishlist.length > 0) {
      setLoading(true); // Show loader
      Promise.all(
        wishlist.map((id) =>
          fetch(`https://gutendex.com/books/${id}`).then((res) => res.json())
        )
      ).then((results) => {
        setBooks(results);
        setLoading(false); // Hide loader after fetching data
      });
    } else {
      setLoading(false); // If wishlist is empty, stop loader
    }
  }, [wishlist]);

  // Handle wishlist toggle and remove book from the page if removed from wishlist
  const handleWishlist = (id: number) => {
    const updatedWishlist = wishlist.includes(id)
      ? wishlist.filter((item) => item !== id)
      : [...wishlist, id];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Remove the book from the displayed books if it is removed from wishlist
    if (!updatedWishlist.includes(id)) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md p-4 relative transform transition-transform hover:scale-105"
              >
                <picture>
                  <img
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </picture>
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`/books/${book.id}`)}
                >
                  <span className="flex justify-between items-center mt-2">
                    <h2 className="font-semibold text-md text-gray-800">
                      {book.title}
                    </h2>
                    <div className="relative group">
                      <p className="text-gray-800 text-xs bg-gray-200 h-full py-1 px-3 rounded-lg shadow-sm border border-gray-300 whitespace-nowrap">
                        {book.id}
                      </p>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-700 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        ID: {book.id}
                      </div>
                    </div>
                  </span>
                  <p className="text-gray-600 text-sm">
                    {book.authors.map((author) => author.name).join(", ")}
                  </p>
                </div>

                {/* Wishlist button */}
                <button
                  onClick={() => handleWishlist(book.id)}
                  className="absolute top-4 right-4 p-1 rounded-full bg-white shadow-lg text-red-500 text-3xl transform hover:scale-110 transition-transform duration-300 ease-in-out hover:bg-red-100 hover:text-red-600"
                >
                  {wishlist.includes(book.id) ? (
                    <MdFavorite />
                  ) : (
                    <MdFavoriteBorder />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No books in wishlist.</p>
        )}
      </div>
    </div>
  );
}
