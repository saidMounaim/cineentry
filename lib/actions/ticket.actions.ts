"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export const bookTicket = async (
  showId: string,
  seatNumbers: string[],
  pathname: string
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to book tickets",
    };
  }

  const show = await prisma.show.findUnique({
    where: { id: showId },
    include: { movie: true },
  });

  if (!show) {
    return {
      success: false,
      message: "Show not found",
    };
  }

  const ticket = await prisma.ticket.create({
    data: {
      showId,
      seatNumber: JSON.stringify(seatNumbers),
      price: show.ticketPrice,
      userId: session.user.id,
    },
  });

  revalidatePath(pathname);

  return {
    success: true,
    message: "Ticket booked successfully",
    ticket,
  };
};
