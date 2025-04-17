import React, { useState, useEffect } from "react";

const itemsPerPage = 6;

const mockCriminals = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Criminal ${i + 1}`,
  aadhaar: `${100000000000 + i}`,
  crime: i % 3 === 0 ? "Theft" : i % 3 === 1 ? "Murder" : "Cybercrime",
  status: i % 2 === 0 ? "Captured" : "At Large",
  address: `Sector-${(i % 50) + 1}, Metro City`,
  arrestDate: i % 2 === 0 ? `2024-0${(i % 9) + 1}-15` : "N/A",
  image: `https://via.placeholder.com/100x100?text=C${i + 1}`,
}));

export default function CriminalDatabase() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState(mockCriminals);

  useEffect(() => {
    const q = query.toLowerCase();
    const result = mockCriminals.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.aadhaar.includes(q) ||
        c.crime.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
    );
    setFiltered(result);
    setPage(1);
  }, [query]);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-black text-white p-20 font-mono tracking-wide">
      <h2 className="text-4xl font-extrabold text-[#ff0000] text-center border-b-4 border-[#ff0000] pb-2 uppercase">
        Criminal Records
      </h2>

      <div className="max-w-2xl mx-auto mt-6">
        <input
          type="text"
          placeholder="Search by Name, Aadhaar, Crime, Status..."
          className="w-full p-3 rounded-md bg-[#1a1a1a] text-white border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-700"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {paginated.length > 0 ? (
          paginated.map((c) => (
            <div
              key={c.id}
              className="bg-[#111] p-5 rounded-lg border border-[#ff0000] shadow-md"
            >
              <div className="flex items-center gap-4 mb-4 border-b border-gray-600 pb-2">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-20 h-20 rounded border-2 border-[#ff0000]"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#ff0000] uppercase">{c.name}</h3>
                  <p className="text-sm text-gray-300">Aadhaar: {c.aadhaar}</p>
                </div>
              </div>
              <div className="text-sm space-y-1 text-gray-200">
                <p><strong className="text-white">Crime:</strong> {c.crime}</p>
                <p><strong className="text-white">Status:</strong> {c.status}</p>
                <p><strong className="text-white">Address:</strong> {c.address}</p>
                <p><strong className="text-white">Arrest Date:</strong> {c.arrestDate}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-10 text-lg">
            No records found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > itemsPerPage && (
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-[#222] border border-[#ff0000] text-white uppercase font-bold"
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-lg font-bold text-[#ff0000]">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 bg-[#222] border border-[#ff0000] text-white uppercase font-bold"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
