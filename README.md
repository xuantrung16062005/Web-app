# Cà phê Miền ký ức

Website cho quán cà phê "Cà phê Miền ký ức" — xây bằng Next.js (App Router) + TypeScript +
Tailwind CSS, dữ liệu đặt bàn/đặt món lưu bằng SQLite (`better-sqlite3`).

## Tính năng

- Trang chủ, Giới thiệu, Menu (lọc theo danh mục), Không gian, Sự kiện, Liên hệ.
- Đặt bàn (form khách, không cần tài khoản) → lưu vào SQLite.
- Đặt món: thêm vào giỏ hàng (lưu `localStorage`) → thanh toán (thanh toán tại quầy) → lưu vào
  SQLite.
- Trang `/admin` xem danh sách đặt bàn & đơn hàng, bảo vệ bằng mật khẩu đơn giản
  (biến môi trường `ADMIN_PASSWORD`), không có hệ thống tài khoản nhiều người dùng.

## Chạy thử ở máy local

```bash
npm install
cp .env.example .env.local   # rồi sửa ADMIN_PASSWORD
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

Server chạy ở cổng mặc định `3000` (đổi bằng biến môi trường `PORT` nếu cần).

## Biến môi trường

| Biến             | Mô tả                                           |
|------------------|--------------------------------------------------|
| `ADMIN_PASSWORD` | Mật khẩu đăng nhập trang `/admin`. Bắt buộc.      |

## Dữ liệu

Đặt bàn/đơn hàng được lưu trong file SQLite tại `var/app.db` (tự tạo khi chạy lần đầu).
Thư mục `var/` đã được thêm vào `.gitignore` — **không commit file database lên Git**. (Không
nhầm với `data/menu.ts` — đó là dữ liệu thực đơn tĩnh nằm trong source code, luôn được commit.)

## Deploy lên Hostinger

Xem hướng dẫn chi tiết tại [DEPLOY-HOSTINGER.md](./DEPLOY-HOSTINGER.md).
