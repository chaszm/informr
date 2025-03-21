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
import { CommentValidation } from "@/lib/validations/thread"
import { addCommentToPost } from "@/lib/actions/thread.actions"

interface Props {
  postId: string
  currentUserImg: string
  currentUserId: string
}

const Comment = ({ postId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(CommentValidation),

    defaultValues: {
      thread: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToPost(
      postId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    )
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>

              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  )
}

export default Comment
