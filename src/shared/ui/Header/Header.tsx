"use client";
import { Headset } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps extends React.HTMLProps<HTMLDivElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left, center, right }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-b from-white to-white/0 dark:from-black dark:to-black/0">
      <div className="max-w-md mx-auto px-6 py-5 grid grid-cols-3 items-center">
        <span className="flex">
          {left ?? (
            <Link
              href={`https://t.me/pavlenkodim99?text=Hello,%20I%20need%20some%20help%20with%20your%20application:%20Filmder`}
              target="_blank"
            >
              <Headset />
            </Link>
          )}
        </span>
        {center ?? (
          <h1 className="text-2xl text-center font-bold capitalize">
            {pathname?.replace(/\//g, "") || "filmder"}
          </h1>
        )}
        <span className="flex justify-end">{right}</span>
      </div>
    </header>
  );
};

export default Header;
