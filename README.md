# LinkedIn Skill Endorser 🚀

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-f7df1e?logo=javascript&logoColor=black)
![Version](https://img.shields.io/github/package-json/v/ExceptedPrism3/LinkedIn-Skill-Endorser?filename=package.json&color=blue)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

A robust, "human-like" JavaScript tool to automate endorsing skills on LinkedIn. It is designed to run in the browser console, handling dynamic loading, scrolling, and avoiding bot detection mechanisms by using random delays.

## 🎥 Demo

![LinkedIn Endorser Demo](preview/demo.gif)

*See the script in action: Auto-scrolling, finding skills, and efficient processing.*

## ✨ Features

- **🛡️ Bot-Safe Delays**: Uses randomized human-like intervals between clicks (800ms - 2.5s) to avoid rate limiting.
- **👀 Visual Status Box**: Adds a floating overlay to the bottom-right of your screen so you can track progress without keeping the console open.
- **🧠 Anti-Stuck Logic**: Smartly retries stubborn buttons up to 3 times before skipping them, preventing endless loops.
- **🔍 Smart Scroll Search**: Automatically scrolls down to find missing or virtualization-hidden skills if it hits a "gap" in the list.
- **🧹 Auto-Cleanup**: The status box automatically fades out and removes itself from the page after completion.
- **🔄 Smart Re-Query**: Automatically handles LinkedIn's dynamic DOM updates (stale element references) by finding the next button freshly each time.

## ⚙️ How to Use

1.  Open **LinkedIn** and navigate to the **Skills** section of a connection's profile.
    *   *Tip: Click "Show all skills" to view the full list first.*
2.  Open your browser's **Developer Console**:
    *   **Mac**: `Cmd` + `Option` + `J`
    *   **Windows/Linux**: `Ctrl` + `Shift` + `J`
3.  Copy the code from `index.js` and paste it into the console.
4.  Press **Enter**.
5.  Sit back! A box will appear in the bottom-right corner showing you the endorsement progress.
6.  *Important*: After the script finishes, perform a **Hard Refresh** (`Cmd+Shift+R` or `Ctrl+F5`) to verify that endorsements were saved. If some are missing, simply re-run the script.

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or new features, feel free to fork the repository and submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## ⚠️ Disclaimer

This script is for educational purposes only. Use it responsibly. LinkedIn's Terms of Service prohibit automated scraping or interaction.

**The author is not responsible for any consequences resulting from the use of this tool, including but not limited to account bans, restrictions, or temporary suspensions.** Use at your own risk.

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---
Made with ❤️ by [Prism3](https://github.com/ExceptedPrism3)
