// ponytail: decorative-only backdrop — two soft glows, flipped side-to-side per section.
// The parent section must be `relative isolate overflow-hidden`; `isolate` is what lets
// -z-10 sit above the section's background instead of vanishing behind it.
export default function SectionBackdrop({ flip }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 select-none"
    >
      <div
        className={`glow absolute top-1/4 size-80 rounded-full bg-gold/10 blur-3xl ${
          flip ? "-right-24" : "-left-24"
        }`}
      />
      <div
        className={`glow absolute -bottom-28 size-96 rounded-full bg-brand/10 blur-3xl ${
          flip ? "left-1/4" : "right-1/4"
        }`}
      />
    </div>
  );
}
