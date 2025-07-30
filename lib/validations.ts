import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

export const SignUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const CreateMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  genre: z.string().min(1, "Genre is required"),
  duration: z.string().min(1, "Duration is required"),
  director: z.string().min(1, "Director is required"),
  releaseDate: z
    .date()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "Release date is required",
    }),
  poster: z.any().optional(), // File input
});
