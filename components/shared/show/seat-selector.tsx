"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateSeats, cn } from "@/lib/utils";

type Seat = {
  id: string;
  row: string;
  number: number;
  isAvailable: boolean;
  isSelected: boolean;
};

export default function SeatSelector({
  totalSeats,
  price,
}: {
  totalSeats: number;
  price: number;
}) {
  const [seats, setSeats] = useState<Seat[]>(generateSeats(totalSeats));
  const selectedSeats = seats.filter((seat) => seat.isSelected);
  const totalPrice = selectedSeats.length * price;

  const handleSeatClick = (seatId: string) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === seatId && seat.isAvailable
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
  };

  const handleBooking = () => {};

  function getSeatColor(seat: Seat) {
    if (!seat.isAvailable) return "bg-gray-300 border-gray-400";
    if (seat.isSelected) return "bg-primary text-white border-primary";
    return "bg-white border-gray-300";
  }

  return (
    <Card className="bg-gradient-card border-border shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-primary" />
          <span>Select Your Seats</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="w-full h-4 bg-gradient-primary rounded-t-3xl mb-2"></div>
          <p className="text-sm text-muted-foreground">SCREEN</p>
        </div>
        <div className="space-y-2">
          {Array.from({ length: Math.ceil(totalSeats / 12) }, (_, rowIndex) => {
            const row = String.fromCharCode(65 + rowIndex);
            const rowSeats = seats.filter((seat) => seat.row === row);

            return (
              <div
                key={row}
                className="flex items-center justify-center space-x-1"
              >
                <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                  {row}
                </span>
                <div className="flex space-x-1">
                  {rowSeats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
                      className={cn(
                        "w-8 h-8 rounded-md border text-xs font-medium transition-all duration-200",
                        getSeatColor(seat)
                      )}
                      disabled={!seat.isAvailable}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="space-y-3">
          <h4 className="font-medium">Selected Seats</h4>
          {selectedSeats.length === 0 ? (
            <p className="text-sm text-muted-foreground">No seats selected</p>
          ) : (
            <div className="space-y-2">
              {selectedSeats.map((seat) => (
                <div key={seat.id} className="flex justify-between text-sm">
                  <span>Seat {seat.id}</span>
                  <span>${price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount</span>
            <span className="text-xl font-bold text-primary">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <Button
            onClick={handleBooking}
            className="w-full"
            size="lg"
            disabled={selectedSeats.length === 0}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Book {selectedSeats.length} Ticket
            {selectedSeats.length !== 1 ? "s" : ""}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
