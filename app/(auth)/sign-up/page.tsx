import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Film } from "lucide-react";
import SignUpForm from "@/components/shared/forms/sign-up-form";

const SignUpPage = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Film className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Join Cineentry</h1>
          <p className="text-muted-foreground">
            Create your account to get started
          </p>
        </div>

        <Card className="bg-gradient-card border-border shadow-elegant">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Fill in your details to create your CineMax account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
