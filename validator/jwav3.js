/**
 * jwav3.js - JWAV3 Standards Validator (Strict)
 */
const fs = require('fs');
const path = require('path');

function checkBundleSize() {
  const root = './';
  let totalSize = 0;

  function getFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const name = path.join(dir, file);
      if (fs.statSync(name).isDirectory()) {
        if (!name.includes('.git') && !name.includes('node_modules')) {
          getFiles(name);
        }
      } else {
        totalSize += fs.statSync(name).size;
      }
    }
  }

  getFiles(root);
  const sizeKB = totalSize / 1024;
  console.log(`Total bundle size: ${sizeKB.toFixed(2)} KB`);
  return sizeKB < 50;
}

function checkCSP() {
  const index = fs.readFileSync('index.html', 'utf8');
  const hasCSP = index.includes('http-equiv="Content-Security-Policy"');
  console.log(`CSP Meta Tag: ${hasCSP ? 'PASS' : 'FAIL'}`);
  return hasCSP;
}

function checkSemanticTags() {
  const index = fs.readFileSync('index.html', 'utf8');
  const mandatoryTags = ['<header', '<nav', '<main', '<section', '<article', '<aside', '<footer'];
  let allPass = true;

  mandatoryTags.forEach(tag => {
    const present = index.includes(tag);
    console.log(`Tag ${tag}: ${present ? 'PASS' : 'FAIL'}`);
    if (!present) allPass = false;
  });

  return allPass;
}

function validate() {
  console.log('--- JWAV3 VALIDATOR ---');
  const bundlePass = checkBundleSize();
  const cspPass = checkCSP();
  const semanticPass = checkSemanticTags();

  if (bundlePass && cspPass && semanticPass) {
    console.log('STATUS: pass');
  } else {
    console.log('STATUS: fail');
    process.exit(1);
  }
}

validate();
