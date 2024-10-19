import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white text-xl font-bold">Gutendex Books</Link>
        <div>
          <Link href="/wishlist" className="text-white mr-4">Wishlist</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
