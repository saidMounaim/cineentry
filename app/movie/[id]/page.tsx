import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getMovieById } from "@/lib/actions/movie.actions";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieById(id);

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

            <Link href={`/book-ticket/${movie.id}`}>
              <Button size="lg" className="w-full md:w-auto">
                Book Tickets Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
