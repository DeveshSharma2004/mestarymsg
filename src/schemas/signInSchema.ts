import { z } from "zod";

export const siggInSchema = z.object({
   identifier: z.string(),
   passwod:z.string(),
})