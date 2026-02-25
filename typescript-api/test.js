#!/usr/bin/env node
/**
 * Simple CLI test tool for C2PA API
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const API_URL = 'http://localhost:3000/api/detect';

// Get file path from command line
const filePath = process.argv[2];

if (!filePath) {
  console.log('Usage: node test.js <image-file>');
  console.log('Example: node test.js ../examples/ChatGPT_Image.png');
  process.exit(1);
}

// Check if file exists
if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found: ${filePath}`);
  process.exit(1);
}

// Read file
const fileBuffer = fs.readFileSync(filePath);
const fileName = path.basename(filePath);
const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);

// Build multipart form data
const parts = [];
parts.push(`--${boundary}\r\n`);
parts.push(`Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n`);
parts.push(`Content-Type: image/png\r\n\r\n`);

const header = Buffer.from(parts.join(''));
const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
const body = Buffer.concat([header, fileBuffer, footer]);

// Make request
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/detect',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': body.length,
  },
};

console.log(`\nTesting: ${fileName}`);
console.log('Sending request to API...\n');

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      console.error('Error parsing response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
  console.error('\nMake sure the server is running: npm run dev');
});

req.write(body);
req.end();
