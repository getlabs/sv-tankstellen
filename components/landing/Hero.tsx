import SearchBox from "./SearchBox";

const Hero = () => {
  return (
    <section className="flex justify-center items-center h-[80vh]">
      <div className="container mx-auto flex flex-col items-center ">
        <div className="  mt-10  relative text-center lg:text-start">
          <h1 className="text-2xl lg:text-5xl text-gray-800  font-semibold mb-4">
            {" "}
            Finde die besten <span className="text-amber-400">Tankstellen</span>
          </h1>
          <p className="text-sm lg:text-lg text-gray-400   block pb-10 lg:pb-16">
            {" "}
            Finde die besten Tankstellen in Köln und Umgebung
          </p>
          <SearchBox />
        </div>
      </div>
    </section>
  );
};

export default Hero;
