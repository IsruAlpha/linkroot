# Linkroot

Linkroot is an AI-native linktree platform designed for creators, entrepreneurs, and professionals who want a premium, minimalist digital identity.

## Features

- **AI-Native Integration**: Intelligent theme generation and content optimization.
- **Truly Live Preview**: See your changes instantly as you type.
- **Premium Design**: Minimalist aesthetics with smooth animations and glassmorphism.
- **Smart Icon Detection**: Automatically detects platforms from URLs.
- **WorkOS Authentication**: Secure and seamless sign-in experience.
- **Convex Backend**: Fast, reactive database and serverless functions.

## Getting Started

Follow these steps to get Linkroot running locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)
- A [WorkOS](https://workos.com/) account
- A [Convex](https://convex.dev/) account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/linkroot.git
   cd linkroot/my-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy the example environment file and fill in your credentials from WorkOS and Convex.
   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure WorkOS**:
   - Get your `WORKOS_CLIENT_ID` and `WORKOS_API_KEY` from the WorkOS dashboard.
   - Add `http://localhost:3000/callback` as a redirect URI in your WorkOS project.
   - Set a `WORKOS_COOKIE_PASSWORD` (minimum 32 characters).

5. **Initialize Convex**:
   ```bash
   npx convex dev
   ```
   This will set up your Convex deployment and add your Convex URL to `.env.local`.

6. **Add WorkOS Auth to Convex**:
   ```bash
   npx convex auth add workos
   ```

### Running Locally

To start the development server (both Next.js and Convex):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Lucide React
- **Backend**: Convex
- **Authentication**: WorkOS AuthKit
- **Deployment**: Vercel (recommended)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
