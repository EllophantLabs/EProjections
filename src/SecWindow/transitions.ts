import { currentDuration } from "./interface.js";

export function preloadSlot(isVideo: boolean, url: string, isLooped: boolean, isColor: boolean): void {
    const preloadSlot = document.querySelector(".preload");
    if (!preloadSlot) {
        console.error("No preload slot found! transitions.ts");
        return;
    }

    preloadSlot.innerHTML = "";

    if (isVideo) {
        const video = document.createElement("video");
        video.src = url;
        video.muted = true;
        video.preload = "auto";
        video.loop = isLooped;
        video.crossOrigin = "anonymous";

        preloadSlot.appendChild(video);
        return;
    }

    if (isColor) {
        const div = document.createElement("div");
        div.style.backgroundColor = url;
        div.style.width = "100%";
        div.style.height = "100%";

        preloadSlot.appendChild(div);
        console.log(`preloaded Color -> ${url}`);
        return;
    }

    /* is img */
    const img = document.createElement("img");
    img.src = url;

    preloadSlot.appendChild(img);
}

export function mainTransition(): void {
    const newSlot = document.querySelector(".hidden");
    const oldSlot = document.querySelector(".visible");

    document.documentElement.style.setProperty('--fade-duration', `${currentDuration}ms`);

    newSlot?.classList.add("hidden");
    newSlot?.classList.remove("visible");
    oldSlot?.classList.add("visible");
    oldSlot?.classList.remove("hidden");
}

export function secTransition(): void {

}