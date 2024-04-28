import { useState } from 'react';
import { useSession, signOut, signIn } from 'next-auth/react'; // Import signIn function
import Link from 'next/link';

const ProfileDropdown = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="relative">
      {/* Profile Picture */}
      {session && session.user && (
        <img
          src={session.user.image}
          alt="Profile"
          className="h-8 w-8 rounded-full cursor-pointer"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        />
      )}

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10 right-0">
          <Link className="block px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" href="/account">
            Account
          </Link>
          <button onClick={handleLogout} className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:bg-red-600">
            Logout
          </button>
        </div>
      )}

      {/* Login Button */}
      {!session && (
        <button onClick={() => signIn('github')} className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
          Login
        </button>
      )}
    </div>
  );
};

export default ProfileDropdown;
