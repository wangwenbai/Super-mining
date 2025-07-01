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

    howToGetStarted: `
How to Get Started
It’s easy to begin:

Create or connect your account

Follow the setup instructions

Start using all features right away

Need help? Just reply here, and we’ll guide you step by step.
`,

    learnAboutTheProject: `
About the Project
This project provides secure, transparent tools for managing crypto activities.

You can explore features, check real-time updates, and see how it works before getting started.

If you have questions, feel free to ask.
`,

    latestOffers: "This is our website.",
    fallback: "🙏 Thank you for your message. You can contact us by clicking the blue menu button on the far left of the input box. If this is not your target language, please use Telegram translation."
  },
  inlineButtons: {
    start: [
      [
        { text: "Join Now", url: "" },
        { text: "Customer Support", url: "" }
      ]
    ],
    joinNow: [
      [
        { text: "Join Now", url: "" },
        { text: "Customer Service", url: "" }
      ]
    ],
    customerSupport: [
      [
        { text: "Latest Events", url: "" },
        { text: "Contact Us", url: "" }
      ]
    ],
    howToGetStarted: [
      [
        { text: "Contact Us", url: "" },
        { text: "Learn more", url: "" }
      ]
    ],
    learnAboutTheProject: [
      [
        { text: "More Information", url: "" },
        { text: "Join Now", url: "" }
      ]
    ]
  },
  replyButtons: [
    ["Join Now", "Customer Support"],
    ["How to get started"],
    ["Learn about the project"]
  ]
};
