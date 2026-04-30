import fs from "node:fs"

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
    path: "./src/StartingWindow/index.html",
    pattern: /Screen Ellophant \d+\.\d+\.\d+/,
    replacement: `Screen Ellophant ${newVersion}`,
  },
];

filesToUpdate.forEach((file) => {
  if (fs.existsSync(file.path)) {
    let content = fs.readFileSync(file.path, "utf8");
    content = content.replace(file.pattern, file.replacement);
    fs.writeFileSync(file.path, content);
    console.log(`✅ Updated ${file.path} to ${newVersion}`);
  } else {
    console.error(`❌ File not found: ${file.path}`);
  }
});
