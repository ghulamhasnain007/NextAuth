// // // import type { Metadata } from "next";
// // // import { Inter } from "next/font/google";
// // // import "./globals.css";
// // // import Navbar from "@/components/Navbar";
// // // // import RootLayout from "@/components/RootLayout";

// // // const inter = Inter({ subsets: ["latin"] });

// // // export const metadata: Metadata = {
// // //   title: "Create Next App",
// // //   description: "Generated by create next app",
// // // };

// // // // export default function Root({
// // // //   children,
// // // // }: Readonly<{
// // // //   children: React.ReactNode;
// // // // }>) {
// // // //   return (
// // // //     <html lang="en">
// // // //       <body className={inter.className}>
// // // //         {/* <RootLayout>
// // // //           {children}
// // // //         </RootLayout> */}
// // // //         <div>
// // // //           <Navbar/>
// // // //           {children}
// // // //         </div>
// // // //          </body>
// // // //     </html>
// // // //   );
// // // // }

// // // export default function RootLayout({ children }: { children: React.ReactNode }) {
// // //   return (
// // //     <div>
// // //       <Navbar />
// // //       {children}
// // //     </div>
// // //   );
// // // }


// // // app/layout.tsx or RootLayout.tsx

// // 'use client'

// // import { Inter } from "next/font/google";
// // import { usePathname } from 'next/navigation';
// // import Navbar from "@/components/Navbar";
// // import "./globals.css";

// // const inter = Inter({ subsets: ["latin"] });

// // export const metadata = {
// //   title: "Create Next App",
// //   description: "Generated by create next app",
// // };



// // export default function RootLayout({ children }: { children: React.ReactNode }) {
// //   const pathname = usePathname();

// //   const noNavbarRoutes = ['/users/login', '/users/signup']; // Add any routes where you don't want the Navbar
// //   const showNavbar = !noNavbarRoutes.includes(pathname);

// //   return (
// //     <html lang="en">
// //       <body className={inter.className}>
// //     <div>
// //       {showNavbar && <Navbar />}
// //       {children}
// //     </div>
// //     </body>
// //     </html>
// //   );
// // }

// // 'use client';

// import { Inter } from "next/font/google";
// import { usePathname } from 'next/navigation';
// import Navbar from "@/components/Navbar";
// import AuthLayout from "@/components/AuthLayout"; // Assuming AuthLayout is located here
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   // Routes that will use AuthLayout (no Navbar)
//   const authRoutes = ['/users/login', '/users/signup'];

//   // Determine if the current route should use AuthLayout or not
//   const isAuthRoute = authRoutes.includes(pathname);

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {/* Render AuthLayout if it's an auth route, otherwise show RootLayout with Navbar */}
//         {isAuthRoute ? (
//           <AuthLayout>{children}</AuthLayout>
//         ) : (
//           <div>
//             <Navbar /> {/* Navbar shown on non-auth routes */}
//             {children}
//           </div>
//         )}
//       </body>
//     </html>
//   );
// }


// app/layout.tsx (RootLayout as a Server Component)
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutManager from '@/components/LayoutManager'; // Import the client component

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutManager>
          {children}
        </LayoutManager>
      </body>
    </html>
  );
}

