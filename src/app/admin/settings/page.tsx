"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    cafeName: "DJ Coffee",
    phone: "986-0984547",
    address: "PGQ3+M36, Kanepokhari - Letang Road, Letang 56600, Nepal",
    openingHours: "Open, closes at 8 PM",
    heroTitle: "Luxury Coffee Moments In Letang",
    heroSubtitle: "Crafted drinks, premium comfort food, and warm cafe atmosphere.",
    aboutText: "DJ Coffee blends modern elegance with local warmth in Letang.",
  });

  async function saveSettings() {
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) toast.success("Settings updated");
    else toast.error("Update failed");
  }

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6">
      <h1 className="text-3xl font-semibold">Site Settings</h1>
      <div className="grid gap-3 md:grid-cols-2">
        <Input value={form.cafeName} onChange={(e) => setForm((prev) => ({ ...prev, cafeName: e.target.value }))} placeholder="Cafe name" />
        <Input value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} placeholder="Phone" />
        <Input value={form.address} onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))} placeholder="Address" className="md:col-span-2" />
        <Input value={form.openingHours} onChange={(e) => setForm((prev) => ({ ...prev, openingHours: e.target.value }))} placeholder="Opening hours" className="md:col-span-2" />
        <Input value={form.heroTitle} onChange={(e) => setForm((prev) => ({ ...prev, heroTitle: e.target.value }))} placeholder="Hero title" className="md:col-span-2" />
        <Textarea value={form.heroSubtitle} onChange={(e) => setForm((prev) => ({ ...prev, heroSubtitle: e.target.value }))} placeholder="Hero subtitle" className="md:col-span-2" />
        <Textarea value={form.aboutText} onChange={(e) => setForm((prev) => ({ ...prev, aboutText: e.target.value }))} placeholder="About text" className="md:col-span-2" />
      </div>
      <Button onClick={saveSettings}>Save Settings</Button>
    </div>
  );
}
