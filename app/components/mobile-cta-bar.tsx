import Link from "next/link";
import { LINE_URL, externalLink } from "../contact";

// ponytail: lived inside HeroMobile before — moved to layout so every page keeps the booking bar.
// The max() padding clears the iOS home indicator; flat padding sits under it.
export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <Link
        href={LINE_URL}
        {...externalLink}
        className="shimmer-gold flex h-13 items-center justify-center rounded-full text-sm font-semibold text-navy shadow-lg shadow-[#b8912f]/30 transition-transform duration-200 active:scale-[0.98]"
      >
        จองคิวผ่านไลน์
      </Link>
    </div>
  );
}
