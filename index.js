require("dotenv").config();
const { Bot } = require("grammy");
const express = require("express");
const app = express();

const bot = new Bot(process.env.BOT_TOKEN);

const images = {
  start: "https://i.imgur.com/yUP6USH.jpeg",
  joinNow: "https://i.imgur.com/yUP6USH.jpeg",
  customerSupport: "https://i.imgur.com/yUP6USH.jpeg",
  howToGetStarted: "https://i.imgur.com/yUP6USH.jpeg",
  latestOffers: "https://i.imgur.com/yUP6USH.jpeg"
};

async function sendPhotoOrText(ctx, photoUrl, text, inlineKeyboard = null, replyKeyboard = null) {
  const isImageUrl =
    typeof photoUrl === "string" &&
    photoUrl.startsWith("http") &&
    /\.(jpe?g|png|gif|webp)$/i.test(photoUrl);

  if (isImageUrl) {
    await ctx.replyWithPhoto(photoUrl, {
      caption: text.slice(0, 1024),
      parse_mode: "Markdown",
      reply_markup: inlineKeyboard
        ? { inline_keyboard: inlineKeyboard }
        : undefined,
    });
  } else {
    await ctx.reply(text.slice(0, 4096), {
      parse_mode: "Markdown",
      reply_markup:
        replyKeyboard
          ? {
              keyboard: replyKeyboard,
              resize_keyboard: true,
              one_time_keyboard: false,
            }
          : inlineKeyboard
            ? { inline_keyboard: inlineKeyboard }
            : undefined,
    });
  }
}

bot.command("start", async (ctx) => {
  await sendPhotoOrText(
    ctx,
    images.start,
    "Thank you for your interest.\n
Here’s what this bot can help you with:\n

Easy to get started, beginner friendly\n

100% transparent system\n

Real-time updates and notifications\n

Compatible with major crypto wallets\n

24/7 automated support\n

Feel free to explore or ask any questions.",
    [
      [
        { text: "Join Now", url: "" },
        { text: "Customer Support", url: "" }
      ]
    ],
    [
      ["Join Now", "Customer Support"],
      ["How to get started"],
      ["Learn about the project"]
    ]
  );
});

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;

  if (text === "Join Now") {
    await sendPhotoOrText(
      ctx,
      images.joinNow,
      "Welcome!\n
You’ve joined successfully.\n

This bot helps you:\n

Get started easily\n

Access a 100% transparent system\n

Receive real-time updates\n

Use major crypto wallets\n

Enjoy 24/7 automated support\n

Feel free to explore and reach out if you need any help.",
      [
        [
          { text: "Join Now", url: "" },
          { text: "Customer Service", url: "" }
        ]
      ]
    );
  } else if (text === "Customer Support") {
    await sendPhotoOrText(
      ctx,
      images.customerSupport,
      "Customer Support\n
Our team is here to help you.\n

Please share your question or issue, and we’ll assist you as soon as possible.\n

You can also check the FAQ for quick answers.",
      [
        [
          { text: "Latest Events", url: "" },
          { text: "Contact Us", url: "" }
        ]
      ]
    );
  } else if (text === "How to get started") {
    const shortIntro =
      "How to Get Startedt\n
It’s easy to begin:t\n

Create or connect your accountt\n

Follow the setup instructionst\n

Start using all features right awayt\n

Need help? Just reply here, and we’ll guide you step by step.";
    const longText = `In order to ensure the asset security and operational freedom of each user, provides a fast and convenient multi-chain USDT withdrawal mechanism, supporting the following three main on-chain methods:\n\n💸 Supported withdrawal methods:\nBEP20‑USDT (BNB chain) - A small amount of BNB is required in the wallet as a network fee\nERC20‑USDT (Ethereum chain) - ETH is required\nPolygon‑USDT (Polygon chain) - POL is required\n\n🔐 To ensure smooth withdrawal, please prepare enough handling fee tokens for the corresponding chain in advance. This platform does not deduct handling fees.\n\n💡 Withdrawal instructions:\n– Minimum withdrawal amount: 1USDT\n– Only one withdrawal per day\n– The number of withdrawals is reset at 00:00 (Singapore time, GMT+8) every day\n\n✅ Truth and transparency: All withdrawal records can be checked on the chain\n✅ Fast arrival: Automatic processing, completed in 3-9 seconds, and efficient for large amounts\n✅ Global applicability: Supports multiple chains, compatible with mainstream wallets and exchanges\n🎯 Make every asset trustworthy and every withdrawal worth worrying about.`;

    const allText = `${shortIntro}\n\n${longText}`;

    await sendPhotoOrText(
      ctx,
      images.howToGetStarted,
      allText,
      [
        [
          { text: "Contact Us", url: "" },
          { text: "Learn more", url: "" }
        ]
      ]
    );
  } else if (text === "Learn about the project") {
    await sendPhotoOrText(
      ctx,
      images.Learn about the project,
      "About the Project\n
This project provides secure, transparent tools for managing crypto activities.\n

You can explore features, check real-time updates, and see how it works before getting started.\n

If you have questions, feel free to ask.",
      [
        [
          { text: "More Information", url: "" },
          { text: "Join Now", url: "" }
        ]
      ]
    );
  } else {
    await ctx.reply(
      "🙏 Thank you for your message. You can contact us by clicking the blue menu button on the far left of the input box. If this is not your target language, please use Telegram translation."
    );
  }
});

bot.start();
console.log("🤖 Bot is running...");

app.get("/", (req, res) => {
  res.send("Bot is alive!");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🌐 Web server running on port ${port}`);
});
