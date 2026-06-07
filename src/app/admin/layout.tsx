import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getAuthSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 md:grid-cols-[240px_1fr] md:px-6">
      <AdminSidebar />
      <div>{children}</div>
    </div>
  );
}
