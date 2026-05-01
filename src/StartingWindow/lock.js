// for locking the start while updating
const { listen } = window.__TAURI__.event;

// no valid update is found!
listen("start_unlock", (event) => {
  const lowerContainer = document.getElementById("lowerContainer");
  lowerContainer.style.visibility = "visible";

  const status = document.getElementById("status");

  if (event.payload) {
    status.innerText = "-aktuellste Version ✓-";
    return;
  }
  status.innerText = "-keine Internetverbindung-";
});

// update found, locking for update!
listen("start_update", (event) => {
  const title = document.getElementById("title");
  const status = document.getElementById("status");

  if (event.payload) {
    title.innerText = "Screen Ellophant wird geupdated!";
    status.innerText = "Update wird heruntergeladen und installiert!";
    return;
  }
  status.innerText = "-Neues Update verfügbar!-";
  // unlock start-window
  const lowerContainer = document.getElementById("lowerContainer");
  lowerContainer.style.visibility = "visible";
});