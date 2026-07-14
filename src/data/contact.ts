export const phoneRaw = "923394004289";
export const phoneDisplay = "+92 339 4004289";
export const phoneHref = `tel:+${phoneRaw}`;
export const emailAddress = "abdullahsajid228@gmail.com";
export const emailHref = `mailto:${emailAddress}`;

export function createWhatsappHref(message: string) {
  return `https://wa.me/${phoneRaw}?text=${encodeURIComponent(message)}`;
}

export const whatsappStockHref = createWhatsappHref(
  "Hi MacVault, I want to check current stock.",
);
