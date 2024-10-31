"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyToken } from '../services/login.service';

const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        setIsClient(true); 

        const validToken = await verifyToken(); 
        setIsValid(validToken);

        if (!validToken) {
          router.push("/"); 
        }
      };

      checkAuth();
    }, [router]);

    return isClient && isValid ? <Component {...props} /> : null; 
  };
};

export default withAuth;
