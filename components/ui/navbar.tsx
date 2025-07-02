"use client"; // If you need client-side

import Link from "next/link";
import MobileNav from "./MobileNav";
import Image from "next/image";

export default function Navbar({ user }: { user?: { image?: string } }) {
  return (
    <nav className="border-b sticky flex justify-between shadow-lg overflow-hidden p-3 border-slate-500 shadow-slate-950/5 mx-auto w-full">
      <div className="flex items-center">
        <Link
          href="/"
          className="font-sans antialiased text-lg text-current ml-2 mr-2 flex gap-2 py-1 font-semibold"
        >
          <Image
            src="/convoc.png"
            alt="Convoc Logo"
            width={24}
            height={24}
            className="inline-block object-cover object-center w-6 h-6 rounded-full group border border-slate-800 p-0.5 lg:ml-auto"
          />
          Convoc
        </Link>
        <hr className="mx-1 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
      </div>
      <div className="flex justify-between gap-2">
        <Image
          src={user?.image || "/defaultProfile.png"}
          alt="profile-picture"
          width={40}
          height={40}
          className="inline-block object-cover object-center w-10 h-10 rounded-full group border border-slate-800 p-0.5 lg:ml-auto"
        />
        <MobileNav />
      </div>
    </nav>
  );
}
