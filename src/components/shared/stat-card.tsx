import { Card } from "@/components/ui/card";

export function StatCard({ title, value, subtext }: { title: string; value: string; subtext?: string }) {
  return (
    <Card>
      <p className="text-sm text-zinc-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-900">{value}</p>
      {subtext ? <p className="mt-1 text-xs text-zinc-500">{subtext}</p> : null}
    </Card>
  );
}
