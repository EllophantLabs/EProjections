const { getCurrentWebviewWindow } = window.__TAURI__.webviewWindow;
const appWindow = getCurrentWebviewWindow();

window.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("keydown", async (event) => {
    event.preventDefault();
    switch (event.key) {
        case "Escape":
            await appWindow.close();
            break;
    }
}); 