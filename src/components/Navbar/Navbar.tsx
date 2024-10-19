import Link from 'next/link';
import Image from 'next/image'; // Assuming you are using Next.js's Image component for optimization

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Site Name */}
        <Link href="/" className="flex items-center text-white">
          {/* Replace 'logo.png' with the path to your logo */}
          <Image src="/images/logo.png" alt="Gutendex Logo" width={40} height={40} className="mr-2 rounded-full" />
          <span className="text-2xl font-bold">Gutendex Books</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="text-white text-lg hover:text-gray-400 transition-colors duration-200">
            Home
          </Link>
          <Link href="/wishlist" className="text-white text-lg hover:text-gray-400 transition-colors duration-200">
            Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
