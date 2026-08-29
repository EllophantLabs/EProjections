const { listen } = window.__TAURI__.event;

import { mainTransition, preloadSlot, blackoutTransition } from "./transitions.js";

// active src
let currentElement: HTMLElement | null = null;
let currentDuration: number = 10000; // ms


let isMainTransition: boolean = false;
let isSecTransition: boolean = false;

let payloadCue: { element: HTMLElement, transitionDuration: number, transition: boolean, isLooped: boolean };
let payloadCueIsValid: boolean = false;

//Todo add audio support!

//* preload slot is working!
listen("preloadMedia", (event: { payload: { element: HTMLElement, isVideo: boolean, isColor: boolean, isLooped: boolean, url: string } }) => {
    console.log(`preload isLooped: ${event.payload.isLooped}`);
    preloadSlot(event.payload.isVideo, event.payload.url, event.payload.isLooped, event.payload.isColor); /* isVideo: boolean, url: string, isLooped: boolean, isColor: boolean */
});

listen("transitionCMD", (event: { payload: { element: HTMLElement, transitionDuration: number, transition: boolean, isLooped: boolean } }) => {
    console.log(`transitionCMD isLooped: ${event.payload.isLooped}`);
    transitionCMD(event.payload); // function call to make recursive callbacks possible
});

function transitionCMD(payload: { element: HTMLElement, transitionDuration: number, transition: boolean, isLooped: boolean }) {
    const tempTransitionDuration: number = 500; // duration in ms //Todo update transitionDuration!

    // if (currentElement == payload.element) {
    //     console.log("Dublicate -> return!");
    //     return;
    // }

    currentElement = payload.element; // allowing backtracing and identification

    // temporary: only main transition with fixed 500ms duration

    if (!isMainTransition) {
        payloadCueIsValid = false;
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

listen("blackoutCMD", (event: { payload: { transition: boolean } }) => {
    console.log("blackoutCMD");
    const transition: 0 | 1 = event.payload.transition ? 1 : 0;
    blackoutTransition(transition);
});

listen("updateIsLooped", (event: { payload: { element: HTMLElement, isLooped: boolean } }) => {
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