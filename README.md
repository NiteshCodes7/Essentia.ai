# ✨ Essentia.ai – Turn PDFs into Summarized Reels with AI

Essentia.ai is a **SaaS web application** that converts PDF documents into short, AI-generated video summaries (reels). Designed for professionals, students, and content creators, it helps you transform dense content into engaging, digestible videos — ready to view or share.

---

## 🚀 Features

- 📄 **PDF Upload & Parsing** – Seamlessly extract content from uploaded PDF files using `uploadthing`.
- 🧠 **AI-Powered Summarization** – Generate concise and meaningful summaries using `Gemini API` and `LangChain`.
- 🎬 **Reel Generation** – Convert summaries into short, text-based video reels.
- 🔐 **Secure Authentication** – Session-based login with JWT and OAuth (Google/GitHub).
  - ✉️ OTP-based login, Forgot Password flow included.
- 💳 **Razorpay Subscription Billing** – Integrated Razorpay payment gateway for managing plans and subscriptions.
- 🌐 **SaaS-Ready Architecture** – Built for multi-user environments and scalable deployments.
- 💫 **Smooth UI** – Animated user interface using `Framer Motion`.

---

## 🛠️ Tech Stack

| Layer      | Technologies Used                                           |
|------------|-------------------------------------------------------------|
| Frontend   | `Next.js`, `Tailwind CSS`, `TypeScript`, `Framer Motion`    |
| Backend    | `Node.js`, `Next.js API Routes`, `Zod` for validation       |
| Auth       | `JWT`, `OAuth (Google/GitHub)`, OTP Login, Forgot Password |
| File Upload| `uploadthing`                                               |
| Payments   | `Razorpay`                                                  |
| AI Engine  | `Gemini API`, `LangChain`                                   |
| Video      | `FFmpeg` or browser-based text rendering                    |

---

## 🧩 Project Structure

[![View Diagram](https://img.shields.io/badge/View%20Architecture-Eraser.io-7B68EE?logo=eraser)](https://app.eraser.io/workspace/SkEIR69bxJ2OFuloS3Wf?origin=share)

Click the badge above to view the full system architecture.

---

## 📦 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/essentia.ai.git
cd essentia.ai
npm install
npm run dev
