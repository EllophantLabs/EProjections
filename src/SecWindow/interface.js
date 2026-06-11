const { listen } = window.__TAURI__.event;
// active src
export let currentElement = null;
export let currentLooped = false;
export let currentDuration = 0;
let isMainTransition = false;
let isSecTransition = false;
const srcCue = [];
listen("preloadMedia", (event) => {
    // preload();
});
listen("transitionCMD", (event) => {
    if (currentElement == event.payload.element) {
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
    srcCue.push(event.payload.element);
});
listen("balackoutCMD", (event) => {
});
listen("updateIsLooped", (event) => {
    if (currentElement != event.payload.element) {
        return;
    }
    currentLooped = event.payload.isLooped;
});
