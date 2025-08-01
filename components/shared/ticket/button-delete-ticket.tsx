"use client";

import { Button } from "@/components/ui/button";
import { deleteTicketById } from "@/lib/actions/ticket.actions";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ButtonDeleteTicket = ({ orderId }: { orderId: string }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    if (
      confirm(
        "Are you sure you want to delete this ticket? This action cannot be undone."
      )
    ) {
      try {
        const response = await deleteTicketById(orderId);
        if (response.success) {
          toast.success("Ticket deleted successfully");
        } else {
          toast.error(response.message || "Failed to delete ticket");
        }
      } catch (error) {
        toast.error("Failed to delete ticket");
        console.error("Delete ticket error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      className="ml-2"
      onClick={() => handleDelete()}
      disabled={loading}
    >
      <Trash className="w-4 h-4" />
      Delete ticket
    </Button>
  );
};

export default ButtonDeleteTicket;
