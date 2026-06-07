import { ContactForm } from "@/components/forms/contact-form";
import { SectionTitle } from "@/components/shared/section-title";
import { businessInfo } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle title="Contact Us" subtitle="Reach DJ Coffee for reservations, takeaway support, and general inquiries." />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6">
          <p><strong>Address:</strong> {businessInfo.address}</p>
          <p><strong>Phone:</strong> {businessInfo.phone}</p>
          <p><strong>Hours:</strong> {businessInfo.hours}</p>
          <div className="h-56 rounded-xl border border-zinc-200 bg-zinc-100 p-4 text-sm text-zinc-500">
            Map placeholder: Embed Google Maps iframe for production deployment.
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
