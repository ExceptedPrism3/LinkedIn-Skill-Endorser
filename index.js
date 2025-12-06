/**
 * LinkedIn Skill Endorser - Robust Human-Like Version (v3.5 Final)
 * 
 * enhanced features:
 * - Async/Await for proper sequential execution
 * - Random delays & scrolling
 * - Floating UI Status Box
 * - Smart Scroll Search
 * - Clean cleanup (Self-destructs after completion)
 */
(async function () {
    // --- Configuration ---
    const MIN_DELAY = 800;
    const MAX_DELAY = 2200;
    const MAX_NO_BUTTONS_ATTEMPTS = 3;
    const REPO_ISSUES_URL = "https://github.com/YOUR_USERNAME/linkedin-skill-endorser/issues"; // 🔴 REPLACE THIS!

    // --- DOM Helpers ---
    function createStatusBox() {
        const box = document.createElement('div');
        box.id = 'li-endorser-status';
        Object.assign(box.style, {
            position: 'fixed', bottom: '20px', right: '20px', padding: '15px 20px',
            background: '#1a1a1a', color: '#fff', borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: '9999',
            fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '14px',
            transition: 'opacity 1s ease', minWidth: '200px' // 1s slow fade
        });

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
        // Helper to find all current buttons to get a total count
        const allButtons = Array.from(document.querySelectorAll('button, .artdeco-button'));
        return allButtons.filter(button => {
            if (button.offsetParent === null) return false;
            const text = button.innerText || "";
            const ariaLabel = button.getAttribute('aria-label') || "";
            return text.trim() === 'Endorse' || ariaLabel.startsWith('Endorse ');
        });
    }

    function isAtBottom() {
        return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50; // 50px buffer
    }

    // --- Main Execution ---
    createStatusBox();

    // Initial counting (approximate, since some might be hidden)
    const initialButtons = getAllEndorseButtons();
    let totalSkillsEstimate = initialButtons.length || "Many";

    updateStatus(`Found ${initialButtons.length} + skills`, "Starting sequence...");
    await wait(1500);

    let endorsedCount = 0;
    let noButtonAttempts = 0;

    while (true) {
        // Re-find to get the next valid button
        const currentButtons = getAllEndorseButtons();
        const btn = currentButtons[0]; // grab the first available one

        if (!btn) {
            // No buttons visible? Let's verify if we can scroll down to find more.
            if (isAtBottom()) {
                noButtonAttempts++;
                updateStatus("Reaching end...", `Checking for missed items(${noButtonAttempts} / ${MAX_NO_BUTTONS_ATTEMPTS})`);
            } else {
                // Not at bottom yet, scroll down looking for more
                noButtonAttempts = 0; // Reset attempts since we found "more page" to explore
                updateStatus("Searching...", "Scrolling down for more skills...");
                window.scrollBy({ top: 600, behavior: 'smooth' });
                await wait(1500);
                continue; // retry loop immediately after scroll
            }

            if (noButtonAttempts >= MAX_NO_BUTTONS_ATTEMPTS) {
                updateStatus(`✅ <strong>Done!</strong>`, `Endorsed ${endorsedCount} skills locally.`);
                break;
            }
            await wait(2000);
            continue;
        }

        noButtonAttempts = 0; // Reset

        try {
            endorsedCount++;
            updateStatus(`<strong>⚡ Endorsing...</strong>`, `Skill #${endorsedCount} processed`);

            btn.scrollIntoView({ behavior: 'smooth', block: 'center' });

            const thinkTime = randomDelay(MIN_DELAY, MAX_DELAY);
            await wait(thinkTime);

            if (btn.isConnected) {
                btn.click();
                console.log(`[#${endorsedCount}]Endorsed`);
            } else {
                console.warn("Element stale, retrying...");
                endorsedCount--;
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
            // 1. Start fade out
            box.style.opacity = '0';

            // 2. Remove from DOM after fade completes (1s transition)
            setTimeout(() => {
                if (box) box.remove();
            }, 1000);
        }
    }, 4000); // Wait 4s so they can see "Done", then fade.

})();