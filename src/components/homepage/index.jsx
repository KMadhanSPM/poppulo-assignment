"use client";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import Loader from "../common/loader";
import Pagination from "./Pagination";

export default function HomePage({ initialCats }) {
  const [cats, setCats] = useState(initialCats);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const itemsPerPage = 9;

  // Filter cats based on the search term
  const filteredCats = useMemo(() => {
    return cats.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cats, searchTerm]);

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCats = filteredCats.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCats.length / itemsPerPage);

  // Handle input changes with debounce to reduce the number of search operations
  const handleSearch = (event) => {
    setSearchLoading(true);
    setSearchTerm(event.target.value);
  };

  // Debounced search function to improve performance
  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 500), // 500ms debounce delay
    []
  );

  // Clean up debounce on component unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Effect to stop the search loader after filtering
  useEffect(() => {
    if (searchLoading) {
      setLoading(false);
      setTimeout(() => setSearchLoading(false), 300);
    }
  }, [searchLoading]);

  // Handle page change and show a loader during pagination
  const handlePageChange = (newPage) => {
    setLoading(true);
    setCurrentPage(newPage);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by breed name..."
          className="border p-2 w-full"
          onChange={debouncedSearch}
        />
        {searchLoading && (
          <div className="absolute right-4 top-2 flex items-center">
            <Loader size="small" />
          </div>
        )}
      </div>
      {loading && <Loader />}
      {currentCats.length === 0 ? (
        <div className="text-center mt-24 text-red-500">No results found</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentCats.map((cat) => (
              <div key={cat.id} className="border p-4 rounded shadow">
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                )}
                <h2 className="font-bold text-lg">{cat.name}</h2>
                <p>{cat.description}</p>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            setLoading={setLoading} // Pass setLoading to manage pagination loading
          />
        </>
      )}
    </div>
  );
}
