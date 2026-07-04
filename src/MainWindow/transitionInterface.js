const { emit } = window.__TAURI__.event;
//Todo send element as unique id
export function preloadMedia(element, isVideo, isColor, isLooped, url) {
    //Todo only temporary
    emit("preloadMedia", { element: element, isVideo: isVideo, isColor: isColor, isLooped: isLooped, url: url });
}
export function transitionCMD(element, transtionDuration, transition, isLooped) {
    emit("transitionCMD", { element: element, transitionDuration: transtionDuration, transition: transition, isLooped: isLooped });
}
export function blackoutCMD(transition) {
    emit("blackoutCMD", { transition: transition });
}
export function updateIsLooped(element, isLooped) {
    emit("updateIsLooped", { element: element, isLooped: isLooped });
}
export function updateTransitionDuration(src, transitionDuration) {
}
