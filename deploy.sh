#!/bin/bash

# Build the React application
npm run build

# Create necessary directories on o2switch if they don't exist
ssh user@transcription.compagnies.org "mkdir -p ~/www/transcription.compagnies.org/public_html"
ssh user@transcription.compagnies.org "mkdir -p ~/www/transcription.compagnies.org/upload/fichiers"

# Deploy the built files
rsync -avz --delete dist/ user@transcription.compagnies.org:~/www/transcription.compagnies.org/public_html/
rsync -avz .htaccess user@transcription.compagnies.org:~/www/transcription.compagnies.org/public_html/
rsync -avz server/ user@transcription.compagnies.org:~/www/transcription.compagnies.org/server/
rsync -avz ecosystem.config.js user@transcription.compagnies.org:~/www/transcription.compagnies.org/

# Set correct permissions
ssh user@transcription.compagnies.org "chmod -R 755 ~/www/transcription.compagnies.org/public_html"
ssh user@transcription.compagnies.org "chmod -R 777 ~/www/transcription.compagnies.org/upload/fichiers"

# Install dependencies and start the Node.js server
ssh user@transcription.compagnies.org "cd ~/www/transcription.compagnies.org && npm install --production"
ssh user@transcription.compagnies.org "cd ~/www/transcription.compagnies.org && pm2 restart ecosystem.config.js"
