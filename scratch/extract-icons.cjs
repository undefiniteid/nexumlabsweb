const si = require('simple-icons');

const targets = [
  'siDotnet',
  'siOpenai',
  'siJavascript',
  'siWhatsapp',
  'siGmail',
  'siN8n',
  'siReact',
  'siNodedotjs'
];

targets.forEach(target => {
  const icon = si[target];
  if (icon) {
    console.log(`ID: ${target}`);
    console.log(`HEX: #${icon.hex}`);
    console.log(`PATH: ${icon.path}`);
    console.log('---');
  } else {
    console.log(`ID: ${target} NOT FOUND`);
  }
});
