const { listen } = window.__TAURI__.event;

import { mainTransition, preloadSlot, blackoutTransition } from "./transitions.js";

// active src
let currentElement: HTMLElement | null = null;
let currentLooped: boolean = false;
let currentDuration: number = 10000; // ms


let isMainTransition: boolean = false;
let isSecTransition: boolean = false;

let payloadCue: { element: HTMLElement, transitionDuration: number, transition: boolean, isLooped: boolean };
let payloadCueIsValid: boolean = false;

//Todo add audio support!

//* preload slot is working!
listen("preloadMedia", (event: { payload: { element: HTMLElement, isVideo: boolean, isColor: boolean, isLooped: boolean, url: string } }) => {
    preloadSlot(event.payload.isVideo, event.payload.url, event.payload.isLooped, event.payload.isColor); /* isVideo: boolean, url: string, isLooped: boolean, isColor: boolean */
});

listen("transitionCMD", (event: { payload: { element: HTMLElement, transitionDuration: number, transition: boolean, isLooped: boolean } }) => {
    transitionCMD(event.payload); // function call to make recursive callbacks possible
});

function transitionCMD(payload: { element: HTMLElement, transitionDuration: number, transition: boolean, isLooped: boolean }) {
    const tempTransitionDuration: number = 2000; //Todo update transitionDuration!

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
    currentLooped = event.payload.isLooped;
});