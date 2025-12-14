# Prompt Library (Chrome Extension)

Chrome Extension that helps you manage AI prompts and insert them directly into ChatGPT.

## How it works

The extension injects a button next to the chat input on supported websites. Clicking it opens a modal where you can select a prompt to insert.

- **Storage**: Prompts are saved in `chrome.storage.local`, so they sync across all your open tabs.
- **Tech**: Built with React 19, TypeScript, and Redux Toolkit.
- **Dev**: Uses Vite with HMR for fast development.

## Setup

1. `npm install`
2. `npm run dev`
3. Load the `dist` folder into Chrome (`chrome://extensions` > Load unpacked).

## Development

The project is built with Vite and supports Hot Module Replacement (HMR).

### Commands

| Command         | Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| `npm run dev`   | Starts dev server. Code changes reload the extension automatically. |
| `npm run build` | Compiles the production build into `dist` folder.                   |
| `npm run lint`  | Runs eslint to check for code issues.                               |

### Project Layout

- `src/content`: Script injected into the web page (UI, buttons).
- `src/background`: Service worker (currently inactive).
- `src/store`: Redux logic for state management.
- `src/shared`: Shared types and utilities.
