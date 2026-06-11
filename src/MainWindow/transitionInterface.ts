declare global {
    interface Window {
        __TAURI__: any;
    }
}

const { emit } = window.__TAURI__.event;

//Todo send element as unique id

export function preloadMedia(element: HTMLElement, isVideo: boolean, isColor: boolean, isLooped: boolean) {
    console.log(`Preload media element: ${element}, isVideo: ${isVideo}, isColor: ${isColor} isLooped: ${isLooped}`);
    emit("preloadMedia", { element: element, isVideo: isVideo, isColor: isColor, isLooped: isLooped });
}

export function transitionCMD(element: HTMLElement, transtionDuration: number, transition: boolean, isLooped: boolean) {
    console.log(`TransitionCMD element: ${element}, transitionDuration: ${transtionDuration}, transition: ${transition}, isLooped: ${isLooped}`);
    emit("transitionCMD", { element: element, transitionDuration: transtionDuration, transition: transition, isLooped: isLooped });
}

export function blackoutCMD(transition: boolean) {
    console.log(`blackoutCMD transition: ${transition}`);
    emit("blackoutCMD", { transition: transition });
}

export function updateIsLooped(element: HTMLElement, isLooped: boolean) {
    console.log(`updateIsLooped src: ${element}, isLooped: ${isLooped}`);
    emit("updateIsLooped", { element: element, isLooped: isLooped });
}

export function updateTransitionDuration(src: string, transitionDuration: number) {

}