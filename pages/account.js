import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import withAuth from '../utils/withAuth';

const AccountPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState(null);

  // error handling logic
  useEffect(() => {
    if (status === 'error' || (status === 'loading' && !session)) {
      router.push('/login'); // redirect to login page if user is not logged in
      setError('You need to log in to access your account.');
    }
  }, [session, status, router]);

  // render loading message
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // render account information
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Account Information</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Email:</label>
        <p>{session.user.email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Username:</label>
        <p>{session.user.name || 'N/A'}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Profile Picture:</label>
        <img src={session.user.image} alt="Profile" className="rounded-full h-20 w-20" />
      </div>
      {/* add more user information */}
    </div>
  );
};

export default withAuth(AccountPage);
