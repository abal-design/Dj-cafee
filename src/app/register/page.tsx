import Link from "next/link";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-16">
      <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-2xl font-semibold">Register</h1>
        <RegisterForm />
        <p className="mt-4 text-sm text-zinc-600">
          Already have account? <Link href="/login" className="text-amber-700">Login</Link>
        </p>
      </div>
    </div>
  );
}
