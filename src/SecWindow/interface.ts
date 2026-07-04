const { listen } = window.__TAURI__.event;

import { mainTransition, preloadSlot } from "./transitions.js";

// active src
export let currentElement: HTMLElement | null = null;
export let currentLooped: boolean = false;
export let currentDuration: number = 1000;

let isMainTransition: boolean = false;
let isSecTransition: boolean = false;

const srcCue = [];

//Todo add audio support!

//* preload slot is working!
listen("preloadMedia", (event: { payload: { element: HTMLElement, isVideo: boolean, isColor: boolean, isLooped: boolean, url: string } }) => {
    preloadSlot(event.payload.isVideo, event.payload.url, event.payload.isLooped, event.payload.isColor); /* isVideo: boolean, url: string, isLooped: boolean, isColor: boolean */
});

listen("transitionCMD", (event: { payload: { element: HTMLElement, transitionDuration: number, transition: boolean, isLooped: boolean } }) => {
    if (currentElement == event.payload.element) {
        return;
    }

    currentLooped = event.payload.isLooped;
    currentDuration = event.payload.transitionDuration;

    if (!isMainTransition) // no transition
    {
        // mainTransition();
        console.log(`main transition!`)
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

listen("blackoutCMD", (event: { payload: { transition: boolean } }) => {
    console.log("blackoutCMD");
});

listen("updateIsLooped", (event: { payload: { element: HTMLElement, isLooped: boolean } }) => {
    console.log("updateIsLooped");
    if (currentElement != event.payload.element) {
        return;
    }
    currentLooped = event.payload.isLooped;
});