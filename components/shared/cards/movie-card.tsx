import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import Link from "next/link";

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl?: string | null;
  genre: string;
  duration: string;
  description: string;
}

const MovieCard = ({
  id,
  title,
  posterUrl,
  genre,
  duration,
  description,
}: MovieCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card border-border hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        {posterUrl && (
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-4 left-4 bg-gradient-primary text-primary-foreground capitalize">
          {genre}
        </Badge>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{duration}</span>
          </div>

          <div className="flex space-x-2">
            <Link href={`/movie/${id}`}>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </Link>
            <Link href={`/book-ticket/${id}`}>
              <Button size="sm">Book Now</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
