import { z } from "zod";

export const signupSchema=z.object({
    email:z.string().email("Invalid email"),
    password:z.string().min(4,"Minimum length for password is 4"),
    name:z.string().min(4,"Minimum length for name is 4")
})