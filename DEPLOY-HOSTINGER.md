# Hướng dẫn deploy lên Hostinger

Website này chạy bằng **Node.js server thật** (`next start`), không phải file tĩnh — vì có
API route (`/api/bookings`, `/api/orders`, `/api/admin/*`) và database SQLite. Vì vậy gói
Hostinger cần **hỗ trợ chạy ứng dụng Node.js**.

## 1. Chọn gói Hostinger phù hợp

- **Business / Cloud Hosting** (hoặc gói tương đương có mục "Setup Node.js App" trong hPanel) —
  chạy được app Node.js đơn giản, đủ dùng cho website này.
- **VPS Hostinger** — linh hoạt nhất, tự cài Node.js + PM2 + Nginx, phù hợp nếu traffic lớn hoặc
  cần toàn quyền cấu hình.
- Gói **Shared Hosting cơ bản** (Premium trở xuống, không có "Setup Node.js App") **không chạy
  được** trực tiếp — chỉ phù hợp cho file tĩnh HTML, không dùng được cho site này trừ khi nâng
  cấp gói.

Nếu chưa chắc gói hiện tại có hỗ trợ Node.js, vào **hPanel → Advanced → Setup Node.js App**
(hoặc tìm "Node.js" trong ô tìm kiếm hPanel). Nếu không thấy mục này, cần nâng cấp gói.

## 2A. Deploy qua hPanel (gói Business/Cloud có "Setup Node.js App")

1. Đăng nhập **hPanel** → **Advanced** → **Setup Node.js App** → **Create Application**.
2. Chọn phiên bản Node.js (khuyến nghị 20.x trở lên).
3. **Application root**: thư mục sẽ chứa code, ví dụ `caphe-mien-ky-uc`.
4. **Application startup file**: để trống hoặc trỏ vào `server.js` nếu Hostinger yêu cầu file
   khởi động riêng — với Next.js, cách đơn giản nhất là dùng **Startup command** (nếu hPanel hỗ
   trợ) là `npm start` (đã chạy `npm run build` trước đó).
5. Kéo code lên server bằng một trong hai cách:
   - **Git**: trong hPanel, dùng mục **Git** để kết nối repo
     `https://github.com/xuantrung16062005/Web-app` và trỏ vào nhánh `main`. Mỗi lần muốn cập
     nhật, bấm **Pull/Deploy** trong hPanel sau khi đã push code mới lên GitHub.
   - **SSH** (nếu gói có quyền SSH): `ssh` vào server rồi:
     ```bash
     cd ~/caphe-mien-ky-uc
     git clone https://github.com/xuantrung16062005/Web-app.git .
     # các lần sau: git pull
     ```
6. Trong giao diện Node.js App, mở phần **Run NPM Install** để cài dependencies, hoặc SSH vào
   chạy:
   ```bash
   npm install
   npm run build
   ```
7. Thêm **biến môi trường** trong hPanel (mục Environment variables của Node.js App):
   - `ADMIN_PASSWORD` = mật khẩu quản trị bạn chọn (đổi khác với giá trị mẫu trong
     `.env.example`).
8. Đặt **Application startup command** thành `npm start` (hoặc `next start`), rồi bấm
   **Restart** để khởi động ứng dụng.
9. Trỏ **domain/subdomain** của bạn vào Node.js App này trong phần cấu hình domain của hPanel.

## 2B. Deploy qua VPS Hostinger (SSH thủ công)

```bash
# Trên VPS
sudo apt update && sudo apt install -y nodejs npm git
sudo npm install -g pm2

git clone https://github.com/xuantrung16062005/Web-app.git
cd Web-app
npm install
echo "ADMIN_PASSWORD=doi-mat-khau-that-manh" > .env.local
npm run build

pm2 start npm --name "caphe-mien-ky-uc" -- start
pm2 save
pm2 startup   # làm theo hướng dẫn để app tự chạy lại khi VPS khởi động lại
```

Sau đó cấu hình **Nginx** làm reverse proxy trỏ domain vào `http://localhost:3000`, và cài SSL
miễn phí bằng `certbot`.

## 3. Cập nhật code sau khi sửa

```bash
# Trên máy local
git add .
git commit -m "Cập nhật nội dung"
git push origin main
```

Sau đó trên server: `git pull && npm install && npm run build && pm2 restart caphe-mien-ky-uc`
(VPS) hoặc bấm **Pull/Deploy** + **Restart** trong hPanel (Business/Cloud).

## Lưu ý quan trọng

- **Không commit file `var/app.db`** lên GitHub — đây là dữ liệu runtime, đã có trong
  `.gitignore`. Dữ liệu đặt bàn/đơn hàng sẽ được tạo mới trên server khi có lượt đặt đầu tiên.
- Vì database là file SQLite trên đĩa, **hãy sao lưu định kỳ** file `var/app.db` trên server
  (ví dụ copy về máy local hoặc cron job nén gửi qua email) để tránh mất dữ liệu.
- Đổi `ADMIN_PASSWORD` thành mật khẩu mạnh, khác với giá trị dùng khi phát triển local.
