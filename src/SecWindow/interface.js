const { listen } = window.__TAURI__.event;
import { mainTransition, preloadSlot, blackoutTransition } from "./transitions.js";
// active src
let currentElement = null;
let currentLooped = false;
let currentDuration = 10000; // ms
let isMainTransition = false;
let isSecTransition = false;
const srcCue = [];
//Todo add audio support!
//* preload slot is working!
listen("preloadMedia", (event) => {
    preloadSlot(event.payload.isVideo, event.payload.url, event.payload.isLooped, event.payload.isColor); /* isVideo: boolean, url: string, isLooped: boolean, isColor: boolean */
});
listen("transitionCMD", (event) => {
    const tempTransitionDuration = 1000; //Todo update transitionDuration!
    if (currentElement == event.payload.element) {
        return;
    }
    currentLooped = event.payload.isLooped;
    currentDuration = event.payload.transitionDuration;
    if (!isMainTransition) // no transition
     {
        isMainTransition = true;
        console.log(`isMainTransition => true`);
        mainTransition(tempTransitionDuration);
        setTimeout(() => {
            isMainTransition = false;
        }, tempTransitionDuration);
        return;
    }
    if (!isSecTransition) // only main transition
     {
        // secTransition();
        console.log(`isSecTransition => true`);
        return;
    }
    console.log(`no empty transition!!!`);
    srcCue.push(event.payload.element);
});
listen("blackoutCMD", (event) => {
    console.log("blackoutCMD");
    const transition = event.payload.transition ? 1 : 0;
    blackoutTransition(transition);
});
listen("updateIsLooped", (event) => {
    console.log("updateIsLooped");
    if (currentElement != event.payload.element) {
        return;
    }
    currentLooped = event.payload.isLooped;
});
