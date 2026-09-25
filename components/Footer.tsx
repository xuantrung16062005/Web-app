import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-brown-100 bg-cream-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brown-700">
            Nơi những kỷ niệm được đánh thức — không gian cà phê giữa thung lũng mây, dành cho
            những khoảnh khắc lắng đọng.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold text-brown-900">Khám phá</h3>
          <ul className="mt-3 space-y-2 text-sm text-brown-700">
            <li><Link href="/menu" className="hover:text-maroon-600">Menu</Link></li>
            <li><Link href="/khong-gian" className="hover:text-maroon-600">Không gian quán</Link></li>
            <li><Link href="/su-kien" className="hover:text-maroon-600">Sự kiện</Link></li>
            <li><Link href="/dat-ban" className="hover:text-maroon-600">Đặt bàn</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold text-brown-900">Liên hệ</h3>
          <ul className="mt-3 space-y-2 text-sm text-brown-700">
            <li>Thôn Trại Mát, Đà Lạt, Lâm Đồng</li>
            <li>Giờ mở cửa: 06:00 - 21:00</li>
            <li>Điện thoại: 0123 456 789</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brown-100 px-4 py-4 text-center text-xs text-brown-500 sm:px-6">
        © {new Date().getFullYear()} Cà phê Miền ký ức. All rights reserved.
      </div>
    </footer>
  );
}
