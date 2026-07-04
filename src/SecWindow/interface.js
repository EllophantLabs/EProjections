const { listen } = window.__TAURI__.event;
import { mainTransition, preloadSlot } from "./transitions.js";
// active src
export let currentElement = null;
export let currentLooped = false;
export let currentDuration = 1000;
let isMainTransition = false;
let isSecTransition = false;
const srcCue = [];
//Todo add audio support!
//* preload slot is working!
listen("preloadMedia", (event) => {
    preloadSlot(event.payload.isVideo, event.payload.url, event.payload.isLooped, event.payload.isColor); /* isVideo: boolean, url: string, isLooped: boolean, isColor: boolean */
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
        console.log(`main transition!`);
        mainTransition();
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
