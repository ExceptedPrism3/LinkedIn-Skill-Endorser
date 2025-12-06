# LinkedIn Skill Endorser 🚀

A robust, "human-like" JavaScript tool to automate endorsing skills on LinkedIn. It is designed to run in the browser console, handling dynamic loading, scrolling, and avoiding bot detection mechanisms by using random delays.

## Features

- **🛡️ Bot-Safe Delays**: Uses randomized human-like intervals between clicks (800ms - 2.5s) to avoid rate limiting.
- **👀 Visual Status Box**: Adds a floating overlay to the bottom-right of your screen so you can track progress without keeping the console open.
- **🔄 Smart Re-Query**: Automatically handles LinkedIn's dynamic DOM updates (stale element references) by finding the next button freshly each time.
- **📜 Auto-Scroll**: Smoothly scrolls to each skill before clicking.

## How to Use

1.  Open **LinkedIn** and navigate to the **Skills** section of a connection's profile.
    *   *Tip: Click "Show all skills" to view the full list first.*
2.  Open your browser's **Developer Console**:
    *   **Mac**: `Cmd` + `Option` + `J`
    *   **Windows/Linux**: `Ctrl` + `Shift` + `J`
3.  Copy the code from `index.js` and paste it into the console.
4.  Press **Enter**.
5.  Sit back! A box will appear in the bottom-right corner showing you the endorsement progress.

## Disclaimer

This script is for educational purposes only. Use it responsibly. LinkedIn's Terms of Service prohibit automated scraping or interaction. The author is not responsible for any consequences resulting from the use of this tool.

## License

[MIT](LICENSE)
