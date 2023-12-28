import Image from "next/image";
import Link from "next/link";
import Navigations from "./Navigations"
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="fixed top-0 w-full p-8 flex items-center justify-evenly bg-transparent z-10">
      <Image alt="eventune-logo" src="/assets/icons/logo.png" width={80} height={80} />
      <div>
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