import { useSession } from 'next-auth/react';

const AccountPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Account Information</h1>
      <p>Username: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      {/* Add more user information as needed */}
    </div>
  );
};

export default AccountPage;
