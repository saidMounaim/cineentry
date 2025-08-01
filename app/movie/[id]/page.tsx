import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMovieById } from "@/lib/actions/movie.actions";
import { getShowsByMovieId } from "@/lib/actions/show.actions";
import { Calendar, Clock, DollarSign, MapPin, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieById(id);
  const movieShows = movie ? await getShowsByMovieId(movie.id) : [];

  if (!movie) {
    return notFound();
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="overflow-hidden bg-gradient-card border-border shadow-elegant">
                <img
                  src={movie.posterUrl || ""}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                />
              </Card>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="bg-gradient-primary text-primary-foreground capitalize">
                  {movie.genre}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Released {movie.releaseDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Director: {movie.director}</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {movie.description}
              </p>
            </div>
          </div>
        </div>

        {/* Show Times */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Available Shows</h2>

            {movieShows.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No shows scheduled for this movie yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {movieShows.map((show) => {
                  return (
                    <Card
                      key={show.id}
                      className="bg-background/50 border-border hover:shadow-card transition-all duration-300"
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-semibold">Cineentry</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{show.showDate.toDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{show.showTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4" />
                                <span>${show.ticketPrice}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right space-y-2">
                            <p className="text-sm text-muted-foreground">
                              {show.availableSeats} of {show.totalSeats} seats
                              available
                            </p>
                            <Link href={`/book-ticket/${show.id}`}>
                              <Button variant="outline">Book Now</Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
