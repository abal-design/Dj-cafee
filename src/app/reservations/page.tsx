import { ReservationForm } from "@/components/forms/reservation-form";
import { SectionTitle } from "@/components/shared/section-title";

export default function ReservationPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6">
      <SectionTitle title="Reserve A Table" subtitle="Book your dining experience at DJ Coffee." />
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <ReservationForm />
      </div>
    </div>
  );
}
