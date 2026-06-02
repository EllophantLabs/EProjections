const { emit } = window.__TAURI__.event;
export function preloadMedia(src, isVideo, isLooped) {
    emit("preloadMedia", { src: src, isVideo: isVideo, isLooped: isLooped });
}
export function preloadColor(src) {
    emit("preloadColor", { src: src });
}
export function transitionCMD(src, transtionDuration, transition) {
    emit("transitionCMD", { src: src, transitionDuration: transtionDuration, transition: transition });
}
export function blackOut(transition) {
    emit("blackOut", { transition: transition });
}
export function updateIsLooped(src, isLooped) {
    emit("updateIsLooped", { src: src, isLooped: isLooped });
}
export function updateDuration(src, transitionDuration) {
    emit("updateIsLooped", { src: src, transitionDuration: transitionDuration });
}
