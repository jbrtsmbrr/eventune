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
    <ul className="flex gap-8">
      {navigations.map((item) => {
        const isActive =  pathname.includes(item.route);
        return <li key={`item-${item.name}`}>
          <Link href={item.route} className={`text-sm ${isActive ? "font-semibold text-purple-600" : "font-normal"}`}>{item.name}</Link>
        </li>
      })}
    </ul>
  )
}

export default Navigations