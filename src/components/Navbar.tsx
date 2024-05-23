import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"
import { SignedIn, UserButton } from "@clerk/nextjs"
import NavigationMenu from "./NavgationMenu"
import { ModeToggle } from "./toogle-mode"
type Props = {}
const Navbar = (props: Props) => {
  return (
    // bg-dark-1
   <nav className="flex-between fixed z-50 w-full  px-6 py-6 lg:px-10 border-b-[1px] dark:border-neutral-900 border-b-gray-200 ">
    <Link href='/' className="flex items-center gap-1">
     <Image src="/icons/logo.svg" alt="XOOM logo"   className="max-sm:size-10" width={32} height={32} />
    <p className="text-[26px] font-extrabold  max-sm:hidden ">XOOM</p>
    </Link>
    <div className="flex-between gap-5">
      <NavigationMenu className="top-2 max-md:hidden"/>
      <ModeToggle/>
      <UserButton afterSignOutUrl="/"/>
      <MobileNav/>
    </div>
   </nav>
  )
}
export default Navbar