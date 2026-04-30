import {fs} from "fs";

const newVersion = process.env.npm_package_version;

const filesToUpdate = [
  {
    path: "./updater.json",
    pattern: /"version": ".*?"/g,
    replacement: `"version": "${newVersion}"`,
  },
  {
    path: "./src-tauri/tauri.conf.json",
    pattern: /"version": ".*?"/,
    replacement: `"version": "${newVersion}"`,
  },
  {
    path: "./StartingWindow/index.html",
    pattern: /v\d+\.\d+\.\d+/,
    replacement: `v${newVersion}`,
  },
];

filesToUpdate.forEach((file) => {
  if (fs.existsSync(file.path)) {
    let content = fs.readFileSync(file.path, "utf8");
    content = content.replace(file.pattern, file.replacement);
    fs.writeFileSync(file.path, content);
    console.log(`Updated ${file.path} to ${newVersion}`);
  }
});
