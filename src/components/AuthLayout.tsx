// components/AuthLayout.tsx or (user)/layout.tsx
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-auto">
      {/* This is where you can customize the layout for authentication-related pages */}
      <h1 className="text-2xl font-semibold p-5">Authentication</h1>
      <div>
        {children} {/* The specific page content will be rendered here */}
      </div>
    </div>
  );
}