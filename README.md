# Figma n8n Connector

This project contains a Figma plugin, a backend service, and an n8n node that allow you to programmatically add images and text to your Figma files from your n8n workflows.

## Architecture

The n8n node sends a POST request to the backend service. The backend service stores the data in memory. The Figma plugin polls the backend service for new data and creates the image and text objects on the Figma canvas.

## Backend Service

### Setup

1.  Navigate to the `backend` directory.
2.  Run `npm install` to install the dependencies.
3.  Run `npm start` to start the backend service. The service will be available at `http://localhost:3000`.

## Figma Plugin

### Installation

1.  Open the Figma desktop app.
2.  Go to the "Plugins" menu and select "Development" > "Import plugin from manifest...".
3.  Select the `manifest.json` file in the `figma-plugin` directory.

### Usage

1.  Open a new Figma file.
2.  Right-click on the canvas and select "Plugins" > "n8n Connector". This will start the plugin in the background.

## n8n Node

### Installation

1.  Copy the `n8n-nodes-figma` directory to the `~/.n8n/custom` directory on your n8n server.
2.  Restart your n8n server.

### Usage

1.  Create a new n8n workflow.
2.  Add the "Figma" node.
3.  Fill in the fields with the data you want to send to Figma.
4.  Run the n8n workflow.

## Note

This is a proof of concept and has some limitations. The in-memory data store in the backend service is not persistent and will be cleared if the server restarts. For a production environment, a more robust data store like a database or a message queue would be recommended.
