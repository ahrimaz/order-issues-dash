import { useSession } from 'next-auth/react';

const AccountPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>; // or redirect to login page
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Account Information</h1>
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

export default AccountPage;
