# ✨ Essentia.ai – Turn PDFs into Summarized Reels with AI

Essentia.ai is a **SaaS web application** that converts PDF documents into short, AI-generated video summaries (reels). Designed for professionals, students, and content creators, it helps you transform dense content into engaging, digestible videos — ready to view or share.

---

## 🚀 Features

- 📄 **PDF Upload & Parsing** – Seamlessly extract content from uploaded PDF files.
- 🧠 **AI-Powered Summarization** – Generate concise and meaningful summaries using OpenAI.
- 🎬 **Reel Generation** – Convert summaries into short, text-based video reels.
- 🔐 **Secure Authentication** – User login and session management using modern auth practices.
- 💳 **Razorpay Integration** – Manage billing and subscriptions with Razorpay.
- 🌐 **SaaS-Ready Architecture** – Built for multi-user environments and scalable deployments.

---

## 🛠️ Tech Stack

| Layer      | Technologies Used                                |
|------------|--------------------------------------------------|
| Frontend   | `Next.js`, `Tailwind CSS`, `TypeScript`          |
| Backend    | `Node.js`, `Next.js API Routes`                  |
| Auth       | `NextAuth.js` / `JWT`                            |
| Payments   | `Razorpay`                                       |
| AI         | `Gemini API` for summarization                   |
| Video      | `FFmpeg` or browser-based rendering (text only)  |

---

## 📦 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/essentia.ai.git
cd essentia.ai
npm install
npm run dev
