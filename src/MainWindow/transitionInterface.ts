declare global {
    interface Window {
        __TAURI__: any;
    }
}

const { emit } = window.__TAURI__.event;

//Todo send element as unique id

export function preloadMedia(element: HTMLElement, isVideo: boolean, isColor: boolean, isLooped: boolean, url: string) {
    emit("preloadMedia", { element: element, isVideo: isVideo, isColor: isColor, isLooped: isLooped, url: url });
}

export function transitionCMD(element: HTMLElement, transtionDuration: number, transition: boolean, isLooped: boolean) {
    emit("transitionCMD", { element: element, transitionDuration: transtionDuration, transition: transition, isLooped: isLooped });
}

export function blackoutCMD(transition: boolean) {
    emit("blackoutCMD", { transition: transition });
}

export function updateIsLooped(element: HTMLElement, isLooped: boolean) {
    emit("updateIsLooped", { element: element, isLooped: isLooped });
}

export function updateTransitionDuration(src: string, transitionDuration: number) {

}