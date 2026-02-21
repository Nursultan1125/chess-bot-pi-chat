
# ChessBot AI (React + Vite)

Interactive chess app with:
- a playable board (drag-and-drop + UCI input),
- AI response moves,
- short coaching comments for both player and bot moves,
- text-to-speech playback for coach messages.

## Features

- Play as White against the AI coach.
- Move input format: `e2e4` (or promotion `e7e8q`).
- Bot returns:
  - next move,
  - coaching text for bot move,
  - coaching text for your last move.
- Chat panel with RU/KY localization.
- Voice playback (TTS) in browser:
  - auto-selects `ky-*` voice for Kyrgyz UI,
  - falls back to `ru-*` if Kyrgyz voice is unavailable,
  - manual voice selection from available system/browser voices.

## Requirements

- Node.js 18+ (recommended)
- npm

## Environment

Create `.env.local` in project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

## Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open app:
   - `http://localhost:3000`

## Useful Scripts

- `npm run dev` - start development server.
- `npm run build` - build production bundle.
- `npm run preview` - preview production build.
- `npm run lint` - TypeScript check (`tsc --noEmit`).
