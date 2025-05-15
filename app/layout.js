// app/layout.js
'use client'  // <-- Ensure this is a Client Component
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from 'next-auth/react';  // Import SessionProvider from next-auth
import './styles/globals.css'; 

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <head />
        <body>
          <div className="container-fluid">
            <div className="row">
              {children}
            </div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
