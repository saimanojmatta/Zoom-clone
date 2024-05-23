import StreamVideoProvider from "@/Providers/StreamClientProvider"
import { Metadata } from "next";
import { ReactNode } from "react"
export const metadata: Metadata = {
  title: "XOOM",
  description: "Video calling application",
  icons:'/icons/logo.svg'
};

type Props = {
    children:ReactNode
}
const RootLayout = ({children}: Props) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}
export default RootLayout