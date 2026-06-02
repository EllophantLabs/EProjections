const { listen } = window.__TAURI__.event;
// active src
export let currentSrc = "";
export let currentLooped = false;
export let currentDuration = 0;
listen("preloadMedia", (event) => {
});
listen("preloadColor", (event) => {
});
listen("transitionCMD", (event) => {
    currentSrc = event.payload.src;
});
listen("balackOut", (event) => {
});
listen("updateIsLooped", (event) => {
    if (currentSrc != event.payload.src) {
        return;
    }
    currentLooped = event.payload.isLooped;
});
listen("updateDuration", (event) => {
    if (currentSrc != event.payload.src) {
        return;
    }
    currentDuration = event.payload.transitionDuration;
});
