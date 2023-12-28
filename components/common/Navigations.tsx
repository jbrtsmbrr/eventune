"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"

const navigations = [
  { name: "Trendings", route: "/trendings" },
  { name: "Events", route: "/events" },
  { name: "Contact", route: "/contact" }
]

const Navigations = () => {
  const pathname = usePathname();

  return (
    <ul className="flex gap-8">
      {navigations.map((item) => {
        const isActive = item.route === pathname;
        return <li key={`item-${item.name}`}>
          <Link href={item.route} className={`${isActive ? "font-semibold text-purple-600" : "font-normal"}`}>{item.name}</Link>
        </li>
      })}
    </ul>
  )
}

export default Navigations