const { emit } = window.__TAURI__.event;
export function preloadMedia(src, isVideo, isColor, isLooped) {
    console.log(`Preload media src: ${src}, isVideo: ${isVideo}, isColor: ${isColor} isLooped: ${isLooped}`);
    emit("preloadMedia", { src: src, isVideo: isVideo, isColor: isColor, isLooped: isLooped });
}
export function transitionCMD(src, transtionDuration, transition, isLooped) {
    console.log(`TransitionCMD src: ${src}, transitionDuration: ${transtionDuration}, transition: ${transition}, isLooped: ${isLooped}`);
    emit("transitionCMD", { src: src, transitionDuration: transtionDuration, transition: transition, isLooped: isLooped });
}
export function blackoutCMD(transition) {
    console.log(`blackoutCMD transition: ${transition}`);
    emit("blackoutCMD", { transition: transition });
}
export function updateIsLooped(src, isLooped) {
    console.log(`updateIsLooped src: ${src}, isLooped: ${isLooped}`);
    emit("updateIsLooped", { src: src, isLooped: isLooped });
}
