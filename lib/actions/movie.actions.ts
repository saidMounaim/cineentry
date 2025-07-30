"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { CreateMovieSchema } from "../validations";
import { headers } from "next/headers";
import { auth } from "../auth";
import { uploadToImageKit } from "../upload";

export const createMovie = async (formData: FormData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  const validatedFields = CreateMovieSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    genre: formData.get("genre"),
    duration: formData.get("duration"),
    director: formData.get("director"),
    releaseDate: new Date(formData.get("releaseDate") as string),
    poster: formData.get("poster"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description, genre, duration, director, releaseDate, poster } =
    validatedFields.data;

  let posterUrl = "";
  if (poster && typeof poster !== "string") {
    posterUrl = await uploadToImageKit(poster);
  }

  const movie = await prisma.movie.create({
    data: {
      title,
      description,
      genre,
      duration,
      director,
      releaseDate,
      posterUrl: posterUrl || undefined,
      userId: session.user.id,
    },
  });

  revalidatePath("/");

  return {
    success: true,
    message: "Movie created successfully",
    movie,
  };
};
