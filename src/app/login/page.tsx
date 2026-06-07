import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-16">
      <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-2xl font-semibold">Login</h1>
        <LoginForm />
        <p className="mt-4 text-sm text-zinc-600">
          No account? <Link href="/register" className="text-amber-700">Create one</Link>
        </p>
      </div>
    </div>
  );
}
