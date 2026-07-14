import { Home, PackageSearch } from "lucide-react";
import { Cta } from "@/components/cta";
import { containerClass } from "@/components/layout-classes";
import { Footer, Header } from "@/components/site";

export default function NotFound() {
  return (
    <div className="bg-white text-[#102a43]">
      <Header />
      <main
        id="main-content"
        className={`${containerClass} grid min-h-[76vh] place-items-center pt-[130px] pb-[60px] text-center`}
      >
        <div>
          <span className="text-sm font-bold tracking-[.16em] text-[#0a84ff]">404</span>
          <h1 className="mt-4 text-[clamp(44px,7vw,78px)] font-semibold tracking-[-.05em]">
            This page isn’t in stock.
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-lg leading-[1.65] text-[#667085]">
            The link may have changed. Browse the current listings or head back to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Cta href="/products" icon={PackageSearch}>
              Browse products
            </Cta>
            <Cta href="/" icon={Home} variant="secondary">
              Go home
            </Cta>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
