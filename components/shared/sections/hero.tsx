import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
