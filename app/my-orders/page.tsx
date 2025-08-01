import ButtonDeleteTicket from "@/components/shared/ticket/button-delete-ticket";
import ButtonDownloadTicket from "@/components/shared/ticket/button-download-ticket";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllBookedTicketsByUserId } from "@/lib/actions/ticket.actions";
import { auth } from "@/lib/auth";
import { ArrowLeft, Calendar, Clock, Ticket } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const MyOrders = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const orders = await getAllBookedTicketsByUserId(session.user.id);

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                My Orders
              </h1>
              <p className="text-muted-foreground mt-2">
                View and manage your movie ticket bookings
              </p>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Ticket className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-6">
                {"You haven't booked any tickets yet. Start exploring movies!"}
              </p>
              <Link href="/">
                <Button>Browse Movies</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              return (
                <Card
                  key={order.id}
                  className="overflow-hidden hover:shadow-glow transition-all duration-300"
                >
                  <CardHeader className="bg-gradient-subtle">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>Order #{order.id}</span>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Booked on{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ButtonDownloadTicket orderId={order.id} />
                        <ButtonDeleteTicket orderId={order.id} />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex space-x-4">
                        <img
                          src={order.show.movie?.posterUrl || ""}
                          alt={order.show.movie?.title}
                          className="w-20 h-28 object-cover rounded-lg shadow-card"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">
                            {order.show.movie?.title}
                          </h3>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(
                                  order.show.showDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{order.show.showTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Booking Details</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Seats</TableHead>
                              <TableHead>Total Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {order.seatNumber}
                                </div>
                              </TableCell>
                              <TableCell className="font-semibold">
                                ${order.price * order.seatNumber.length}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
