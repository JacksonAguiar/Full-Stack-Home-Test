import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchProps {
  onSubmit: Function;
}

const SearchComponent: React.FC<SearchProps> = ({ onSubmit }: SearchProps) => {
  const [query, setQuery] = useState("");
  return (
    <form>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium  sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <FiSearch />
        </div>
        <input
          type="search"
          id="default-search"
          data-testid="search-input"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search a user name, city..."
          onChange={(el) => setQuery(el.target.value)}
          required
        />
        <button
          type="button"
          data-testid="search-button"
          onClick={() => onSubmit(query)}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
