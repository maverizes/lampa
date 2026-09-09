import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, phone, email, message } = await request.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { error: "Переменные окружения Telegram не настроены" },
        { status: 500 },
      );
    }

    const text = `📬 *Новая заявка с сайта*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}\n✉️ *Email:* ${email || "Не указан"}\n💬 *Сообщение:* ${message || "Отсутствует"}`;

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Ошибка при отправке в Telegram" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
