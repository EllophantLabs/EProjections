import fs from "fs";
import path from "path";

const configPath = path.resolve("./src-tauri/tauri.conf.json");

try {
  const fileData = fs.readFileSync(configPath, "utf-8");
  const config = JSON.parse(fileData);

  console.log(`Aktuelle App-Version: v${config.version}`);
} catch (error) {
  console.error("Fehler beim Lesen der tauri.conf.json:", error.message);
}
