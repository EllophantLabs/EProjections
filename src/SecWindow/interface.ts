const { listen } = window.__TAURI__.event;

// active src
export let currentSrc: string = "";
export let currentLooped: boolean = false;
export let currentDuration: number = 0;

let isMainTransition: boolean = false;
let isSecTransition: boolean = false;

const srcCue = [];

listen("preloadMedia", (event: { payload: { src: string, isVideo: boolean, isLooped: boolean } }) => {
    // preload();
});

listen("preloadColor", (event: { payload: { src: string } }) => {
    // preload();
});

listen("transitionCMD", (event: { payload: { src: string, transitionDuration: number, transition: boolean, isLooped: boolean } }) => {
    if (currentSrc == event.payload.src) {
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

    srcCue.push(event.payload.src);
});

listen("balackoutCMD", (event: { payload: { transition: boolean } }) => {

});

listen("updateIsLooped", (event: { payload: { src: string, isLooped: boolean } }) => {
    if (currentSrc != event.payload.src) {
        return;
    }
    currentLooped = event.payload.isLooped;
});