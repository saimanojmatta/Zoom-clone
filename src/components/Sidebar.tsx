'use client'
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {}
const Sidebar = (props: Props) => {
  const pathName=usePathname()
  return (
    // bg-dark-1 text-white
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between   p-6 pt-28  max-sm:hidden lg:w-[264px] border-r-[1px]dark:border-neutral-900 border-b-gray-200  ">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item)=>{
          const isActive= pathName===item.route||pathName.startsWith(`${item.route}/`)
          return(
          <Link  className={cn('flex gap-4 items-center p-4 rounded-lg justify-start  border border-gray-200 dark:border-black',{'bg-blue-1':isActive})}
          href={item.route} key={item.label}>
            <Image src={item.imgURL} alt={item.label} width={24} height={24}/>
            <p className="text-lg font-semibold max-lg:hidden">{item.label}</p>
          </Link>
          )
        })}
      </div>
    </section>
  )
}
export default Sidebar