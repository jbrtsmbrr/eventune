"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"

const navigations = [
  { name: "Home", route: "/" },
  { name: "Events", route: "/events" },
  { name: "Artists", route: "/artists" },
  { name: "Contact", route: "/contact" }
]

const Navigations = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex gap-8 hidden">
      {navigations.map((item) => {
        let isActive = false;
        if (item.route === "/") {
          isActive = item.route === pathname;
        } else if (item.route !== "/")
          isActive = pathname.includes(item.route)

        return <li key={`item-${item.name}`}>
          <Link href={item.route} className={`text-gray-400 hover:text-gray-300 h-fit w-fit text-xs relative uppercase tracking-wider font-semibold  ${isActive ? "!text-white" : "font-normal"}`}>{item.name}</Link>
        </li>
      })}
    </ul>
  )
}

export default Navigations