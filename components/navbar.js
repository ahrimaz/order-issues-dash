import Link from 'next/link';
import Login from './login';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-b from-slate-800 to-slate-700 text-white p-2 fixed top-0 left-0 w-full shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">Home</span>
          </Link>
        </div>
        <div className="flex items-center"> {/* Add flex and items-center classes */}
          <Link href="/orderStatus">
            <span className="ml-4 cursor-pointer">Order Status Check</span>
          </Link>
          <Link href="/about">
            <span className="ml-4 cursor-pointer">About</span>
          </Link>
          <Link href="/contact">
            <span className="ml-4 cursor-pointer">Contact</span>
          </Link>
          <div className="ml-4"> {/* Wrap Login component in a div */}
            <Login/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;