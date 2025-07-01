require("dotenv").config();
const { Bot } = require("grammy");
const express = require("express");
const app = express();

const config = require("./config");

const bot = new Bot(process.env.BOT_TOKEN);

async function sendPhotoOrText(ctx, photoUrl, text, inlineKeyboard = null, replyKeyboard = null) {
  const isImageUrl =
    typeof photoUrl === "string" &&
    photoUrl.startsWith("http") &&
    /\.(jpe?g|png|gif|webp)$/i.test(photoUrl);

  if (isImageUrl) {
    await ctx.replyWithPhoto(photoUrl, {
      caption: text.slice(0, 1024),
      parse_mode: "Markdown",
      reply_markup: inlineKeyboard ? { inline_keyboard: inlineKeyboard } : undefined,
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
    config.images.start || "",
    config.texts.welcome || "Welcome!",
    config.inlineButtons.start || null,
    config.replyButtons || null
  );
});

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;

  if (text === "Join Now") {
    await sendPhotoOrText(
      ctx,
      config.images.joinNow || "",
      config.texts.joinNow || "",
      config.inlineButtons.joinNow || null
    );
  } else if (text === "Customer Support") {
    await sendPhotoOrText(
      ctx,
      config.images.customerSupport || "",
      config.texts.customerSupport || "",
      config.inlineButtons.customerSupport || null
    );
  } else if (text === "How to get started") {
    const allText = `${config.texts.howToGetStartedShort || ""}\n\n${config.texts.howToGetStartedLong || ""}`;
    await sendPhotoOrText(
      ctx,
      config.images.howToGetStarted || "",
      allText,
      config.inlineButtons.howToGetStarted || null
    );
  } else if (text === "Latest Offers") {
    await sendPhotoOrText(
      ctx,
      config.images.latestOffers || "",
      config.texts.latestOffers || "",
      config.inlineButtons.latestOffers || null
    );
  } else {
    await ctx.reply(config.texts.fallback || "Thank you for your message.");
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
