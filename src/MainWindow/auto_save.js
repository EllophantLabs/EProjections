const { invoke } = window.__TAURI__.core;
const { exists } = window.__TAURI__.fs;
const { listen } = window.__TAURI__.event;

let error = false;

listen("load_save", () => {
  load_save();
});

import { layout } from "./ui_action_grid.js";
import {
  addGridTemplates,
  addAssetsToTemplate,
  addColorToTemplate,
  addGhostMoveTemplate,
} from "./ui_action_grid.js";

export async function auto_save() {
  let saveData = [];

  if (layout.length < 1) {
    invoke("save_empty_layout");
    return;
  }

  // loop over every element in layout (media grid)
  for (const id of layout) {
    // set to default values
    const element = document.getElementById(id);
    const is_empty = element.empty;
    let name = "x";
    let src = "x";
    let imgSrc = "x";
    let is_color = false;
    let is_video = false;
    let is_looped = false;

    // configure data-attributes
    if (!is_empty) {
      is_color = element.is_color;
      src = element.src;
      is_video = element.isVideo;
      is_looped = element.isLooped;
      if (!is_color) {
        is_color = false;
        name = element.name;
        imgSrc = element.imgSrc;
      }
    }

    // layout for data transfer and auto save
    const struct = {
      url: src,
      name: name,
      img_src: imgSrc,
      is_color: is_color,
      is_empty: is_empty,
      is_video: is_video,
      is_looped: is_looped,
    };

    saveData.push(struct); // push data for item from layout
  }
  console.log("Autosave frontend!");
  console.log(saveData);
  invoke("save_layout", { layout: saveData });
}

export async function load_save() {
  error = false;
  let result = await invoke("load_layout");

  // no saved data
  if (result[0] == "") {
    // create empty default setup
    addGridTemplates(10);
    addGhostMoveTemplate();
    return;
  }

  // add grids for each element
  let len = result.length;
  addGridTemplates(len);
  addGhostMoveTemplate();

  let id = 1;

  // loop over save data
  for (const array of result) {
    // get data-attributes
    let { url, name, img_src, is_color, is_empty, is_video, is_looped } = array;
    // when empty -> leave grid empty and skip over
    if (is_empty) {
      id++;
      continue;
    }

    const element = document.getElementById("template-" + id);
    if (!element) {
      continue;
    }

    if (is_color) {
      // add color
      addColorToTemplate(url, element);
    } else {
      // check if url is valid
      const isValid = await isSrcValid(url);
      // react to missing file
      if (!isValid) {
        name = "Fehlende Datei!";
        error = true;
        url = "missing url";
      }
      // add element
      element.isVideo = is_video;
      element.isLooped = is_looped;
      addAssetsToTemplate(name, url, img_src, element);
    }
    id++;
  }

  if (error) {
    alert("Dateien wurden nicht gefunden!");
  }
}

async function isSrcValid(src) {
  let path = await invoke("get_file_src", { fileName: src });
  try {
    return await exists(path);
  } catch (err) {
    return false;
  }
}
