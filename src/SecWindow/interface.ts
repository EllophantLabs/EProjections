const { listen } = window.__TAURI__.event;

// active src
export let currentElement: HTMLElement | null = null;
export let currentLooped: boolean = false;
export let currentDuration: number = 0;

let isMainTransition: boolean = false;
let isSecTransition: boolean = false;

const srcCue = [];

listen("preloadMedia", (event: { payload: { element: HTMLElement, isVideo: boolean, isColor: boolean, isLooped: boolean } }) => {
    // preload();
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
        return;
    }

    if (!isSecTransition) // only main transition
    {
        // secTransition();
        return;
    }

    srcCue.push(event.payload.element);
});

listen("balackoutCMD", (event: { payload: { transition: boolean } }) => {

});

listen("updateIsLooped", (event: { payload: { element: HTMLElement, isLooped: boolean } }) => {
    if (currentElement != event.payload.element) {
        return;
    }
    currentLooped = event.payload.isLooped;
});