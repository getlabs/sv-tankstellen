import React from "react";
import Link from "next/link";

interface ListingByAreaProps {
  title: string;
  subtitle: string;
  exploreLink: string;
  listings: {
    id: string;
    name: string;
    count: number;
  }[];
}

const GridList: React.FC<ListingByAreaProps> = ({
  title,
  subtitle,
  exploreLink,
  listings,
}) => {
  return (
    <div className="container mx-auto   p-5 my-16">
      <div className="flex  flex-row   lg:text-left   flex-wrap items-center justify-between mb-12">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-2xl lg:text-3xl font-medium capitalize mb-2  ">
            {title}
          </h2>
          <p className="text-sm lg:text-base text-gray-500 font-normal  ">
            {subtitle}
          </p>
        </div>
        <div>
          <Link
            href={exploreLink}
            className="text-gray-500   hover:text-blue-500 flex items-center"
          >
            Weitere
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="w-5 ml-3"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {listings.map((item) => (
          <Link key={item.id} href={`/tankstellen?search=${item.name}`}>
            <div className=" h-[35vh] group overflow-hidden rounded-lg bg-gradient-to-br from-slate-500 via-slate-500  to-amber-400">
              <div className="  flex  h-full flex-col justify-end left-0 pb-5 pl-5 rounded-b-lg pt-2   w-full">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-orange-400 mr-2 mt-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-lg text-white font-semibold">
                      {item.name}
                    </p>
                    <p className="text-14 text-gray-100">
                      {item.count} Tankstellen
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GridList;
