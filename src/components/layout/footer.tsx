import { businessInfo } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-amber-100 bg-[#1b120f] text-amber-100">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="text-xl font-semibold">DJ Coffee</h3>
          <p className="mt-3 text-sm text-amber-100/80">
            A premium, cozy coffee experience in Letang with dine-in elegance and takeaway convenience.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Visit Us</h4>
          <p className="mt-3 text-sm text-amber-100/80">{businessInfo.address}</p>
        </div>
        <div>
          <h4 className="font-medium">Contact</h4>
          <p className="mt-3 text-sm text-amber-100/80">Phone: {businessInfo.phone}</p>
          <p className="text-sm text-amber-100/80">{businessInfo.hours}</p>
        </div>
      </div>
      <div className="border-t border-amber-100/10 py-4 text-center text-xs text-amber-100/70">
        © {new Date().getFullYear()} DJ Coffee. All rights reserved.
      </div>
    </footer>
  );
}
