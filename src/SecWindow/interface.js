const { listen } = window.__TAURI__.event;
// active src
export let currentSrc = "";
export let currentLooped = false;
export let currentDuration = 0;
let isMainTransition = false;
let isSecTransition = false;
const srcCue = [];
listen("preloadMedia", (event) => {
    // preload();
});
listen("preloadColor", (event) => {
    // preload();
});
listen("transitionCMD", (event) => {
    if (currentSrc == event.payload.src) {
        return;
    }
    currentLooped = event.payload.isLooped;
    currentDuration = event.payload.transitionDuration;
    if (!isMainTransition) // no transition
     {
        // mainTransition();
        return;
    }
    if (!isSecTransition) // only main transition
     {
        // secTransition();
        return;
    }
    srcCue.push(event.payload.src);
});
listen("balackoutCMD", (event) => {
});
listen("updateIsLooped", (event) => {
    if (currentSrc != event.payload.src) {
        return;
    }
    currentLooped = event.payload.isLooped;
});
