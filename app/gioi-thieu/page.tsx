import { PageHero } from "@/components/PageHero";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Về chúng tôi"
        title="Cà phê Miền ký ức"
        description="Câu chuyện về một quán cà phê nhỏ giữa thung lũng mây Đà Lạt."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-6 text-sm leading-relaxed text-brown-700 sm:text-base">
          <p>
            Cà phê Miền ký ức ra đời từ mong muốn tạo nên một không gian mà mỗi vị khách ghé
            thăm đều tìm thấy sự bình yên — nơi thời gian như chậm lại giữa núi đồi và mây trời
            Đà Lạt.
          </p>
          <p>
            Không chỉ là một quán cà phê, chúng tôi mong muốn trở thành nơi lưu giữ những kỷ
            niệm đẹp: một buổi sáng ngắm mây, một chiều trò chuyện cùng bạn bè, hay đơn giản là
            khoảnh khắc riêng tư bên tách cà phê nguyên chất.
          </p>
          <p>
            Từng ly cà phê tại đây được pha chế từ hạt cà phê rang xay thủ công, giữ trọn hương
            vị truyền thống. Không gian quán được xây dựng từ gỗ mộc mạc, hòa quyện cùng thiên
            nhiên xung quanh, tạo nên một "miền ký ức" riêng cho mỗi người ghé thăm.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { title: "Thành lập", value: "2020" },
            { title: "Chỗ ngồi", value: "80+" },
            { title: "Loại đồ uống", value: "40+" },
          ].map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-brown-100 bg-cream-50 p-6 text-center"
            >
              <p className="font-serif text-2xl font-semibold text-maroon-600">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-brown-500">{stat.title}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
