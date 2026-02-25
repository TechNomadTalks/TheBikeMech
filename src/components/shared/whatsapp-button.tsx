"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "27623235295";
  const message = "Hi! I'm interested in your bike repair services.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
