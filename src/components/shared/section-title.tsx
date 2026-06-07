export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-zinc-600">{subtitle}</p> : null}
    </div>
  );
}
