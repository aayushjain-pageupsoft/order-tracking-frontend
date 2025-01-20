"use client";

import Link from "next/link";
import Menu from '../../public/menu.png'
import Image from "next/image";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activePage,
  setActivePage
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activePage: string;
  setActivePage: (stri: string) => void;
}) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-52 backdrop-blur-md border-r-2 border-orange-100 transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
    >
      <button
        className={`absolute bg-transparent hover:bg-gray-700 top-4 transition-all duration-300 px-4 py-2 rounded-full shadow-lg ${sidebarOpen ? "right-3" : "-right-32"}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Image src={Menu} alt="menu" className="h-10 w-10" />
      </button>

      <nav className="flex flex-col gap-4 mt-20 px-4">
        {["home", "track-order", "list-orders", "create-order"].map((page) => (
          <Link
            key={page}
            onClick={() => setActivePage(page)}
            href={`/${page === "home" ? "" : page}`}
            className={`hover:bg-orange-700 px-6 py-2 rounded-lg transition ${activePage === page
              ? "bg-orange-700 text-white font-bold"
              : "text-gray-300 hover:bg-orange-700 hover:text-white"
              }`}>
            {page}
          </Link >
        ))}
        
      </nav>
    </div>
  );
}
