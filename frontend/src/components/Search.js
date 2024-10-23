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
      <div className="bg-gray-800/30 rounded-3xl  w-full max-w-xl p-6 mt-20">
        <h1 className="text-3xl font-bold mb-4 text-center">Search Your Network</h1>
        <form onSubmit={handleSearch} className="relative mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className={`w-full p-2 pl-4  rounded-full bg-white/70 placeholder-black/50 text-black  hover:bg-white transition-all duration-300 ease-in-out  focus:outline-none  ${
                !query ? 'border border-[rgb(255,0,0,0)]' : ''
            }`}
          /> 
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 my-auto flex items-center px-4 bg-black/20 text-black border-[2px] rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out  "
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
