"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"

const navigations = [
  { name: "Trendings", route: "/trendings" },
  { name: "Events", route: "/events" },
  { name: "Contact", route: "/contact" },
  { name: "Artists", route: "/artists" }
]

const Navigations = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex gap-8 hidden">
      {navigations.map((item) => {
        const isActive =  pathname.includes(item.route);
        return <li key={`item-${item.name}`}>
          <Link href={item.route} className={`after:top-0 after:left-0 after:z-50 after:mix-blend-difference after:text-white after:absolute after:h-full after:w-full h-fit w-fit text-sm relative ${isActive ? "font-semibold text-purple-600" : "font-normal"}`}>{item.name}</Link>
        </li>
      })}
    </ul>
  )
}

export default Navigations