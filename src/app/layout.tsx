import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { ThemeProvider } from "@/Providers/theme-provider";
export const metadata: Metadata = {
  title: "XOOM",
  description: "Video calling application",
  icons:'/icons/logo.svg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <ClerkProvider appearance={{
            layout:{
              socialButtonsVariant: "blockButton",
              logoImageUrl: "/icons/yoom-logo.svg",
              
            },
            variables:{
              colorText: "#fff",
              colorPrimary: "#0E78F9",
              colorBackground: "#1C1F2E",
              colorInputBackground: "#252A41",
              colorInputText: "#fff",
              
            }
          }}>
            <body className={`${inter.className}  `}>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                  {children}
              </ThemeProvider>
                  <Toaster/>
              </body>
          </ClerkProvider>
      </html>
  );
}
