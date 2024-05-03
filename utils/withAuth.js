// utility auth function that we can use to wrap pages with authentication

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const session = await getSession();
        if (!session) {
          router.replace('/login');
        }
      };

      checkUser();
    }, []);

    return <WrappedComponent {...props} />;
  };
}

// new withAuth function to wrap pages that will redirect unauth'd users to the home page immediately

export default withAuth;