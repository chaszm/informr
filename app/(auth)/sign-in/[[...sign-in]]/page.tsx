import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return <SignIn /> //still redirects to onboarding after logging in/out
}
