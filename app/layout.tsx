// RootLayout.tsx

'use client';

import { useEffect, useState, ReactNode } from 'react';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(true);

  const SIDEBAR_WIDTH = menuOpen ? 224 : 0; // px
  const TOPBAR_HEIGHT = 60; // px

  return (
    <html lang="en">
      <body className="m-0 font-sans bg-gray-200">
        {/* Topbar */}
        <header
          className="fixed top-0 left-0 right-0 z-50 bg-gray-700 text-white flex items-center justify-between px-4"
          style={{ height: TOPBAR_HEIGHT }}
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer border-none bg-transparent text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            &#9776;
          </button>

          <div className="flex items-center gap-2">
            <span>สวัสดี, User</span>
            <img
              src="/profile.jpg"
              alt="User Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Sidebar */}
        <aside
          className="fixed top-[60px] bottom-0 z-40 bg-gray-900 text-white overflow-y-auto transition-all duration-300"
          style={{
            width: SIDEBAR_WIDTH,
            padding: menuOpen ? '1rem' : '0',
          }}
        >
          {menuOpen && (
            <>
              <h2 className="mb-4 border-b-2 border-gray-700 pb-2 text-2xl">เมนู</h2>
              <nav>
                <ul className="m-0 list-none p-0">
                  {[{ href: '/', label: 'หน้าแรก' }, { href: '/about', label: 'เกี่ยวกับ' }].map(({ href, label }) => (
                    <li key={href} className="mb-3">
                      <a
                        href={href}
                        className="block rounded px-4 py-2 transition-colors hover:bg-gray-700"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main
          className="fixed right-0 bottom-0 overflow-y-auto"
          style={{
            top: TOPBAR_HEIGHT,
            left: SIDEBAR_WIDTH,
            padding: '2rem',
          }}
        >
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8 mt-4 mb-8 min-h-[calc(100vh-100px)]">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
