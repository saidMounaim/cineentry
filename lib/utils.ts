import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getTicketById } from "./actions/ticket.actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitials(name: string = "") {
  const trimmedName = name.trim();
  const nameParts = trimmedName.split(" ");

  if (nameParts.length > 1) {
    return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
  } else {
    return trimmedName.substring(0, 2);
  }
}

export function generateSeats(totalSeats: number) {
  const seats = [];
  const seatsPerRow = 12;
  for (let i = 0; i < totalSeats; i++) {
    const row = String.fromCharCode(65 + Math.floor(i / seatsPerRow));
    seats.push({
      id: `${row}${(i % seatsPerRow) + 1}`,
      row,
      number: (i % seatsPerRow) + 1,
      isAvailable: true,
      isSelected: false,
    });
  }
  return seats;
}

export async function downloadTicketPDF(orderId: string) {
  const order = await getTicketById(orderId);

  if (!order) {
    return;
  }

  const totalAmount = order.price * order.seatNumber.length;

  const ticketContent = `
CINEENTRY TICKET
================
Order ID: ${order.id}
Movie: ${order.show.movie?.title}
Date: ${order.show.showDate.toDateString()}
Time: ${order.show.showTime}
Seats: ${order?.seatNumber}
Total: $${totalAmount}
================
Thank you for choosing Cineentry!
    `;

  const blob = new Blob([ticketContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ticket-${order.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
