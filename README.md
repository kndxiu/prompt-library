# AI Prompt Library - Chrome Extension

A professional Chrome Extension to manage, organize, and instantly insert your favorite AI prompts into ChatGPT and other supported platforms. Built with performance and architecture in mind.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)

## 🚀 Features

- **Seamless Integration**: Injects a non-intrusive floating button or inline control into ChatGPT interfaces.
- **Shadow DOM Isolation**: UI styles are completely isolated and won't conflict with the host website.
- **Real-time Synchronization**: Prompts synced instantly across multiple tabs using `chrome.storage` and Redux.
- **Smart Component Lifecycle**: Optimized observers ensure no memory leaks even in complex SPAs.
- **Instant Search**: Client-side fuzzy search for quick access to your library.

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript
- **State Management**: Redux Toolkit (with custom storage sync middleware)
- **Build Tool**: Vite + CRXJS (Hot Module Replacement supported)
- **Styling**: Vanilla CSS (injected via Shadow DOM)
- **Architecture**: Feature-based folder structure, Service-Worker-less design (lightweight).

## 📦 Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/prompt-library.git
    cd prompt-library
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Build for production**

    ```bash
    npm run build
    ```

4.  **Load into Chrome**
    - Open Chrome and navigate to `chrome://extensions`.
    - Enable **Developer Mode** (top right).
    - Click **Load unpacked**.
    - Select the `dist` folder generated in your project directory.

## 💻 Development

This project supports **Hot Module Replacement (HMR)** for content scripts, making development extremely fast.

```bash
npm run dev
```

The extension will auto-reload when you save changes. Note that for Content Script changes to take effect on the target page, you may sometimes need to refresh the target page (though CRXJS handles this well usually).

## 🏗️ Architecture Highlights

- **`src/content`**: Contains the logic injected into web pages.
  - **`observer.ts`**: A robust, centralized `MutationObserver` that manages the lifecycle of injected React roots.
  - **`attachButton.tsx`**: The entry point for the UI specific to an input field.
  - **`modal-root.ts`**: Manages the singleton Shadow Host for the modal to prevent z-index wars.
- **`src/store`**: Redux setup with a specialized middleware to listen to `chrome.storage.onChanged` for cross-tab sync.

## 📄 License

MIT
