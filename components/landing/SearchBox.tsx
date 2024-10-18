import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(
        `/tankstellen?search=${encodeURIComponent(searchTerm.trim())}`
      );
    }
  };

  return (
    <div className="flex py-3 bg-white w-full border overflow-hidden rounded-full mb-6 text-gray-900 left-0 z-[1]">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center w-full"
      >
        <div className="flex w-full">
          <input
            type="text"
            className="pl-7 py-2 pr-4 border-gray-200 focus:outline-none w-full"
            placeholder="Straße, Stadt oder PLZ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 rounded-full text-white lg:px-8 px-4 py-3 mr-3"
        >
          Suchen
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
