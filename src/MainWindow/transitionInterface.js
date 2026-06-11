const { emit } = window.__TAURI__.event;
//Todo send element as unique id
export function preloadMedia(element, isVideo, isColor, isLooped) {
    console.log(`Preload media element: ${element}, isVideo: ${isVideo}, isColor: ${isColor} isLooped: ${isLooped}`);
    emit("preloadMedia", { element: element, isVideo: isVideo, isColor: isColor, isLooped: isLooped });
}
export function transitionCMD(element, transtionDuration, transition, isLooped) {
    console.log(`TransitionCMD element: ${element}, transitionDuration: ${transtionDuration}, transition: ${transition}, isLooped: ${isLooped}`);
    emit("transitionCMD", { element: element, transitionDuration: transtionDuration, transition: transition, isLooped: isLooped });
}
export function blackoutCMD(transition) {
    console.log(`blackoutCMD transition: ${transition}`);
    emit("blackoutCMD", { transition: transition });
}
export function updateIsLooped(element, isLooped) {
    console.log(`updateIsLooped src: ${element}, isLooped: ${isLooped}`);
    emit("updateIsLooped", { element: element, isLooped: isLooped });
}
export function updateTransitionDuration(src, transitionDuration) {
}
