import React from "react";

interface SkeletonLoaderProps {
  type?: "grid" | "list";
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = "grid",
  count = 4,
}) => {
  const renderGridSkeleton = () => (
    <div className="container mx-auto lg:p-0 p-5 my-16">
      <div className="flex lg:flex-row flex-col lg:text-left text-center flex-wrap items-center justify-between mb-12">
        <div className="mb-4 lg:mb-0">
          <div className="h-8 bg-gray-300 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className="h-[35vh] rounded-lg bg-gray-300 animate-pulse"
          >
            <div className="flex h-full flex-col justify-end pb-5 pl-5">
              <div className="flex items-start">
                <div className="w-5 h-5 bg-gray-400 rounded-full mr-2 mt-1"></div>
                <div>
                  <div className="h-5 bg-gray-400 rounded w-24 mb-1"></div>
                  <div className="h-4 bg-gray-400 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="flex p-4 flex-col w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 bg-gray-300 rounded w-48 animate-pulse"></div>
        <div className="flex items-center">
          <div className="h-10 bg-gray-300 rounded w-32 mr-4 animate-pulse"></div>
          <div className="h-7 w-7 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-col">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className="relative flex lg:flex-row flex-col bg-white shadow-front-2 border mb-7 animate-pulse"
          >
            <div className="flex flex-col p-5 w-full">
              <div className="flex items-center mb-2">
                <div className="h-6 bg-gray-300 rounded w-48 mr-2"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="absolute right-0 top-0 bottom-0 my-auto flex mr-6">
                <div className="h-7 w-7 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return type === "grid" ? renderGridSkeleton() : renderListSkeleton();
};

export default SkeletonLoader;
