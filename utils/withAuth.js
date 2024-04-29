import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // user is not authenticated, redirect to the login page
    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (!session) {
      router.replace('/login');
      return <div>Redirecting...</div>;
    }

    // user is authenticated, render the component
    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth;
