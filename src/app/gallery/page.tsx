import { SectionTitle } from "@/components/shared/section-title";

const images = [
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1442975631115-c4f7b05b4a2c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1497935586047-9392fcfdbeb8?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1000&q=80",
];

export default function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle title="Gallery" subtitle="Inside DJ Coffee: warm tones, crafted drinks, and premium moments." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt="DJ Coffee gallery"
            className="h-64 w-full rounded-2xl object-cover"
          />
        ))}
      </div>
    </div>
  );
}
