"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import * as z from "zod";
import { CreateShowSchema } from "@/lib/validations";
import { createShow } from "@/lib/actions/show.actions";
import { useRouter } from "next/navigation";

type Movie = {
  id: string;
  title: string;
  genre: string;
};

const timeSlots = ["09:00", "12:00", "15:00", "18:00", "21:00", "00:00"];

type CreateShowFormData = z.infer<typeof CreateShowSchema>;

const CreateShowForm = ({ movies }: { movies: Movie[] }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(CreateShowSchema),
    defaultValues: {
      movieId: "",
      totalSeats: 0,
      time: "",
      price: 0,
      date: new Date(),
    },
  });

  const onSubmit = async (values: CreateShowFormData) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("movieId", values.movieId);
    formData.append("totalSeats", values.totalSeats.toString());
    formData.append("date", values.date.toDateString());
    formData.append("time", values.time);
    formData.append("price", values.price.toString());
    try {
      const response = await createShow(formData);
      if (response.success) {
        toast.success(response.message);
        router.push("/");
      } else {
        toast.error(response.message);
        console.log(response);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Movie Select */}
        <FormField
          control={form.control}
          name="movieId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Movie</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Choose a movie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {movies.map((movie) => (
                    <SelectItem key={movie.id} value={movie.id}>
                      {movie.title} ({movie.genre})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Total Seats */}
        <FormField
          control={form.control}
          name="totalSeats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Seats</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="120"
                  {...field}
                  value={field.value as string}
                  className="bg-background/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Show Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Show Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background/50",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Show Time */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Show Time</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ticket Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Price ($)</FormLabel>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="15.00"
                    {...field}
                    value={field.value as string}
                    className="pl-10 bg-background/50"
                    step="0.50"
                    min="0"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          <CalendarIcon className="w-4 h-4 mr-2" />
          {isLoading ? "Scheduling..." : "Accept"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateShowForm;
