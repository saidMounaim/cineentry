import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar as CalendarIcon2, Clock } from "lucide-react";
import { getNowShowingMovies } from "@/lib/actions/movie.actions";
import CreateShowForm from "@/components/shared/forms/create-show-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const CreateShow = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    redirect("/sign-in");
  }

  const movies = await getNowShowingMovies();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CalendarIcon2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Schedule New Show</h1>
          <p className="text-muted-foreground">
            Assign a movie to a theatre with specific timing
          </p>
        </div>

        <Card className="bg-gradient-card border-border shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Show Details</span>
            </CardTitle>
            <CardDescription>
              Configure the movie show schedule and pricing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateShowForm movies={movies} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateShow;
