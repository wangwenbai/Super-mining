require("dotenv").config();
const { Bot } = require("grammy");
const express = require("express");
const app = express();

const bot = new Bot(process.env.BOT_TOKEN);

const images = {
  start: "",
  joinNow: "https://i.imgur.com/yUP6USH.jpeg",
  customerSupport: "https://i.imgur.com/yUP6USH.jpeg",
  howToGetStarted: "",
  latestOffers: "https://i.imgur.com/2v2mFnt.png"
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
    "DEFI Smart Mining\n📱 All you need is a mobile wallet to start smart mining!\n🔐 No transfer required - your USDT/USDC will remain in your wallet, 100% safe!\n💡 Easy to use | High yield | Funds under control!",
    [
      [
        { text: "Join Now", url: "https://example.com/products" },
        { text: "Customer Support", url: "https://lihi3.com/LzrFj" }
      ]
    ],
    [
      ["Join Now", "Customer Support"],
      ["How to get started"],
      ["Latest Offers"]
    ]
  );
});

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;

  if (text === "Join Now") {
    await sendPhotoOrText(
      ctx,
      images.joinNow,
      "Decentralized mining platform, transparent, open and trustworthy.\nSupports multiple public chains, USDT/USDC stablecoin guarantee.\n✅Own funds, zero lock-up, safe and worry-free.",
      [
        [
          { text: "Join Now", url: "https://example.com/products" },
          { text: "Customer Service", url: "https://lihi3.com/LzrFj" }
        ]
      ]
    );
  } else if (text === "Customer Support") {
    await sendPhotoOrText(
      ctx,
      images.customerSupport,
      "🔒 Own wallet, funds are always at hand\n⛏️ Interest is calculated hourly, and funds are credited to the account in real time\n💎 Support USDT/USDC stablecoins\n✅ Transparent dividends on multiple chains",
      [
        [
          { text: "Latest Events", url: "https://example.com/pricing" },
          { text: "Contact Us", url: "https://t.me/your_sales_bot" }
        ]
      ]
    );
  } else if (text === "How to get started") {
    const shortIntro =
      "🌍 The world's top automated mining network platform\n\nSafe and transparent · Global synchronization · Efficient withdrawal";
    const longText = `In order to ensure the asset security and operational freedom of each user, provides a fast and convenient multi-chain USDT withdrawal mechanism, supporting the following three main on-chain methods:\n\n💸 Supported withdrawal methods:\nBEP20‑USDT (BNB chain) - A small amount of BNB is required in the wallet as a network fee\nERC20‑USDT (Ethereum chain) - ETH is required\nPolygon‑USDT (Polygon chain) - POL is required\n\n🔐 To ensure smooth withdrawal, please prepare enough handling fee tokens for the corresponding chain in advance. This platform does not deduct handling fees.\n\n💡 Withdrawal instructions:\n– Minimum withdrawal amount: 1USDT\n– Only one withdrawal per day\n– The number of withdrawals is reset at 00:00 (Singapore time, GMT+8) every day\n\n✅ Truth and transparency: All withdrawal records can be checked on the chain\n✅ Fast arrival: Automatic processing, completed in 3-9 seconds, and efficient for large amounts\n✅ Global applicability: Supports multiple chains, compatible with mainstream wallets and exchanges\n🎯 Make every asset trustworthy and every withdrawal worth worrying about.`;

    const allText = `${shortIntro}\n\n${longText}`;

    await sendPhotoOrText(
      ctx,
      images.howToGetStarted,
      allText,
      [
        [
          { text: "Contact Us", url: "https://t.me/your_support_bot" },
          { text: "Learn more", url: "https://example.com/faq" }
        ]
      ]
    );
  } else if (text === "Latest Offers") {
    await sendPhotoOrText(
      ctx,
      images.latestOffers,
      "This is our website.",
      [
        [
          { text: "More Information", url: "https://maps.google.com" },
          { text: "Join Now", url: "https://example.com/hours" }
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
