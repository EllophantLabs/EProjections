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

export function transitionCMD(src: string, transtionDuration: number, transition: boolean) {
    emit("transitionCMD", { src: src, transitionDuration: transtionDuration, transition: transition });
}

export function blackOut(transition: boolean) {
    emit("blackOut", { transition: transition });
}

export function updateIsLooped(src:string, isLooped: boolean)
{
    emit("updateIsLooped",{src:src, isLooped: isLooped});
}

export function updateDuration(src:string, transitionDuration: number)
{
    emit("updateIsLooped",{src:src, transitionDuration: transitionDuration});
}