import { PageHero } from "@/components/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Liên hệ"
        title="Ghé thăm chúng tôi"
        description="Rất mong được đón tiếp bạn tại Cà phê Miền ký ức."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <InfoRow label="Địa chỉ" value="Thôn Trại Mát, Đà Lạt, Lâm Đồng" />
          <InfoRow label="Giờ mở cửa" value="06:00 - 21:00 (tất cả các ngày)" />
          <InfoRow label="Điện thoại" value="0123 456 789" />
          <InfoRow label="Email" value="lienhe@caphemienkyuc.vn" />
        </div>

        <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-brown-100 bg-panel-gradient text-center text-cream-100">
          <p className="max-w-xs text-sm">
            Bản đồ minh họa — thay bằng nhúng Google Maps thực tế của quán khi có địa chỉ chính
            thức.
          </p>
        </div>
      </section>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-brown-100 bg-cream-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-maroon-600">{label}</p>
      <p className="mt-1 text-sm text-brown-900">{value}</p>
    </div>
  );
}
