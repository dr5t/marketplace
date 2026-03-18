# Vrindaa Crochet - Handcrafted Marketplace

Welcome to the Vrindaa Crochet project! This repository contains three main modules: a **Backend** API, a **Web** frontend, and a **Mobile** application.

## 🚀 Getting Started

Follow these steps to run the full stack on your local machine.

### 1. Prerequisites
- **Node.js**: v20 or higher recommended.
- **PostgreSQL**: Required for the backend database.
- **Expo Go**: (Optional) Install on your phone to test the mobile app.

---

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment:
   Create a `.env` file in the `backend` folder and add:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/vrindaa_db"
   JWT_SECRET="your_secret_key"
   RAZORPAY_KEY_ID="rzp_test_..."
   RAZORPAY_KEY_SECRET="your_razorpay_secret"
   ```
4. Setup Database:
   ```bash
   npx prisma db push
   ```
5. Start Server:
   ```bash
   npm run dev
   ```
   *The API will run at `http://localhost:5001/api`*

---

### 3. Web Frontend Setup
1. Navigate to the web directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment:
   Create a `.env.local` file in the `web` folder:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5001/api"
   NEXT_PUBLIC_RAZORPAY_KEY="rzp_test_..."
   ```
4. Start Development Server:
   ```bash
   npm run dev
   ```
   *Access the web app at `http://localhost:3000`*

---

### 4. Mobile Application Setup
1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Expo:
   ```bash
   npx expo start
   ```
   - Press `i` for iOS simulator.
   - Press `a` for Android emulator.
   - Or scan the QR code with the **Expo Go** app on your phone.

---

## 🛠️ Key Commands
- **Backend Lint/Build**: `npm run build`
- **Web Lint/Build**: `npm run lint` / `npm run build`
- **Mobile Check**: `npx expo build:preview` (for distribution)

## 🎨 Design Philosophy
The application follows a **Liquid Design System** with soft gradients, glassmorphism, and smooth animations using Framer Motion and Three.js.
# mobile
