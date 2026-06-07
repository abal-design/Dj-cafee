import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getAuthSession();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: session!.user.id } });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h1 className="mb-4 text-2xl font-semibold">My Profile</h1>
      <div className="space-y-2 text-sm">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone ?? "-"}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}
