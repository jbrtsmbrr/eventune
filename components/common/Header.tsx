import Image from "next/image";
import Link from "next/link";
import Navigations from "./Navigations"
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="fixed top-0 z-10 flex items-center w-full p-4 py-2 justify-evenly bg-[#121212] text-gray-100">
      <Link href="/">
        <Image alt="eventune-logo" src="/assets/icons/eventune-high-resolution-logo-white-transparent.png" width={45} height={45} />
      </Link>
      <div className="p-2 px-4 flex gap-4 rounded-full outline-none focus-within:ring-2 ring-gray-800 shadow-lg bg-white md:w-1/5 w-3/5">
        {/* <Image alt="searc-icon" src="/assets/icons/icons8-search.svg" width={14} height={14} /> */}
        <input type="text" placeholder="Search for artist, organizers and events" className="text-sm outline-none bg-transparent w-full text-gray-700 placeholder:text-gray-400"></input>
      </div>
      <div className="md:block hidden">
        <Navigations />
      </div>
      <div>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Button>
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  )
}

export default Header