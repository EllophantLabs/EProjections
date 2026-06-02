declare global {
    interface Window {
        __TAURI__: any;
    }
}

const { emit } = window.__TAURI__.event;

export function preloadMedia(src: string, isVideo: boolean, isLooped: boolean) {
    emit("preloadMedia", { src: src, isVideo: isVideo, isLooped: isLooped });
}

export function preloadColor(src: string) {
    emit("preloadColor", { src: src });
}

export function transitionCMD(src: string, transtionDuration: number, transition: boolean, isLooped: boolean) {
    emit("transitionCMD", { src: src, transitionDuration: transtionDuration, transition: transition, isLooped: isLooped });
}

export function blackoutCMD(transition: boolean) {
    emit("blackoutCMD", { transition: transition });
}

export function updateIsLooped(src: string, isLooped: boolean) {
    emit("updateIsLooped", { src: src, isLooped: isLooped });
}