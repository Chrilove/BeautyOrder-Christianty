// app/layout.js
'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="container-fluid p-0">
            <div className="row g-0">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}