import { currentDuration } from "./interface.js";

export function preloadSlot(isVideo: boolean, url: string, isLooped: boolean, isColor: boolean): void {
    const preloadSlot = document.querySelector(".preload");
    if (!preloadSlot) {
        console.error("No preload slot found! transitions.ts");
        return;
    }

    preloadSlot.innerHTML = "";

    if (isVideo) {
        const bg = document.createElement("div");
        bg.style.backgroundColor = "black";
        bg.style.width = "100%";
        bg.style.height = "100%";

        const video = document.createElement("video");
        video.src = url;
        video.muted = true;
        video.preload = "auto";
        video.loop = isLooped;
        video.crossOrigin = "anonymous";

        bg.appendChild(video);
        preloadSlot.appendChild(bg);
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
    const bg = document.createElement("div");
    bg.style.backgroundColor = "black";
    bg.style.width = "100%";
    bg.style.height = "100%";

    const img = document.createElement("img");
    img.src = url;

    bg.appendChild(img);
    preloadSlot.appendChild(bg);
}

export function mainTransition(): void {
    const newSlot = document.querySelector(".preload");
    const oldSlot = document.querySelector(".visible");

    document.documentElement.style.setProperty('--fade-duration', `${currentDuration}ms`);

    if (!newSlot || !oldSlot) {
        console.error("!newSlot || !oldSlot -> transitions.ts");
        return;
    }

    // new preload slot
    const newPreloadSlot = document.querySelector(".hidden");
    newPreloadSlot?.classList.remove("hidden");
    newPreloadSlot?.classList.add("preload");

    oldSlot.classList.add("hidden");
    oldSlot.classList.remove("visible");
    newSlot.classList.remove("preload");
    newSlot.classList.add("visible");
}

export function secTransition(): void {

}