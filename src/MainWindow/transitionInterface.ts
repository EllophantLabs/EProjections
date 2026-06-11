declare global {
    interface Window {
        __TAURI__: any;
    }
}

const { emit } = window.__TAURI__.event;

export function preloadMedia(src: string, isVideo: boolean, isColor: boolean, isLooped: boolean) {
    console.log(`Preload media src: ${src}, isVideo: ${isVideo}, isColor: ${isColor} isLooped: ${isLooped}`);
    emit("preloadMedia", { src: src, isVideo: isVideo, isColor: isColor, isLooped: isLooped });
}

export function transitionCMD(src: string, transtionDuration: number, transition: boolean, isLooped: boolean) {
    console.log(`TransitionCMD src: ${src}, transitionDuration: ${transtionDuration}, transition: ${transition}, isLooped: ${isLooped}`);
    emit("transitionCMD", { src: src, transitionDuration: transtionDuration, transition: transition, isLooped: isLooped });
}

export function blackoutCMD(transition: boolean) {
    console.log(`blackoutCMD transition: ${transition}`);
    emit("blackoutCMD", { transition: transition });
}

export function updateIsLooped(src: string, isLooped: boolean) {
    console.log(`updateIsLooped src: ${src}, isLooped: ${isLooped}`);
    emit("updateIsLooped", { src: src, isLooped: isLooped });
}