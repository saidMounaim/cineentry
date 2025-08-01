import SeatSelector from "@/components/shared/show/seat-selector";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getShowByMovieId } from "@/lib/actions/show.actions";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Calendar, Clock, CreditCard } from "lucide-react";
import { notFound } from "next/navigation";

export default async function BookTicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = await getShowByMovieId(id);

  if (!show) {
    return notFound();
  }

  const totalSeats = show.totalSeats || 0;

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SeatSelector
              totalSeats={totalSeats}
              price={show.ticketPrice || 15}
            />
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-border shadow-elegant sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>Booking Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Movie Info */}
                <div className="space-y-3">
                  <img
                    src={show.movie.posterUrl || ""}
                    alt={show.movie.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {show.movie.title}
                    </h3>
                    <Badge className="mt-1">{show.movie.genre}</Badge>
                  </div>
                </div>

                <Separator />

                {/* Show Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{show.showDate.toDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{show.showTime}</span>
                  </div>
                </div>

                <Separator />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
