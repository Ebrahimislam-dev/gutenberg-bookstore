/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

type Book = {
    id: number;
    title: string;
    subjects: string[];
    authors: { name: string; birth_year?: number; death_year?: number }[];
    translators: { name: string; birth_year?: number; death_year?: number }[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean | null;
    media_type: string;
    formats: { [key: string]: string };
    download_count: number;
};

const BooksDetails = (id: any) => {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [wishlist, setWishlist] = useState<number[]>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("wishlist") || "[]");
        }
        return [];
    });

    const fetchBookDetails = async (bookId: number | string) => {
        try {
            setLoading(true);
            const res = await fetch(`https://gutendex.com/books/${bookId}/`);
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail);
            }
            const data = await res.json();
            setBook(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleWishlist = (id: number) => {
        const updatedWishlist = wishlist.includes(id)
            ? wishlist.filter((item) => item !== id)
            : [...wishlist, id];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    useEffect(() => {
        if (id) {
            fetchBookDetails(id?.id);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 py-10 px-6">
            {book && (
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <div className="relative mb-6">
                        <picture>
                            <img
                                src={book.formats["image/jpeg"] || "/default-cover.jpg"}
                                alt={book.title}
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                            />
                        </picture>

                        {/* Wishlist Button at the top-right corner of the image */}
                        <button
                            onClick={() => handleWishlist(book.id)}
                            className="absolute top-4 right-4 p-1 rounded-full bg-white shadow-lg text-red-500 text-3xl transform hover:scale-110 transition-transform duration-300 ease-in-out hover:bg-red-100 hover:text-red-600"
                        >
                            {wishlist.includes(book.id) ? <MdFavorite /> : <MdFavoriteBorder />}
                        </button>

                        <h1 className="text-4xl font-bold text-gray-800 mb-2 absolute bottom-2 left-2 bg-white bg-opacity-80 p-2 rounded-lg">
                            {book.title}
                        </h1>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">Authors:</h2>
                        <ul className="list-disc pl-6">
                            {book.authors.map((author, idx) => (
                                <li
                                    key={idx}
                                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                                >
                                    {author.name} ({author.birth_year ?? "N/A"} -{" "}
                                    {author.death_year ?? "N/A"})
                                </li>
                            ))}
                        </ul>
                    </div>

                    {book.translators.length > 0 && (
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold">Translators:</h2>
                            <ul className="list-disc pl-6">
                                {book.translators.map((translator, idx) => (
                                    <li
                                        key={idx}
                                        className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                                    >
                                        {translator.name} ({translator.birth_year ?? "N/A"} -{" "}
                                        {translator.death_year ?? "N/A"})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">Subjects:</h2>
                        <p className="text-gray-700">{book.subjects.join(", ")}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">Bookshelves:</h2>
                        <p className="text-gray-700">{book.bookshelves.join(", ")}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">Languages:</h2>
                        <p className="text-gray-700">{book.languages.join(", ")}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">Download Count:</h2>
                        <p className="text-gray-700">{book.download_count}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">Download Formats:</h2>
                        <ul className="list-disc pl-6">
                            {Object.entries(book.formats).map(([format, url], idx) => (
                                <li
                                    key={idx}
                                    className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
                                >
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {format}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">Copyright:</h2>
                        <p className="text-gray-700">
                            {book.copyright === null ? "Unknown" : book.copyright ? "Yes" : "No"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksDetails;
