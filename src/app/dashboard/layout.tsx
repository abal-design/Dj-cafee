import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/customer/dashboard-sidebar";
import { getAuthSession } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();

  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 md:grid-cols-[240px_1fr] md:px-6">
      <DashboardSidebar />
      <div>{children}</div>
    </div>
  );
}
