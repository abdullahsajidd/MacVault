"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Cta } from "@/components/cta";
import { openConsentAwareWhatsapp, productInquiryMessage } from "@/lib/whatsapp-inquiry";

type ProductWhatsappCtaProps = {
  productName: string;
  productUrl: string;
  label?: string;
  variant?: "primary" | "secondary";
};

export function ProductWhatsappCta({
  productName,
  productUrl,
  label = "Confirm today's price",
  variant = "primary",
}: ProductWhatsappCtaProps) {
  const [isPreparing, setIsPreparing] = useState(false);

  async function openWhatsapp() {
    setIsPreparing(true);

    await openConsentAwareWhatsapp(productInquiryMessage(productName, productUrl));
  }

  return (
    <Cta
      asButton
      type="button"
      icon={MessageCircle}
      variant={variant}
      onClick={openWhatsapp}
      disabled={isPreparing}
    >
      {isPreparing ? "Opening WhatsApp" : label}
    </Cta>
  );
}
