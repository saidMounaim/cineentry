"use server";

import { prisma } from "@/lib/prisma";
import { CreateShowSchema } from "../validations";
import { revalidatePath } from "next/cache";

export const createShow = async (formData: FormData) => {
  const validatedFields = CreateShowSchema.safeParse({
    movieId: formData.get("movieId"),
    totalSeats: formData.get("totalSeats"),
    date: new Date(formData.get("date") as string),
    time: formData.get("time"),
    price: formData.get("price"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { movieId, totalSeats, date, time, price } = validatedFields.data;

  const show = await prisma.show.create({
    data: {
      movieId,
      totalSeats,
      showDate: date as Date,
      showTime: time,
      ticketPrice: price,
    },
  });

  revalidatePath("/");

  return {
    success: true,
    message: "Show created successfully",
    show,
  };
};

export const getShowByMovieId = async (movieId: string) => {
  const show = await prisma.show.findFirst({
    where: { movieId },
    orderBy: [{ showDate: "asc" }, { showTime: "asc" }],
    include: {
      movie: true,
    },
  });

  return show;
};
