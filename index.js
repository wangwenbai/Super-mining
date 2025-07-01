require("dotenv").config();
const { Bot } = require("grammy");
const express = require("express");
const config = require("./config");

const app = express();
const bot = new Bot(process.env.BOT_TOKEN);

// 工具函数：根据URL过滤内联按钮
function filterInlineButtons(buttonRows) {
  if (!buttonRows) return null;
  const filtered = buttonRows
    .map(row => row.filter(btn => btn.url && btn.url.trim() !== ""))
    .filter(row => row.length > 0);
  return filtered.length > 0 ? filtered : null;
}

// 统一发送文本或图片（智能优先：reply > inline > 无）
async function sendPhotoOrText(ctx, photoUrl, text, inlineKeyboard = null, replyKeyboard = null) {
  const isImageUrl =
    typeof photoUrl === "string" &&
    photoUrl.match(/^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/i);

  const filteredInline = filterInlineButtons(inlineKeyboard);

  // 智能判断优先级
  let replyMarkup = undefined;
  if (replyKeyboard && Array.isArray(replyKeyboard) && replyKeyboard.length > 0) {
    replyMarkup = {
      keyboard: replyKeyboard.map(row => row.map(text => ({ text }))),
      resize_keyboard: true,
    };
  } else if (filteredInline) {
    replyMarkup = {
      inline_keyboard: filteredInline,
    };
  }

  if (isImageUrl) {
    await ctx.replyWithPhoto(photoUrl, {
      caption: text,
      parse_mode: "Markdown",
      reply_markup: replyMarkup,
    });
  } else {
    await ctx.reply(text, {
      parse_mode: "Markdown",
      reply_markup: replyMarkup,
    });
  }
}

// /start 命令
bot.command("start", async (ctx) => {
  await sendPhotoOrText(
    ctx,
    config.images.start,
    config.texts.start,
    config.inlineButtons.start,
    config.replyButtons
  );
});

// 处理快捷按钮文本
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.trim();
  const key = config.buttonToKeyMap[text];

  if (key && config.texts[key]) {
    await sendPhotoOrText(
      ctx,
      config.images[key],
      config.texts[key],
      config.inlineButtons[key] || null
      // 不传 replyKeyboard，这样点击快捷按钮会只显示内联按钮
    );
  } else {
    await ctx.reply(config.texts.fallback);
  }
});

// 启动 bot
bot.start();
console.log("🤖 Bot is running...");

// 简易 Express server（保活用）
app.get("/", (_, res) => res.send("Bot is alive!"));
app.listen(process.env.PORT || 3000, () => {
  console.log(`🌐 Web server running`);
});
