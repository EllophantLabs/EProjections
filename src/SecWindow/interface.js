const { listen } = window.__TAURI__.event;
import { mainTransition, preloadSlot, blackoutTransition } from "./transitions.js";
// active src
let currentElement = null;
let currentLooped = false;
let currentDuration = 10000; // ms
let isMainTransition = false;
let isSecTransition = false;
let payloadCue;
let payloadCueIsValid = false;
//Todo add audio support!
//* preload slot is working!
listen("preloadMedia", (event) => {
    preloadSlot(event.payload.isVideo, event.payload.url, event.payload.isLooped, event.payload.isColor); /* isVideo: boolean, url: string, isLooped: boolean, isColor: boolean */
});
listen("transitionCMD", (event) => {
    transitionCMD(event.payload); // function call to make recursive callbacks possible
});
function transitionCMD(payload) {
    const tempTransitionDuration = 2000; //Todo update transitionDuration!
    if (currentElement == payload.element) {
        console.log("Dublicate -> return!");
        return;
    }
    // temporary: only main transition with fixed 500ms duration
    if (!isMainTransition) {
        payloadCueIsValid = false;
        mainTransition(tempTransitionDuration);
        console.log("Main transition!");
        isMainTransition = true;
        setTimeout(() => {
            isMainTransition = false;
            if (payloadCueIsValid) {
                transitionCMD(payloadCue);
            }
        }, tempTransitionDuration);
        return;
    }
    console.log(`no empty transition!!! need for cue`);
    payloadCue = payload;
    payloadCueIsValid = true;
}
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
