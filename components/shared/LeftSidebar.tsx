"use client"

import {
  OrganizationSwitcher,
  SignedIn,
  SignOutButton,
  useAuth,
} from "@clerk/nextjs"
import { sidebarLinks } from "@/constants"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

function LeftSidebar() {
  const router = useRouter()
  const path = usePathname()
  const { userId } = useAuth()

  const doSignOut = async () => {
    router.push("/sign-in")
  }

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (path.includes(link.route) && link.route.length > 1) ||
            path === link.route

          if (link.route === "/profile") link.route = `${link.route}/${userId}`

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive ? "bg-primary-500" : ""}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton redirectUrl="sign-in">
            <div className=" flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />

              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar
