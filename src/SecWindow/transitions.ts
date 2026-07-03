export function getActiveScreenElement() {
    const element = document.querySelector(".media-slot.active");
    return element;
}

export function getHiddenScreenElement() {
    const element = document.querySelector(".media-slot.hidden");
    return element;
}

export function getShadowScreenElement() {
    const element = document.querySelector(".media-slot.shadow");
    return element;
}