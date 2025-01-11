async function loadChalk() {
    const chalk = (await import("chalk")).default; // Use dynamic import for ESM
    return chalk;
}

export default loadChalk;