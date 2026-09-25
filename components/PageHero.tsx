export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-hero-gradient">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-cream-50 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-200 sm:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
