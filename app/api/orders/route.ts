import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { menuItems } from "@/data/menu";

interface OrderPayload {
  name: string;
  phone: string;
  fulfillment: "tai-quan" | "giao-tan-noi";
  address?: string;
  note?: string;
  items: { itemId: string; quantity: number }[];
}

export async function POST(req: NextRequest) {
  let body: OrderPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const { name, phone, fulfillment, address, note, items } = body;

  if (!name?.trim() || !phone?.trim() || !fulfillment || !items?.length) {
    return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin và chọn món." }, { status: 400 });
  }

  if (fulfillment === "giao-tan-noi" && !address?.trim()) {
    return NextResponse.json({ error: "Vui lòng nhập địa chỉ giao hàng." }, { status: 400 });
  }

  const resolvedItems = items
    .map((line) => {
      const menuItem = menuItems.find((m) => m.id === line.itemId);
      if (!menuItem || line.quantity <= 0) return null;
      return {
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: line.quantity,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (resolvedItems.length === 0) {
    return NextResponse.json({ error: "Giỏ hàng không hợp lệ." }, { status: 400 });
  }

  const total = resolvedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO orders (name, phone, fulfillment, address, note, items_json, total)
     VALUES (@name, @phone, @fulfillment, @address, @note, @itemsJson, @total)`
  );

  const result = stmt.run({
    name: name.trim(),
    phone: phone.trim(),
    fulfillment,
    address: address?.trim() || null,
    note: note?.trim() || null,
    itemsJson: JSON.stringify(resolvedItems),
    total,
  });

  return NextResponse.json({ id: result.lastInsertRowid, total }, { status: 201 });
}
