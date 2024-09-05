// components/LayoutManager.tsx
'use client'; // Mark as a Client Component

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import AuthLayout from './AuthLayout';

const authRoutes = ['/users/login', '/users/signup']; // Define routes for AuthLayout

export default function LayoutManager({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.includes(pathname);

  return (
    <>
      {isAuthRoute ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
}
