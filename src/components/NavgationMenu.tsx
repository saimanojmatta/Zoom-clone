'use client'
import { useState } from "react"
import { HoveredLink, Menu, MenuItem, ProductItem } from "./aceternityUI/navbar-menu"
import { cn } from "@/lib/utils"
import {  Bot, Grid2X2, Headset, Rocket, Users} from "lucide-react"

type Props = {}
const NavigationMenu = ({className}: {className?:string}) => {
    const[active,setActive]=useState<string|null>(null)
  return (
   <div className={cn('fixed  top-10 inset-x-0 max-w-2xl mx-auto z-50 text-white ',className)} >
    <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/Pricing">Free</HoveredLink>
            <HoveredLink href="/Pricing">Pro</HoveredLink>
            <HoveredLink href="/Pricing">EnterPrise</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="GetStream "
              href="https://getstream.io/video/docs/"
              src="/images/videosdk.avif"
              description="Add video and audio web app using our video SDK."
            />
            <ProductItem
              title="integrate AI with Chat"
              href="https://getstream.io/chat/solutions/ai-integration/"
              src="/images/videoBannerImage.webp"
              description="Stream messaging app uses  ChatGPT, or Google's Gemini"
            />
            <ProductItem
              title="Auto Moderation"
              href="https://getstream.io/automated-moderation/"
              src="/images/Resource-03.png"
              description="Pocket Gems Successfully Migrates Millions of Users to Stream Chat"
            />
            <ProductItem
              title="About Us"
              href="https://getstream.io/team/"
              src="/images/Resource-4.png"
              description=" Stream has raised over $58.25M to build the best Chat Messaging "
            />
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Products">
            <div className="flex flex-col space-y-4 text-sm  ">
                <HoveredLink href='/web-dev' >
                  <div className="flex items-center justify-start gap-1  ">
                    <Headset />
                  Contact Center
                  </div>
                </HoveredLink>
                <HoveredLink href='/web-dev' >
                  <div className="flex items-center justify-start gap-1  ">
                    <Bot />
                  Virtual agents
                  </div>
                </HoveredLink>
                <HoveredLink href='/web-dev' >
                  <div className="flex items-center justify-start gap-1  ">
                    <Users />
                  Workforce engagement
                  </div>
                </HoveredLink>
                <HoveredLink href='/web-dev' >
                  <div className="flex items-center justify-start gap-1  ">
                    <Rocket />
                Revenue Accelerator
                  </div>
                </HoveredLink>
                <HoveredLink href='/web-dev' >
                  <div className="flex items-center justify-start gap-1  ">
                    <Grid2X2 />
                  App MarketPlace
                  </div>
                </HoveredLink>
            </div>
        </MenuItem>

    </Menu>
   </div>
  )
}
export default NavigationMenu