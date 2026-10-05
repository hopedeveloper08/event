import Image from "next/image";
import Link from "next/link";
import Navs from "./Navs";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="glass sticky top-0 z-50">
      <nav className="flex justify-between container sm:px-10 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/event/logo.png" alt="Logo" width={48} height={48} />
          <span className="text-xl font-bold italic max-sm:hidden">رویداد</span>
        </Link>
        <div className="flex items-center gap-4">
          <Navs />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
