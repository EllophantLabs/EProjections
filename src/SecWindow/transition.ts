const { listen } = window.__TAURI__.event;

// active src
export let currentSrc: string = "";
export let currentLooped: boolean = false;
export let currentDuration: number = 0;

listen("preloadMedia", (event: { payload: { src: string, isVideo: boolean, isLooped: boolean } }) => {

});

listen("preloadColor", (event: { payload: { src: string } }) => {

});

listen("transitionCMD", (event: { payload: { src: string, transitionDuration: number, transition: boolean } }) => {
    currentSrc = event.payload.src;
});

listen("balackOut", (event: { payload: { transition: boolean } }) => {

});

listen("updateIsLooped", (event: { payload: { src: string, isLooped: boolean } }) => {
    if (currentSrc != event.payload.src) {
        return;
    }
    currentLooped = event.payload.isLooped;
});

listen("updateDuration", (event: { payload: { src: string, transitionDuration: number } }) => {
    if (currentSrc != event.payload.src) {
        return;
    }
    currentDuration = event.payload.transitionDuration;
});