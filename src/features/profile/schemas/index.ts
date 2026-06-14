import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const profileSchema = z.object({
  nickname: z.string().min(2, "Nickname must be at least 2 characters"),
  thumbnail: z
    .custom<FileList>()
    .optional()
    .refine((files) => !files?.[0] || files[0].size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (files) => !files?.[0] || ACCEPTED_TYPES.includes(files[0].type),
      "Only .jpg, .png, .webp are accepted",
    ),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
