import CreateMovieForm from "@/components/shared/forms/create-movie-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { Film, Star } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const CreateMoviePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    redirect("/sign-in");
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Film className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Add New Movie</h1>
          <p className="text-muted-foreground">
            Create a new movie entry for the cinema catalog
          </p>
        </div>

        <Card className="bg-gradient-card border-border shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-primary" />
              <span>Movie Details</span>
            </CardTitle>
            <CardDescription>
              Fill in the movie information and upload a poster image
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateMovieForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateMoviePage;
