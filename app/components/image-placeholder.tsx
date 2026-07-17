import { FiImage } from "react-icons/fi";

// ponytail: dashed border reads as "photo goes here on purpose" — the label tells the clinic
// exactly which shot to send. Swap the whole div for <Image> when it arrives.
export default function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink-body/25 bg-surface-3 text-ink-body/60 ${className}`}
    >
      <FiImage size={22} aria-hidden />
      <p className="px-4 text-center text-xs leading-5">{label}</p>
    </div>
  );
}
