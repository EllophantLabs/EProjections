const { listen } = window.__TAURI__.event;
import { mainTransition, preloadSlot, blackoutTransition } from "./transitions.js";
// active src
let currentElement = null;
let currentDuration = 10000; // ms
let isMainTransition = false;
let isSecTransition = false;
let payloadCue;
let payloadCueIsValid = false;
//Todo add audio support!
//* preload slot is working!
listen("preloadMedia", (event) => {
    console.log(`preload isLooped: ${event.payload.isLooped}`);
    preloadSlot(event.payload.isVideo, event.payload.url, event.payload.isLooped, event.payload.isColor); /* isVideo: boolean, url: string, isLooped: boolean, isColor: boolean */
});
listen("transitionCMD", (event) => {
    console.log(`transitionCMD isLooped: ${event.payload.isLooped}`);
    transitionCMD(event.payload); // function call to make recursive callbacks possible
});
function transitionCMD(payload) {
    let tempTransitionDuration = 500; // duration in ms //Todo update transitionDuration!
    // if (currentElement == payload.element) {
    //     console.log("Dublicate -> return!");
    //     return;
    // }
    currentElement = payload.element; // allowing backtracing and identification
    // temporary: only main transition with fixed 500ms duration
    if (!isMainTransition) {
        payloadCueIsValid = false;
        if (!payload.transition) {
            tempTransitionDuration = 0;
        }
        mainTransition(tempTransitionDuration, payload.isLooped);
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
    // update looping
    const activeSlot = document.querySelector(".visible");
    if (!(activeSlot?.firstElementChild?.firstElementChild?.tagName == "VIDEO")) {
        return;
    }
    let video = activeSlot.firstElementChild.firstElementChild;
    if (!(video instanceof HTMLVideoElement)) {
        return;
    }
    if (video.ended && event.payload.isLooped) {
        video.play();
    }
    video.loop = event.payload.isLooped;
});
