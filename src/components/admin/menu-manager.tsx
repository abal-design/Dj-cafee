"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Category = { id: string; name: string };

type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  isFeatured: boolean;
  categoryId: string;
};

export function MenuManager({ categories, items }: { categories: Category[]; items: Item[] }) {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: categories[0]?.id ?? "",
  });

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(q));
  }, [items, search]);

  async function createItem() {
    const res = await fetch("/api/admin/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        isAvailable: true,
        isFeatured: false,
      }),
    });

    if (res.ok) {
      toast.success("Menu item created");
      window.location.reload();
    } else {
      toast.error("Create failed");
    }
  }

  async function toggleAvailability(item: Item) {
    const res = await fetch("/api/admin/menu", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, isAvailable: !item.isAvailable }),
    });

    if (res.ok) {
      toast.success("Availability updated");
      window.location.reload();
    } else {
      toast.error("Update failed");
    }
  }

  async function deleteItem(id: string) {
    const res = await fetch("/api/admin/menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      toast.success("Item deleted");
      window.location.reload();
    } else {
      toast.error("Delete failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Create Menu Item</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
          <Input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))} />
          <Input placeholder="Image URL" value={form.image} onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))} />
          <select value={form.categoryId} onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))} className="h-10 rounded-xl border border-zinc-300 px-3 text-sm">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <textarea className="min-h-20 rounded-xl border border-zinc-300 px-3 py-2 text-sm md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
          <Button onClick={createItem} type="button">Create Item</Button>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Manage Items</h2>
          <Input placeholder="Search item" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        </div>
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-xl border border-zinc-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-zinc-600">Rs {item.price.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toggleAvailability(item)}>
                    {item.isAvailable ? "Disable" : "Enable"}
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => deleteItem(item.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 ? <p className="text-sm text-zinc-500">No menu items match search.</p> : null}
        </div>
      </div>
    </div>
  );
}
