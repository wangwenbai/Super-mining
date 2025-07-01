// config.js
module.exports = {
  images: {
    start: "",
    joinNow: "https://i.imgur.com/yUP6USH.jpeg",
    customerSupport: "https://i.imgur.com/yUP6USH.jpeg",
    howToGetStarted: "",
    latestOffers: ""
  },
  texts: {
    welcome: `
Thank you for your interest.
Here’s what this bot can help you with:

Easy to get started, beginner friendly

100% transparent system

Real-time updates and notifications

Compatible with major crypto wallets

24/7 automated support

Feel free to explore or ask any questions.
`,

    joinNow: `
Welcome!
You’ve joined successfully.

This bot helps you:

Get started easily

Access a 100% transparent system

Receive real-time updates

Use major crypto wallets

Enjoy 24/7 automated support

Feel free to explore and reach out if you need any help.
`,

    customerSupport: `
Customer Support
Our team is here to help you.

Please share your question or issue, and we’ll assist you as soon as possible.

You can also check the FAQ for quick answers.
`,

    howToGetStartedShort: `
How to Get Started
It’s easy to begin:

Create or connect your account

Follow the setup instructions

Start using all features right away

Need help? Just reply here, and we’ll guide you step by step.
`,

    howToGetStartedLong: `
In order to ensure the asset security and operational freedom of each user, provides a fast and convenient multi-chain USDT withdrawal mechanism, supporting the following three main on-chain methods:

💸 Supported withdrawal methods:
BEP20‑USDT (BNB chain) - A small amount of BNB is required in the wallet as a network fee
ERC20‑USDT (Ethereum chain) - ETH is required
Polygon‑USDT (Polygon chain) - POL is required

🔐 To ensure smooth withdrawal, please prepare enough handling fee tokens for the corresponding chain in advance. This platform does not deduct handling fees.

💡 Withdrawal instructions:
– Minimum withdrawal amount: 1USDT
– Only one withdrawal per day
– The number of withdrawals is reset at 00:00 (Singapore time, GMT+8) every day

✅ Truth and transparency: All withdrawal records can be checked on the chain
✅ Fast arrival: Automatic processing, completed in 3-9 seconds, and efficient for large amounts
✅ Global applicability: Supports multiple chains, compatible with mainstream wallets and exchanges
🎯 Make every asset trustworthy and every withdrawal worth worrying about.
`,

    latestOffers: "This is our website.",
    fallback: "🙏 Thank you for your message. You can contact us by clicking the blue menu button on the far left of the input box. If this is not your target language, please use Telegram translation."
  },
  inlineButtons: {
    start: [
      [
        { text: "Join Now", url: "https://example.com/products" },
        { text: "Customer Support", url: "https://lihi3.com/LzrFj" }
      ]
    ],
    joinNow: [
      [
        { text: "Join Now", url: "https://example.com/products" },
        { text: "Customer Service", url: "https://lihi3.com/LzrFj" }
      ]
    ],
    customerSupport: [
      [
        { text: "Latest Events", url: "https://example.com/pricing" },
        { text: "Contact Us", url: "https://t.me/your_sales_bot" }
      ]
    ],
    howToGetStarted: [
      [
        { text: "Contact Us", url: "https://t.me/your_support_bot" },
        { text: "Learn more", url: "https://example.com/faq" }
      ]
    ],
    latestOffers: [
      [
        { text: "More Information", url: "https://maps.google.com" },
        { text: "Join Now", url: "https://example.com/hours" }
      ]
    ]
  },
  replyButtons: [
    ["Join Now", "Customer Support"],
    ["How to get started"],
    ["Learn about the project"]
  ]
};
