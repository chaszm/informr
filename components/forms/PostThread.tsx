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

import * as z from "zod"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import "@/app/globals.css"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"

import { updateUser } from "@/lib/actions/user.actions"
import { ThreadValidation } from "@/lib/validations/thread"
import { createThread } from "@/lib/actions/thread.actions"
import { useOrganization } from "@clerk/nextjs"

interface Props {
  userId: string
}

function PostThread({ userId }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const { organization } = useOrganization()

  const form = useForm({
    resolver: zodResolver(ThreadValidation),

    defaultValues: {
      thread: "",
      accountId: userId,
    },
  })

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    })

    // create post button

    router.push("/") //redirect to homepage
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>

              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Create Post
        </Button>
      </form>
    </Form>
  )
}

export default PostThread
