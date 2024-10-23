// src/components/Search.js
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    setResults([
      `Result for "${query}" 1`,
      `Result for "${query}" 2`,
      `Result for "${query}" 3`,
    ]);
    setIsSubmitted(true);
  };

  return (
    <div className="flex justify-center items-start h-screen">
      <div className="bg-gray-100/10 rounded-3xl shadow-lg w-full max-w-xl p-6 mt-20">
        <h1 className="text-3xl font-bold mb-4 text-center">Search Page</h1>
        <form onSubmit={handleSearch} className="relative mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className={`w-full bg-[rgba(108,108,108,0.3)] rounded-full p-2 pl-4 text-white placeholder-white/80 focus:outline-none  ${
              !query ? 'border border-[rgb(255,0,0,0)]' : ''
            }`}
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 my-auto flex items-center px-4 bg-black/30 text-white rounded-full hover:bg-white/50 hover:text-black transition-transform duration-500 transform "
            style={{ height: '100%' }}
          >
            Search
          </button>
        </form>
        <div className="text-center">
          {isSubmitted && results.length > 0 && (
            <ul className="list-disc pl-5 inline-block text-left">
              {results.map((result, index) => (
                <li key={index} className="mb-2 text-white">
                  {result}
                </li>
              ))}
            </ul>
          )}
          {isSubmitted && results.length === 0 && (
            <p className="text-red-500">No results found for "{query}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
