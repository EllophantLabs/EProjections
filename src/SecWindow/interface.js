const { listen } = window.__TAURI__.event;
// active src
export let currentElement = null;
export let currentLooped = false;
export let currentDuration = 0;
let isMainTransition = false;
let isSecTransition = false;
const srcCue = [];
listen("preloadMedia", (event) => {
    console.log("preloadMedia");
    // preload();
});
listen("transitionCMD", (event) => {
    console.log("transitionCMD");
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
listen("blackoutCMD", (event) => {
    console.log("blackoutCMD");
});
listen("updateIsLooped", (event) => {
    console.log("updateIsLooped");
    if (currentElement != event.payload.element) {
        return;
    }
    currentLooped = event.payload.isLooped;
});
