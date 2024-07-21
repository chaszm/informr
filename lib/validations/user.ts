import * as z from "zod"

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "MINIMUM OF 3 CHARACTERS " })
    .max(30, { message: "MAXIMUM OF 30 CHARACTERS " }),

  username: z
    .string()
    .min(3, { message: "MINIMUM OF 3 CHARACTERS " })
    .max(30, { message: "MAXIMUM OF 30 CHARACTERS " }),

  bio: z
    .string()
    .min(2, { message: "MINIMUM OF 2 CHARACTERS " })
    .max(1000, { message: "MAXIMUM OF 1000 CHARACTERS " }),
})
