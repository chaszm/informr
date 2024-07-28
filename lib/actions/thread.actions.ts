"use server"

import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import { connectToDB } from "../mongoose"
import User from "../models/user.model"
//import Community from "../models/community.model"

interface Params {
  text: string
  author: string
  communityId: string | null
  path: string
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB()

    const createdPost = await Thread.create({
      text,
      author,
      community: null, // or community id
    })

    //Update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdPost._id },
    })

    revalidatePath(path) //update changes
  } catch (error: any) {
    throw new Error(`Error creating post: ${error.message}`)
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB()
  const amountToSkip = (pageNumber - 1) * pageSize

  //fetch posts that have no parents (posts where parentID is null or undefined)
  const postQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({
      createdAt: "desc",
    })
    .skip(amountToSkip)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    })

  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  })

  const posts = await postQuery.exec()

  const isNext = totalPostsCount > amountToSkip + posts.length //calculates if there is a next page

  return { posts, isNext }
}

export async function fetchPostById(id: string) {
  connectToDB()
  try {
    //TODO: Populate Community

    const post = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec()

    return post
  } catch (error: any) {
    throw new Error(`Error fetching Post: ${error.message}`)
  }
}

export async function addCommentToPost(
  postId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB()

  try {
    //find original post by id
    const originalPost = await Thread.findById(postId)
    if (!originalPost) {
      throw new Error("Post not found")
    }

    const commentPostThread = new Thread({
      text: commentText,
      author: userId,
      parentId: postId,
    })
    //save new thread to DB
    const savedComment = await commentPostThread.save()

    originalPost.children.push(savedComment._id)

    await originalPost.save()
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Error adding comment to Thread: ${error.message}`)
  }
}
