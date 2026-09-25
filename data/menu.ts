export type MenuCategory = "ca-phe" | "tra" | "do-uong-da-xay" | "nuoc-ep" | "banh-ngot" | "do-an-nhe";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  description: string;
  featured?: boolean;
}

export const categories: { id: MenuCategory; label: string }[] = [
  { id: "ca-phe", label: "Cà phê" },
  { id: "tra", label: "Trà" },
  { id: "do-uong-da-xay", label: "Đồ uống đá xay" },
  { id: "nuoc-ep", label: "Nước ép" },
  { id: "banh-ngot", label: "Bánh ngọt" },
  { id: "do-an-nhe", label: "Đồ ăn nhẹ" },
];

export const menuItems: MenuItem[] = [
  { id: "ca-phe-sua-da", name: "Cà phê sữa đá", price: 45000, category: "ca-phe", description: "Cà phê phin nguyên chất, đậm đà vị truyền thống.", featured: true },
  { id: "ca-phe-muoi", name: "Cà phê muối", price: 50000, category: "ca-phe", description: "Lớp kem muối béo mịn hòa quyện cà phê đậm đà.", featured: true },
  { id: "americano", name: "Americano", price: 45000, category: "ca-phe", description: "Espresso pha loãng, vị nhẹ nhàng, dễ uống.", featured: true },
  { id: "latte", name: "Latte", price: 55000, category: "ca-phe", description: "Espresso hòa cùng sữa tươi đánh bông mịn màng.", featured: true },
  { id: "cappuccino", name: "Cappuccino", price: 55000, category: "ca-phe", description: "Lớp bọt sữa dày, thơm hương espresso đậm đà." },
  { id: "choco-nong", name: "Chocolate nóng", price: 50000, category: "ca-phe", description: "Socola nóng hổi, ngọt ngào ấm áp." },
  { id: "tra-dao-cam-sa", name: "Trà đào cam sả", price: 55000, category: "tra", description: "Vị chua ngọt hài hòa từ đào, cam và sả tươi.", featured: true },
  { id: "tra-vai-hoa-hong", name: "Trà vải hoa hồng", price: 55000, category: "tra", description: "Hương hoa hồng thanh nhẹ quyện vị vải ngọt mát." },
  { id: "matcha-latte", name: "Matcha latte", price: 55000, category: "tra", description: "Matcha Nhật Bản hòa cùng sữa tươi béo nhẹ.", featured: true },
  { id: "da-xay-caramel", name: "Đá xay caramel", price: 55000, category: "do-uong-da-xay", description: "Đá xay mịn, phủ sốt caramel béo ngậy." },
  { id: "soda-viet-quat", name: "Soda việt quất", price: 50000, category: "do-uong-da-xay", description: "Soda mát lạnh vị việt quất chua ngọt." },
  { id: "nuoc-ep-cam", name: "Nước ép cam", price: 40000, category: "nuoc-ep", description: "Cam tươi vắt nguyên chất, giàu vitamin C." },
  { id: "nuoc-ep-dua-hau", name: "Nước ép dưa hấu", price: 40000, category: "nuoc-ep", description: "Dưa hấu ép tươi mát lạnh, thanh nhiệt." },
  { id: "banh-tiramisu", name: "Bánh tiramisu", price: 60000, category: "banh-ngot", description: "Bánh tiramisu Ý truyền thống, mềm mịn tan trong miệng." },
  { id: "banh-croissant", name: "Bánh croissant bơ", price: 35000, category: "banh-ngot", description: "Croissant bơ giòn xốp, thơm lừng nướng mới mỗi ngày." },
  { id: "sandwich-ga", name: "Sandwich gà nướng", price: 45000, category: "do-an-nhe", description: "Sandwich gà nướng kèm rau tươi và sốt đặc biệt." },
  { id: "khoai-tay-chien", name: "Khoai tây chiên", price: 35000, category: "do-an-nhe", description: "Khoai tây chiên giòn rụm, ăn kèm sốt phô mai." },
];

export function getFeaturedItems(): MenuItem[] {
  return menuItems.filter((item) => item.featured);
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString("vi-VN")}đ`;
}
