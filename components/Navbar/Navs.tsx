import Link from "next/link";

export default function Navs() {
  const navLinks = [
    { name: "خانه", href: "/" },
    { name: "رویدادها", href: "/events" },
    { name: "ایجاد رویداد", href: "/create-event" },
  ];

  return (
    <ul className="flex flex-row items-center gap-6">
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
