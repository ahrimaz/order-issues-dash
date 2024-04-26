import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-2 fixed top-0 left-0 w-full shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-xl font-bold">Home</Link>
        </div>
        <div>
          <Link href="/about" className="ml-4">About</Link>
          <Link href="/contact" className="ml-4">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
