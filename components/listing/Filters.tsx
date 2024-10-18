import React, { useState, useEffect } from "react";

interface FiltersProps {
  onFilter: (name: string, district: string) => void;
  districts: {
    id: string;
    name: string;
    count: number;
  }[];
  initialSearch: string;
}

const Filters: React.FC<FiltersProps> = ({
  onFilter,
  districts,
  initialSearch,
}) => {
  const [name, setName] = useState(initialSearch);
  const [district, setDistrict] = useState("Alle Stadtteile");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialSearch) {
      handleSubmit();
    }
  }, [initialSearch]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onFilter(name, district);
    setIsOpen(false);
  };

  const handleReset = () => {
    setName("");
    setDistrict("Alle Stadtteile");
    onFilter("", "Alle Stadtteile");
  };

  return (
    <div className="bg-white border shadow-front-2 z-10 w-full lg:w-80 transition-all ease-in-out mb-6">
      <div
        className="border-b border-gray-200 p-5 flex justify-between items-center cursor-pointer lg:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-gray-700 text-lg font-semibold">Filter</p>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 lg:hidden ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <form onSubmit={handleSubmit} className="p-5">
          <input
            type="text"
            className="border border-gray-200 rounded-lg px-4 py-[11px] focus:outline-none w-full mb-4"
            placeholder="Straße, PLZ oder Stadtteil"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="relative mb-4">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="bg-white w-full border border-gray-200 relative appearance-none rounded-lg px-4 py-[11px] focus:outline-blue-300 text-gray-400"
            >
              <option value="Alle Stadtteile">Alle Stadtteile</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="currentColor"
              className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.99982 6.00001C4.79513 6.00001 4.59034 5.92467 4.43435 5.774L0.434558 1.91686C0.122074 1.61552 0.122074 1.12735 0.434558 0.826011C0.747042 0.524671 1.25327 0.524671 1.56575 0.826011L4.99982 4.13893L8.43464 0.826613C8.74713 0.525274 9.25335 0.525274 9.56583 0.826613C9.87832 1.12795 9.87832 1.61612 9.56583 1.91746L5.56604 5.7746C5.4098 5.92527 5.20481 6.00001 4.99982 6.00001Z"></path>
            </svg>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg w-full p-3.5 mt-9 mb-4"
          >
            Suchen
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center text-sm text-gray-500 justify-center w-full"
          >
            Filter zurücksetzen
          </button>
        </form>
      </div>
    </div>
  );
};

export default Filters;
