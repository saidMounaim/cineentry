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

export const getAllBookedTicketsByUserId = async (userId: string) => {
  const tickets = await prisma.ticket.findMany({
    where: { userId },
    include: {
      show: {
        include: {
          movie: true,
        },
      },
    },
  });

  return tickets;
};

export const getTicketById = async (ticketId: string) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      show: {
        include: {
          movie: true,
        },
      },
    },
  });

  if (!ticket) {
    return null;
  }

  return ticket;
};

export const deleteTicketById = async (ticketId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to delete tickets",
    };
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket || ticket.userId !== session.user.id) {
    return {
      success: false,
      message: "Ticket not found or you do not have permission to delete it",
    };
  }

  await prisma.ticket.delete({
    where: { id: ticketId },
  });

  revalidatePath("/my-orders");

  return {
    success: true,
    message: "Ticket deleted successfully",
  };
};
