"use client"

import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserValidation } from "@/lib/validations/user"
import * as z from "zod"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import "@/app/globals.css"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { updateUser } from "@/lib/actions/user.actions"

interface Props {
  user: {
    id: string
    objectId: string
    username: string
    name: string
    bio: string
    image: string
  }
  btnTitle: string
}

function PostThread({ userId }: { userId: string }) {
  const [files, setfiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media")

  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  })
  return <h1>Post Form</h1>
}

export default PostThread
