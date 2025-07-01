// config.js
module.exports = {
  images: {
    start: "",
    joinNow: "",
    customerSupport: "",
    howToGetStarted: "",
    learnAboutTheProject: ""
  },
  texts: {
    welcome: `
Thank you for your interest.
Here’s what this bot can help you with:

✅ Easy to get started, beginner friendly
✅ 100% transparent system
✅ Real-time updates and notifications
✅ Compatible with major crypto wallets
✅ 24/7 automated support

Feel free to explore or ask any questions.
`,
    joinNow: `
Welcome!
You’ve joined successfully.

This bot helps you:

✅ Get started easily
✅ Access a 100% transparent system
✅ Receive real-time updates
✅ Use major crypto wallets
✅ Enjoy 24/7 automated support

Feel free to explore and reach out if you need any help.
`,
    customerSupport: `
Customer Support
Our team is here to help you.

Please share your question or issue, and we’ll assist you as soon as possible.

You can also check the FAQ for quick answers.
`,
    howToGetStarted: `
How to Get Started
It’s easy to begin:

1️⃣ Create or connect your account
2️⃣ Follow the setup instructions
3️⃣ Start using all features right away

Need help? Just reply here, and we’ll guide you step by step.
`,
    learnAboutTheProject: `
About the Project
This project provides secure, transparent tools for managing crypto activities.

You can explore features, check real-time updates, and see how it works before getting started.

If you have questions, feel free to ask.
`,
    fallback: `
🙏 Thank you for your message. You can contact us by clicking the blue menu button on the far left of the input box. If this is not your target language, please use Telegram translation.
`
  },
  inlineButtons: {
    start: [
      [
        { text: "Join Now", url: "https://example.com/products" },
        { text: "Customer Support", url: "https://example.com/support" }
      ]
    ],
    joinNow: [
      [
        { text: "View Plans", url: "https://example.com/plans" }
      ]
    ],
    customerSupport: [
      [
        { text: "Contact Us", url: "https://t.me/your_support_bot" }
      ]
    ],
    howToGetStarted: [
      [
        { text: "Learn More", url: "https://example.com/how-to" }
      ]
    ],
    learnAboutTheProject: [
      [
        { text: "More Information", url: "https://example.com/about" }
      ]
    ]
  },
  replyButtons: [
    ["Join Now", "Customer Support"],
    ["How to get started"],
    ["Learn about the project"]
  ]
};
