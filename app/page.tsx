'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const itemsPerPage = 12;
  const totalItems = 120;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const items = Array.from(
    { length: totalItems },
    (_, i) => `เนื้อหาชิ้นที่ ${i + 1}`,
  );

  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setVisibleItems([]); // reset

    currentItems.forEach((_, i) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, i]);
      }, i * 100); // delay แต่ละชิ้น 100ms
    });
  }, [currentPage]);

  return (
    <div className="text-gray-900">
      <h1 className="mb-6 text-center text-3xl font-bold">
        🎉 ข้อมูลพร้อม animation + pagination
      </h1>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((text, index) => {
          const isVisible = visibleItems.includes(index);

          return (
            <article
              key={index}
              className={`transform rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 p-6 shadow-md transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} `}
            >
              <h2 className="mb-2 text-lg font-semibold">{text}</h2>
              <p className="text-gray-700">รายละเอียดของ {text}</p>
            </article>
          );
        })}
      </section>

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`rounded px-4 py-2 ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-800'
            } transition-colors hover:bg-blue-500 hover:text-white`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
