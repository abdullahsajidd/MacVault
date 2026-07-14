import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Pickup and Delivery", description: "How MacVault pickup and delivery confirmation works.", path: "/delivery" });
export default function DeliveryPage() { return <PolicyPage title="Pickup and Delivery" intro="Pickup and delivery options depend on the product, destination and current availability. We confirm the complete arrangement before payment." sections={[
  { title: "Lahore pickup", paragraphs: ["For eligible orders, pickup timing and location are agreed in advance. Please wait for confirmation that the exact unit is ready before travelling."] },
  { title: "Delivery", paragraphs: ["Share your city and product on WhatsApp. We will confirm whether delivery is available, the expected timing, delivery charge, payment method and any inspection limitations before dispatch."] },
  { title: "Receiving an order", paragraphs: ["Check the package and reported condition promptly. If packaging appears damaged or the received item differs from the confirmed order, contact us immediately and keep the packaging and delivery evidence."] },
]} />; }
