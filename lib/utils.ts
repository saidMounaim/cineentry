import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
