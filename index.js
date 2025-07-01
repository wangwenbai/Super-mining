require("dotenv").config();
const { Bot } = require("grammy");
const express = require("express");
const config = require("./config");

const app = express();
const bot = new Bot(process.env.BOT_TOKEN);

async function sendPhotoOrText(ctx, photoUrl, text, inlineKeyboard = null, replyKeyboard = null) {
  const isImageUrl = typeof photoUrl === "string" && photoUrl.match(/^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/i);

  if (isImageUrl) {
    await ctx.replyWithPhoto(photoUrl, {
      caption: text,
      parse_mode: "Markdown",
      reply_markup: inlineKeyboard ? { inline_keyboard: inlineKeyboard } : undefined,
    });
  } else {
    await ctx.reply(text, {
      parse_mode: "Markdown",
      reply_markup: replyKeyboard
        ? { keyboard: replyKeyboard.map(row => row.map(btn => ({ text: btn }))), resize_keyboard: true }
        : inlineKeyboard ? { inline_keyboard: inlineKeyboard } : undefined,
    });
  }
}

bot.command("start", async (ctx) => {
  await sendPhotoOrText(
    ctx,
    config.images.start,
    config.texts.welcome,
    config.inlineButtons.start,
    config.replyButtons
  );
});

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.trim().toLowerCase();
  const matchedKey = Object.keys(config.texts).find(
    key => key.toLowerCase() === text
  );

  if (matchedKey) {
    await sendPhotoOrText(
      ctx,
      config.images[matchedKey],
      config.texts[matchedKey],
      config.inlineButtons[matchedKey] || null
    );
  } else {
    await ctx.reply(config.texts.fallback);
  }
});

bot.start();
console.log("🤖 Bot is running...");

app.get("/", (_, res) => res.send("Bot is alive!"));
app.listen(process.env.PORT || 3000, () => {
  console.log(`🌐 Web server running`);
});
