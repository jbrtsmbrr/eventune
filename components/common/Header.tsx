import Image from "next/image";
import Link from "next/link";
import Navigations from "./Navigations"
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="fixed top-0 z-10 flex items-center w-full p-4 bg-transparent justify-evenly">
      <Link href="/">
        <Image alt="eventune-logo" src="/assets/icons/logo.png" width={48} height={48} />
      </Link>
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