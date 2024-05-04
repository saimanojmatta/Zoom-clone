'use client'
import { ReactNode } from "react"
import { Dialog, DialogContent } from "./ui/dialog"
import Image from "next/image"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

type Props = {
    isOpen:boolean,
    onClose:()=>void,
    title:string,
    handleClick:()=>void,
    className?:string,
    children?:ReactNode,
    buttonText?:string,
    image?:string,
    buttonIcon?:string,
    buttonClassName?:string,
    instantMeeting?:boolean

}
const MeetingModal = ({isOpen,onClose,title,handleClick,className,children,buttonIcon,buttonText,image,buttonClassName,instantMeeting}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
        <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white" >
            <div className="flex flex-col gap-6">
              {image && (
                <div  className="flex justify-center" >
                  <Image src={image} alt="checked" width={72} height={72} />
                </div>
              )}
              <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{title}</h1>
              {children}
              <Button className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}>
                {buttonIcon && (
                  <Image src={buttonIcon} alt="button icon" width={13} height={13}/>
                )}{""}
                &nbsp;
                {buttonText || "Schedule  Meeting"}
              </Button>
            </div>
        </DialogContent>
    </Dialog>
   
  )
}
export default MeetingModal