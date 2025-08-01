"use client";

import { Button } from "@/components/ui/button";
import { downloadTicketPDF } from "@/lib/utils";
import { Download } from "lucide-react";
import React from "react";

const ButtonDownloadTicket = ({ orderId }: { orderId: string }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => downloadTicketPDF(orderId)}
    >
      <Download className="w-4 h-4" />
      Download Ticket
    </Button>
  );
};

export default ButtonDownloadTicket;
