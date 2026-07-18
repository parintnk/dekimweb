"use client";

import { usePathname } from "next/navigation";

// ponytail: the admin area shares the root layout — this strips the public chrome
// (navbar/footer/floating CTAs) there instead of restructuring into route groups.
export default function HideOnAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
