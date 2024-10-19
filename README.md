# Gutenberg Bookstore

## Project Overview

Gutenberg Bookstore is a web application built using **Next.js** that allows users to browse books from the Gutenberg Project's vast collection. Users can explore various books, search by title, filter by genre, and add books to their wishlist for future reference. The app is fully responsive and features real-time wishlist functionality using **localStorage** for persistent data across sessions.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Home Page](#home-page)
  - [Wishlist](#wishlist)
  - [Book Details](#book-details)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)

---

## Features

- **Search Functionality**: Users can search for books by title.
- **Genre Filtering**: Users can filter books by genre.
- **Wishlist**: Users can add books to their wishlist, which persists using localStorage.
- **Responsive Design**: The app is fully responsive and works well on mobile, tablet, and desktop devices.
- **Book Details**: Each book has a dedicated details page where users can view more information about the book.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Ebrahimislam-dev/gutenberg-bookstore.git
```

2. Install dependencies:

```bash
cd gutenberg-bookstore
npm install
```

3. Start the development server:

```bash
npm run dev
```
## Live Link
[View the project live here](https://gutenberg-bookstore.vercel.app/)
4. Open your browser and visit `http://localhost:3000`.

---

## Usage

### 1. Home Page

The home page features a collection of books from the Gutenberg Project. Users can perform the following actions:

- **Search for Books**: Type a book title in the search bar to filter the book list.
- **Filter by Genre**: Select a genre from the dropdown to filter books by category.
- **Wishlist Button**: Each book has a heart icon, allowing users to add or remove the book from their wishlist.

#### Pagination

Books are paginated, and users can navigate through pages using the "Next" and "Previous" buttons at the bottom of the page.

### 2. Wishlist

The wishlist page displays all books that the user has added to their wishlist. Wishlist items are stored in the browser's `localStorage`, so the list persists even after the user refreshes the page or returns at a later time.

#### Wishlist Features:

- Users can view books they've added to their wishlist.
- **Remove from Wishlist**: Clicking the heart icon on a wishlist item will remove it from the list in real-time.
- **Loader**: A loading spinner is shown while wishlist items are being fetched.

### 3. Book Details

Each book on the home page can be clicked, which navigates the user to a dedicated details page. On this page, the user can:

- View the book's full title, authors, and other details.
- See if the book is in their wishlist (indicated by the heart icon).
- Add or remove the book from their wishlist directly from the details page.

---

## Technologies Used

- **Next.js**: A React framework for building fast, server-rendered web applications.
- **Tailwind CSS**: A utility-first CSS framework used for styling the application.
- **Gutenberg API**: Public API used to fetch book data.
- **localStorage**: Used to store the user's wishlist across sessions.

---

## Project Structure

```bash
├── public                # Public assets (e.g., images, fonts)
├── src
│   ├── components
│   │   ├── Navbar        # Navbar component shared across pages
│   ├── app
│   │   ├── page.tsx     # Home page with search, filter, and wishlist functionality
│   │   ├── wishlist.tsx
            └── page.tsx   # Wishlist page showing saved books
│   │   ├── books
│   │   │   └── [id]
                └── page.tsx  # Book details page for each book
└── README.md
```

- **`index.tsx`**: The home page, where users can search and filter books.
- **`wishlist.tsx`**: Displays the user's wishlist, allowing them to view and remove books.
- **`[id].tsx`**: A dynamic page that renders detailed information about a specific book.

---

## Future Enhancements

- **More Filters**: Add more detailed filters like publication year, author, or language.
- **User Authentication**: Add user accounts to allow users to save their wishlist across devices.
- **Infinite Scrolling**: Implement infinite scrolling instead of pagination for a smoother user experience.

---

Feel free to contribute to this project by submitting issues or pull requests!

---
