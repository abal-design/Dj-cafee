import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ total?: string }>;
}) {
  const { total } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-600" />
      <h1 className="mt-4 text-3xl font-semibold">Order Confirmed</h1>
      <p className="mt-2 text-zinc-600">Thank you for ordering from DJ Coffee.</p>
      {total ? <p className="mt-2 text-lg font-medium">Estimated Total: Rs {Number(total).toFixed(2)}</p> : null}
      <div className="mt-6 flex gap-3">
        <Link href="/menu"><Button>Back to Menu</Button></Link>
        <Link href="/dashboard/orders"><Button variant="outline">View My Orders</Button></Link>
      </div>
    </div>
  );
}
