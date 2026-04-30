import fs from "node:fs";

const newVersion = process.env.npm_package_version;

const filesToUpdate = [
  { 
    path: './updater.json', 
    patterns: [
      { regex: /"version": ".*?"/g, replace: `"version": "${newVersion}"` },
      // Ersetzt die Version in der URL (z.B. /v0.3.5/ und _0.3.5_)
      { regex: /v\d+\.\d+\.\d+/g, replace: `v${newVersion}` },
      { regex: /_\d+\.\d+\.\d+_/g, replace: `_${newVersion}_` }
    ]
  },
  { 
    path: './src-tauri/tauri.conf.json', 
    patterns: [{ regex: /"version": ".*?"/, replace: `"version": "${newVersion}"` }]
  },
  { 
    path: './src/StartingWindow/index.html', 
    patterns: [{ regex: /Screen Ellophant \d+\.\d+\.\d+/, replace: `Screen Ellophant ${newVersion}` }]
  }
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file.path)) {
    let content = fs.readFileSync(file.path, 'utf8');
    
    // Führt alle Ersetzungen für die jeweilige Datei aus
    file.patterns.forEach(p => {
      content = content.replace(p.regex, p.replace);
    });
    
    fs.writeFileSync(file.path, content);
    console.log(`✅ Updated ${file.path}`);
  } else {
    console.error(`❌ File not found: ${file.path}`);
  }
});