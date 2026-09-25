import { PageHero } from "@/components/PageHero";

const EVENTS = [
  {
    title: "Đêm nhạc acoustic",
    date: "Thứ 7, 27/09/2026",
    desc: "Giai điệu mộc mạc giữa không gian núi rừng, cùng ly cà phê ấm nóng.",
  },
  {
    title: "Workshop pha chế",
    date: "Chủ nhật, 04/10/2026",
    desc: "Học cách pha những ly cà phê đặc trưng cùng barista của quán.",
  },
  {
    title: "Ngắm bình minh trên mây",
    date: "Hàng ngày",
    desc: "Sân vườn mở cửa sớm để đón bình minh và biển mây bồng bềnh.",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sự kiện"
        title="Sự kiện tại quán"
        description="Những hoạt động thường xuyên được tổ chức để mang đến trải nghiệm trọn vẹn hơn."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {EVENTS.map((event) => (
            <article
              key={event.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-brown-100 bg-cream-50"
            >
              <div className="aspect-video bg-panel-gradient" />
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-maroon-600">
                  {event.date}
                </p>
                <h3 className="font-serif text-lg font-semibold text-brown-900">{event.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-brown-500">{event.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
