import Link from "next/link";
import { ArrowRight, Gamepad2, Headphones, Laptop, PackageSearch, Smartphone, Tablet, Watch as WatchIcon, type LucideIcon } from "lucide-react";
import { containerClass } from "@/components/layout-classes";
import { AnimatedText, Tag } from "@/components/site-primitives";
import type { SanityCategory } from "@/sanity/types";

const categoryIcons: Record<string, LucideIcon> = { iPhone: Smartphone, Mac: Laptop, iPad: Tablet, Watch: WatchIcon, Accessories: Headphones, PlayStation: Gamepad2 };

export function HomeCategoryRail({ categories }: { categories: SanityCategory[] }) {
  return <section className="border-y border-[#102a4314] bg-white py-[60px]"><div className={containerClass}><div className="reveal grid grid-cols-[minmax(240px,.7fr)_minmax(0,1.3fr)] items-stretch gap-10 max-[900px]:grid-cols-1"><div className="flex flex-col justify-center"><Tag>Shop by product</Tag><h2 className="section-title mt-5 max-w-[520px]">Start with what you <AnimatedText>need</AnimatedText>.</h2></div><div className="home-category-list">{categories.map(({ _id, label, category, href }) => { const Icon = categoryIcons[category] ?? PackageSearch; return <Link href={`${href}#product-grid`} key={_id}><span><Icon aria-hidden="true" />{label}</span><ArrowRight aria-hidden="true" /></Link>; })}</div></div></div></section>;
}
