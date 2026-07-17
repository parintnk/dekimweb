// ponytail: one header for every subpage — same eyebrow + Playfair h1 rhythm as the home sections.
export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
          <span className="h-px w-8 bg-gold" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-body sm:text-base sm:leading-8">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
