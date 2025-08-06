'use client'; // จำเป็นสำหรับใช้ useState ใน layout

import { ReactNode, useState } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', height: '100vh' }}>
          {/* Sidebar */}
          <aside
            style={{
              width: menuOpen ? '220px' : '0',
              backgroundColor: '#222',
              color: '#fff',
              padding: menuOpen ? '1rem' : '0',
              overflow: 'hidden',
              transition: 'width 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {menuOpen && (
              <>
                <h2
                  style={{
                    marginBottom: '1rem',
                    fontSize: '1.5rem',
                    borderBottom: '2px solid #555',
                    paddingBottom: '0.5rem',
                  }}
                >
                  เมนู
                </h2>
                <nav>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      { href: '/', label: 'หน้าแรก' },
                      { href: '/about', label: 'เกี่ยวกับ' },
                      // เพิ่มเมนูอื่น ๆ ตามต้องการ
                    ].map(({ href, label }) => (
                      <li key={href} style={{ marginBottom: '0.75rem' }}>
                        <a
                          href={href}
                          style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '1.1rem',
                            display: 'block',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            transition: 'background-color 0.3s ease',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = '#444')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              'transparent')
                          }
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

          {/* Main content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <header
              style={{
                height: '60px',
                backgroundColor: '#0070f3',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1rem',
              }}
            >
              {/* Hamburger button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  fontSize: '1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                }}
                aria-label="Toggle menu"
              >
                &#9776;
              </button>

              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span>สวัสดี, User</span>
                <img
                  src="/profile.jpg"
                  alt="User Profile"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </header>

            <main style={{ padding: '1rem', overflowY: 'auto', flex: 1 }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
