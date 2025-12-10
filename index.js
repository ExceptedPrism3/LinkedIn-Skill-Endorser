/**
 * LinkedIn Skill Endorser - Robust Human-Like Version (v3.9.0)
 * 
 * features:
 * - Async/Await & Random Delays
 * - Smart Scroll Search
 * - Status UI (Clean cleanup + Animations)
 * - Stubborn Button Retry (Try 3x before skipping)
 */
(async function () {
    // --- Configuration ---
    const MIN_DELAY = 800;
    const MAX_DELAY = 2200;
    const MAX_NO_BUTTONS_ATTEMPTS = 3;
    const MAX_RETRIES_PER_BUTTON = 3;
    const REPO_ISSUES_URL = "https://github.com/ExceptedPrism3/LinkedIn-Skill-Endorser/issues";

    // --- DOM Helpers ---
    function createStatusBox() {
        // ID check to prevent duplicates if re-pasted
        const existing = document.getElementById('li-endorser-status');
        if (existing) existing.remove();

        const box = document.createElement('div');
        box.id = 'li-endorser-status';

        // Inject Styles
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes pulse-ring {
                0% { box-shadow: 0 0 0 0 rgba(77, 166, 255, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(77, 166, 255, 0); }
                100% { box-shadow: 0 0 0 0 rgba(77, 166, 255, 0); }
            }
            @keyframes dot-blink {
                0% { content: '.'; }
                33% { content: '..'; }
                66% { content: '...'; }
                100% { content: ''; }
            }
            .li-status-box {
                position: fixed; bottom: 20px; right: 20px; padding: 15px 20px;
                background: rgba(26, 26, 26, 0.95); backdrop-filter: blur(10px);
                color: #fff; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 9999;
                font-family: system-ui, -apple-system, sans-serif; font-size: 14px;
                transition: opacity 1s ease; min-width: 220px;
            }
            .li-anim-pulse {
                animation: pulse-ring 2s infinite;
            }
            .li-dots::after {
                content: ''; display: inline-block; width: 12px;
                animation: dot-blink 1.5s steps(1) infinite;
            }
        `;
        document.head.appendChild(style);

        box.className = 'li-status-box li-anim-pulse';

        box.innerHTML = `
            <div id="li-status-text" style="margin-bottom: 8px; font-weight: 600;">🚀 Endorser Starting...</div>
            <div style="font-size: 11px; opacity: 0.7; border-top: 1px solid #444; padding-top: 6px;">
                Found a bug? <a href="${REPO_ISSUES_URL}" target="_blank" style="color: #4da6ff; text-decoration: none;">Report it here</a>
            </div>
        `;

        document.body.appendChild(box);
        return box;
    }

    function updateStatus(text, subtext = "") {
        const box = document.getElementById('li-status-text');
        if (box) {
            box.innerHTML = text;
            if (subtext) box.innerHTML += `<div style="font-weight:400; font-size:12px; margin-top:4px;">${subtext}</div>`;
        } else {
            console.log("Status:", text);
        }
    }

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    // --- Logic ---

    function getAllEndorseButtons() {
        const allButtons = Array.from(document.querySelectorAll('button, .artdeco-button'));
        return allButtons.filter(button => {
            if (button.offsetParent === null) return false;

            // Check retry limit
            const attempts = parseInt(button.dataset.liAttempts || 0);
            if (attempts >= MAX_RETRIES_PER_BUTTON) return false;

            const text = button.innerText || "";
            const ariaLabel = button.getAttribute('aria-label') || "";
            return text.trim() === 'Endorse' || ariaLabel.startsWith('Endorse ');
        });
    }

    function isAtBottom() {
        return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;
    }

    // --- Main Execution ---
    createStatusBox();

    // Initial counting
    let initialButtons = getAllEndorseButtons();
    updateStatus(`Found ${initialButtons.length}+ skills`, "Starting sequence...");
    await wait(1500);

    let endorsedCount = 0;
    let noButtonAttempts = 0;

    while (true) {
        // Re-find 
        const currentButtons = getAllEndorseButtons();
        const btn = currentButtons[0];

        if (!btn) {
            if (isAtBottom()) {
                noButtonAttempts++;
                updateStatus("Reaching end...", `Checking for missed items (${noButtonAttempts}/${MAX_NO_BUTTONS_ATTEMPTS})`);
            } else {
                noButtonAttempts = 0;
                updateStatus("Searching...", "Scrolling down for more skills<span class='li-dots'></span>");
                window.scrollBy({ top: 600, behavior: 'smooth' });
                await wait(1500);
                continue;
            }

            if (noButtonAttempts >= MAX_NO_BUTTONS_ATTEMPTS) {
                updateStatus(`✅ <strong>Done!</strong>`, `Endorsed ${endorsedCount} skills locally.`);

                // Stop animation
                const box = document.getElementById('li-endorser-status');
                if (box) box.classList.remove('li-anim-pulse');

                break;
            }
            await wait(2000);
            continue;
        }

        noButtonAttempts = 0; // Reset

        try {
            // Check retry status first
            const attempts = parseInt(btn.dataset.liAttempts || 0);
            const isRetry = attempts > 0;

            if (!isRetry) endorsedCount++;

            updateStatus(`<strong>⚡ Endorsing<span class="li-dots"></span></strong>`, `Skill #${endorsedCount} ${isRetry ? `(Retry ${attempts + 1})` : ""}`);

            btn.scrollIntoView({ behavior: 'smooth', block: 'center' });

            const thinkTime = randomDelay(MIN_DELAY, MAX_DELAY);
            await wait(thinkTime);

            if (btn.isConnected) {
                btn.dataset.liAttempts = attempts + 1;
                btn.click();
                console.log(`[#${endorsedCount}] Clicked ${isRetry ? `(Retry ${attempts + 1})` : ""}`);
                if (document.activeElement !== btn) btn.focus();
            } else {
                console.warn("Element stale, retrying...");
                if (!isRetry) endorsedCount--;
            }

            await wait(randomDelay(1000, 1500));

        } catch (err) {
            console.error(err);
            updateStatus("❌ Error occurred", "Retrying...");
            await wait(3000);
        }
    }

    // Cleanup sequence
    setTimeout(() => {
        const box = document.getElementById('li-endorser-status');
        if (box) {
            box.style.opacity = '0';
            setTimeout(() => {
                if (box) box.remove();
            }, 1000);
        }
    }, 4000);

})();