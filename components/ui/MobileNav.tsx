"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-1">
            <Image src="/hamburgerMenu.png" alt="=" width={40} height={40}
            className="cursor-pointer sm:hidden text-white"/>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-neutral-900 border-none">
          <div className="flex flex-col justify-between h-[calc(100vh-72px)] overflow-y-auto">
            <SheetClose>
              <section className="flex flex-col h-full gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathName === link.route || pathName.startsWith(link.route);
                  return (
                    <Link
                      href={link.route}
                      key={link.label}
                      className={cn(
                        "flex gap-4 items-center p-4 rouled-lg w-full",
                        { "bg-blue-700": isActive }
                      )}
                    >
                      <Image
                        src={link.imgUrl}
                        alt={link.label}
                        width={24}
                        height={24}
                      />
                      <p className="text-lg text-white font-semibold">
                        {link.label}
                      </p>
                    </Link>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
