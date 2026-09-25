import { PageHero } from "@/components/PageHero";

const SPACES = [
  { title: "Khu ngoài trời", desc: "Sân vườn giữa thiên nhiên, đón nắng sớm và gió mát." },
  { title: "Khu trong nhà", desc: "Không gian gỗ ấm cúng, phù hợp làm việc và trò chuyện." },
  { title: "View thung lũng mây", desc: "Tầm nhìn thoáng đãng ra thung lũng và núi đồi." },
  { title: "Góc check-in", desc: "Những góc nhỏ xinh được decor tỉ mỉ cho bức ảnh đẹp." },
  { title: "Khu vực riêng tư", desc: "Bàn ghế tách biệt, phù hợp họp nhóm hoặc gặp gỡ." },
  { title: "Sân thượng hoàng hôn", desc: "Vị trí lý tưởng để ngắm hoàng hôn buông xuống núi đồi." },
];

export default function SpacePage() {
  return (
    <>
      <PageHero
        eyebrow="Không gian"
        title="Không gian quán"
        description="Mỗi góc nhỏ tại Cà phê Miền ký ức đều được chăm chút để lưu giữ những khoảnh khắc đẹp."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SPACES.map((space) => (
            <div
              key={space.title}
              className="flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-panel-gradient p-4 text-cream-50"
            >
              <h3 className="font-serif text-base font-semibold">{space.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-cream-200">{space.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
