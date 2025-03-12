import mongoose from "mongoose"

let isConnected = false 
const defaultConnection = 0

export const connectToDB = async () => {
  mongoose.set("strictQuery", true)

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL Not Found")

  if (isConnected) return console.log("Already connected to MongoDB")

  try {
    await mongoose.connect(process.env.MONGODB_URL) //from env.local

    isConnected = true

    console.log("connected to MongoDB")
  } catch (error) {    // catch if not connected
    console.log(error)
  }
}
