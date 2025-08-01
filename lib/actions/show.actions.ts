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

  const existingShow = await prisma.show.findFirst({
    where: {
      movieId,
      showDate: date,
      showTime: time,
    },
  });

  if (existingShow) {
    return {
      success: false,
      message:
        "A show for this movie at the selected date and time already exists.",
    };
  }

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

export const getShowsByMovieId = async (movieId: string) => {
  const shows = await prisma.show.findMany({
    where: { movieId },
    orderBy: [{ showDate: "asc" }, { showTime: "asc" }],
    include: {
      movie: true,
      tickets: true,
    },
  });

  return shows.map((show) => {
    // Count reserved seats
    const reservedSeats = show.tickets
      ? show.tickets.reduce(
          (acc, ticket) => acc + JSON.parse(ticket.seatNumber).length,
          0
        )
      : 0;

    return {
      ...show,
      availableSeats: show.totalSeats - reservedSeats,
    };
  });
};

export const getShowById = async (showId: string) => {
  const show = await prisma.show.findFirst({
    where: { id: showId },
    orderBy: [{ showDate: "asc" }, { showTime: "asc" }],
    include: {
      movie: true,
    },
  });

  return show;
};

export const getAllSeatsReserved = async (showId: string) => {
  const tickets = await prisma.ticket.findMany({
    where: { showId },
    select: { seatNumber: true },
  });

  return tickets.map((ticket) => JSON.parse(ticket.seatNumber));
};
