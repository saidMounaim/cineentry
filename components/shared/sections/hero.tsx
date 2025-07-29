import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Film, Star, TrendingUp } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-primary text-primary-foreground px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Premium Cinema Experience
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Cineentry
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the latest blockbusters and book your perfect cinema
            experience with premium comfort and state-of-the-art technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" className="text-lg">
              <Film className="w-5 h-5 mr-2" />
              Explore Movies
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Trending Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
