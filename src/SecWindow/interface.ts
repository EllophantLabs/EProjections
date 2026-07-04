const { listen } = window.__TAURI__.event;

import { mainTransition, preloadSlot, blackoutTransition } from "./transitions.js";

// active src
let currentElement: HTMLElement | null = null;
let currentLooped: boolean = false;
let currentDuration: number = 10000; // ms


let isMainTransition: boolean = false;
let isSecTransition: boolean = false;

const payloadCue = [];

//Todo add audio support!

//* preload slot is working!
listen("preloadMedia", (event: { payload: { element: HTMLElement, isVideo: boolean, isColor: boolean, isLooped: boolean, url: string } }) => {
    preloadSlot(event.payload.isVideo, event.payload.url, event.payload.isLooped, event.payload.isColor); /* isVideo: boolean, url: string, isLooped: boolean, isColor: boolean */
});

listen("transitionCMD", (event: { payload: { element: HTMLElement, transitionDuration: number, transition: boolean, isLooped: boolean } }) => {
    const tempTransitionDuration: number = 1000; //Todo update transitionDuration!

    if (currentElement == event.payload.element) {
        return;
    }

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

    if (!isSecTransition && tempTransitionDuration > 1500) // only main transition
    {
        // secTransition();
        console.log(`isSecTransition => true`);
        return;
    }

    console.log(`no empty transition!!!`);
    payloadCue.push(event.payload);
});

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