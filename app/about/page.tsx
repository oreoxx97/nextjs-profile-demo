'use client';

import { useState, useEffect, useRef } from 'react';

export default function AboutPage() {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // ดึงข้อมูล mock
  const fetchData = async (pageNum: number) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800)); // จำลองโหลดช้า
    const newItems = Array.from(
      { length: 10 },
      (_, i) => `Item ${(pageNum - 1) * 10 + i + 1}`,
    );
    setItems((prev) => {
      const filteredNew = newItems.filter((i) => !prev.includes(i));
      return [...prev, ...filteredNew];
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);

  return (
    <div className="space-y-4 p-4">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          {item}
        </div>
      ))}

      {/* Loader */}
      <div ref={loaderRef} className="py-4">
        {loading ? (
          <div className="flex animate-pulse flex-col gap-2">
            {Array.from({ length: 3 }).map((_, i) => {
              const randomWidth = `${Math.floor(Math.random() * 40) + 60}%`;
              // สุ่มระหว่าง 60% ถึง 100%
              return (
                <div
                  key={i}
                  className="h-3 rounded bg-gray-300"
                  style={{ width: randomWidth }}
                ></div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500">↓ Scroll for more ↓</div>
        )}
      </div>
    </div>
  );
}
