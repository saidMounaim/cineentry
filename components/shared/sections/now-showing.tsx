import { getNowShowingMovies } from "@/lib/actions/movie.actions";
import { Clock } from "lucide-react";
import React from "react";
import MovieCard from "../cards/movie-card";

const NowShowing = async () => {
  const allMovies = await getNowShowingMovies();
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30 backdrop-blur">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Now Showing</h2>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span>Updated daily</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NowShowing;
