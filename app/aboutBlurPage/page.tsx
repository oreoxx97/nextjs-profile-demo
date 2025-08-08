'use client';

import { useState, useRef, useEffect } from 'react';

export default function AboutBlurPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      setIsScrolled(el.scrollTop > 0);
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] max-w-3xl mx-auto overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-4 text-gray-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Header inside scrollable content */}
      <div
        className={`sticky top-0 z-10 flex items-center justify-between rounded-t-xl px-4 py-3 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-500/20 backdrop-blur-lg border-b border-gray-600'
            : 'bg-gray-900'
        }`}
      >
        <h2 className="text-lg font-semibold">หัวข้อที่มีเบลอเวลาสกรอล</h2>
        <button className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
          ปุ่ม
        </button>
      </div>

      {/* Content ยาว ๆ */}
      <div className="mt-4 space-y-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} className="text-gray-300">
            ข้อความตัวอย่างบรรทัดที่ {i + 1} — Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        ))}
      </div>
    </div>
  );
}
