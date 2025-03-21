import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import RightSidebar from "@/components/shared/RightSidebar"
import Topbar from "@/components/shared/Topbar"
import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Informr",
  description: "Informr Social Media Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //Home layout

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Topbar />

          <main className="flex flex-row">
            <LeftSidebar />

            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>

            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
