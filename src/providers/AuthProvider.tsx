'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (status === 'authenticated') {
      if (pathname === '/login') {
        router.push('/');
      } else {
        setLoaded(true);
      }
    } else if(status === 'unauthenticated') {
      if (pathname !== '/login') {
        router.push('/login');
      } else {
        setLoaded(true);
      }
    } 
  }, [status, pathname, router]);
  
  // *Render only until we know about auth
  // *better UX, but lower Time To First Byte
  // Todo: optimize UX, create a loading UI state, decrease TTFB
  return loaded && <>{children}</>;
};

export default AuthProvider;
