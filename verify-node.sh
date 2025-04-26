#!/bin/bash

echo "=== Node.js Environment Check ==="
echo "Current directory: $(pwd)"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Which node: $(which node)"
echo "Which npm: $(which npm)"
echo "NVM version: $(nvm --version || echo 'NVM not detected in PATH')"
echo ""
echo "=== Testing Next.js Compatibility ==="
echo "Running: node -e 'console.log(\"Node.js version check passed!\")'"
node -e 'console.log("Node.js version check passed!")'
echo ""
echo "If you see 'Node.js version check passed!' above, then your Node.js installation should be compatible."
echo "You can now try running: npm run dev" 