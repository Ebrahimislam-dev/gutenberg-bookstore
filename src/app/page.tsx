"use client";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { useState, useEffect, FC } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

type Book = {
  id: number;
  title: string;
  authors: { name: string; birth_year?: number; death_year?: number }[];
  subjects: string[];
  formats: { "image/jpeg": string };
};

const Home: FC = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<{ next: string | null; previous: string | null }>(
    { next: null, previous: null }
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [wishlist, setWishlist] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    }
    return [];
  });

  const fetchBooks = async () => {
    setLoading(true);
    const res = await fetch(`https://gutendex.com/books/?page=${page}&search=${searchTerm}`);
    const data = await res.json();
    setBooks(data.results);
    setFilteredBooks(data.results); // Initialize filteredBooks with fetched books
    setPagination({
      next: data.next,
      previous: data.previous,
    });
    setLoading(false);
  };

  // Handle wishlist
  const handleWishlist = (id: number) => {
    const updatedWishlist = wishlist.includes(id)
      ? wishlist.filter((item) => item !== id)
      : [...wishlist, id];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  // Handle genre filter
  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    const filtered = genre === "All"
      ? books
      : books.filter((book) => book.subjects.some((subject) => subject === genre));
    setFilteredBooks(filtered);
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Search and Filter Section */}
        <div className="flex justify-end items-center mb-6 gap-x-5">
          <input
            type="text"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="border border-gray-300 p-2 w-60 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-gray-200 transition-all duration-300"
          />

          {/* Genre Filter Dropdown */}
          <select
            value={selectedGenre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="border border-gray-300 p-2 w-40 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-gray-200 transition-all duration-300"
          >
            <option value="All">All Genres</option>
            <option value="Gothic fiction">Gothic Fiction</option>
            <option value="Horror tales">Horror Tales</option>
            <option value="Science fiction">Science Fiction</option>
            <option value="Monsters -- Fiction">Monsters</option>
            {/* Add other genre options dynamically if needed */}
          </select>
        </div>

        {/* Book List Section */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
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
                <div className="cursor-pointer" onClick={() => router.push(`/books/${book.id}`)}>
                  <span className="flex justify-between items-center mt-2 ">
                    <h2 className="font-semibold text-md text-gray-800">{book.title}</h2>
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
                  <p className="text-gray-400 text-xs">
                    {book.subjects.slice(0, 2).join(", ")}
                  </p>
                </div>

                <button
                  onClick={() => handleWishlist(book.id)}
                  className="absolute top-4 right-4 p-1 rounded-full bg-white shadow-lg text-red-500 text-3xl transform hover:scale-110 transition-transform duration-300 ease-in-out hover:bg-red-100 hover:text-red-600"
                >
                  {wishlist.includes(book.id) ? <MdFavorite /> : <MdFavoriteBorder />}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        <div className="flex justify-center gap-x-5 items-center mt-8">
          <button
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={!pagination.previous}
            className={`px-4 py-2 rounded-lg shadow ${pagination.previous
              ? "bg-gray-800 text-white hover:bg-gray-900"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition-colors duration-300`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={!pagination.next}
            className={`px-4 py-2 rounded-lg shadow ${pagination.next
              ? "bg-gray-800 text-white hover:bg-gray-900"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition-colors duration-300`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
