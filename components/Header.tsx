"use client";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="px-4 lg:px-6 h-14 p-8 flex items-center justify-between bg-transparent">
      <Link className="flex items-center justify-center" href="/">
        <span className="ml-2 text-lg font-bold">
          SV Tankstellen Verzeichnis
        </span>
      </Link>

      {/* Desktop navigation */}
      <nav className="hidden md:flex gap-6 ">
        <Link
          className="font-medium hover:underline underline-offset-4"
          href="/"
        >
          Home
        </Link>
        <Link
          className="  font-medium hover:underline underline-offset-4"
          href="/tankstellen"
        >
          Tankstelle finden
        </Link>
      </nav>

      {/* Hamburger menu for mobile */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="absolute top-14 left-0 right-0 bg-white shadow-md md:hidden">
          <Link
            className="block py-2 px-4   font-medium hover:bg-gray-100"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="block py-2 px-4   font-medium hover:bg-gray-100"
            href={"/tankstellen"}
            onClick={() => setIsMenuOpen(false)}
          >
            Tankstelle finden
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
