import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedItems } from "@/data/menu";

const HIGHLIGHTS = [
  { title: "Cà phê nguyên chất", desc: "Rang xay thủ công, giữ trọn hương vị truyền thống." },
  { title: "Không gian hoài niệm", desc: "Kiến trúc gỗ mộc mạc giữa núi đồi Đà Lạt." },
  { title: "View thung lũng mây", desc: "Ngắm mây trôi và hoàng hôn từ sân vườn cao nguyên." },
  { title: "Địa điểm check-in", desc: "Góc chụp ảnh đẹp cho mọi khung giờ trong ngày." },
];

export default function HomePage() {
  const featured = getFeaturedItems();

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
              Cà phê Miền ký ức
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-cream-50 sm:text-5xl">
              Nơi những kỷ niệm
              <br /> được đánh thức
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-200 sm:text-base">
              Giữa thung lũng mây Đà Lạt, quán mang đến không gian hoài niệm ấm áp cùng
              hương vị cà phê nguyên chất — nơi mỗi tách cà phê là một câu chuyện.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="rounded-full bg-maroon-600 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-maroon-700"
              >
                Khám phá menu
              </Link>
              <Link
                href="/dat-ban"
                className="rounded-full border border-cream-100/40 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-cream-50/10"
              >
                Đặt bàn ngay
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-cream-50/15 bg-cream-50/10 p-4 backdrop-blur-sm"
              >
                <h3 className="font-serif text-sm font-semibold text-cream-50">{h.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-cream-200">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon-600">
              Được yêu thích nhất
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-brown-900 sm:text-3xl">
              Đồ uống nổi bật
            </h2>
          </div>
          <Link href="/menu" className="text-sm font-semibold text-maroon-600 hover:text-maroon-700">
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-brown-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Về chúng tôi
          </p>
          <h2 className="max-w-2xl font-serif text-2xl font-semibold text-cream-50 sm:text-3xl">
            Cà phê Miền ký ức không chỉ là một quán cà phê, mà là nơi lưu giữ những khoảnh
            khắc đẹp
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-cream-200">
            Chúng tôi mong muốn mang đến cho bạn những trải nghiệm bình yên giữa thiên nhiên,
            nơi mỗi lần ghé thăm đều trở thành một kỷ niệm đáng nhớ.
          </p>
          <Link
            href="/gioi-thieu"
            className="rounded-full bg-maroon-600 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-maroon-700"
          >
            Tìm hiểu thêm
          </Link>
        </div>
      </section>
    </>
  );
}
