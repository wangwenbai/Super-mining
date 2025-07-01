require("dotenv").config();
const { Bot } = require("grammy");
const express = require("express");
const config = require("./config");

const app = express();
const bot = new Bot(process.env.BOT_TOKEN);

async function sendPhotoOrText(ctx, photoUrl, text, inlineKeyboard = null, replyKeyboard = null) {
  // 过滤掉 URL 为空的按钮，且过滤空行
  const filteredInlineKeyboard = inlineKeyboard
    ? inlineKeyboard
        .map(row => row.filter(button => button.url && button.url.trim() !== ""))
        .filter(row => row.length > 0)
    : null;

  const hasValidInlineButtons = filteredInlineKeyboard && filteredInlineKeyboard.length > 0;

  const isImageUrl =
    typeof photoUrl === "string" && photoUrl.match(/^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/i);

  if (isImageUrl) {
    await ctx.replyWithPhoto(photoUrl, {
      caption: text,
      parse_mode: "Markdown",
      reply_markup: hasValidInlineButtons ? { inline_keyboard: filteredInlineKeyboard } : undefined,
    });
  } else {
    await ctx.reply(text, {
      parse_mode: "Markdown",
      reply_markup: replyKeyboard
        ? {
            keyboard: replyKeyboard.map(row => row.map(text => ({ text }))),
            resize_keyboard: true,
            one_time_keyboard: false,
          }
        : hasValidInlineButtons
        ? { inline_keyboard: filteredInlineKeyboard }
        : undefined,
    });
  }
}

bot.command("start", async (ctx) => {
  await sendPhotoOrText(
    ctx,
    config.images.start,
    config.texts.start,
    config.inlineButtons.start,
    config.replyButtons
  );
});

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.trim();
  const key = config.buttonToKeyMap[text];

  if (key && config.texts[key]) {
    await sendPhotoOrText(
      ctx,
      config.images[key],
      config.texts[key],
      config.inlineButtons[key] || null,
      config.replyButtons
    );
  } else {
    await ctx.reply(config.texts.fallback, {
      reply_markup: {
        keyboard: config.replyButtons.map(row => row.map(btn => ({ text: btn }))),
        resize_keyboard: true,
      },
    });
  }
});

bot.start();
console.log("🤖 Bot is running...");

app.get("/", (_, res) => {
  res.send("Bot is alive!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🌐 Web server running on port ${port}`);
});
