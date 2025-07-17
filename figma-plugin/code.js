figma.showUI(__html__);

const webhookUrl = 'https://n8n.duda.co/webhook/12345-67890-12345-67890';

figma.ui.postMessage({ type: 'webhookUrl', url: webhookUrl });

let n8nData = null;

setInterval(() => {
  if (n8nData) {
    const { imageUrl, textContent, x, y } = n8nData;

    try {
      if (imageUrl) {
        figma.createImageAsync(imageUrl)
          .then(image => {
            const node = figma.createRectangle();
            node.x = x;
            node.y = y;
            node.resize(150, 150);
            node.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash }];
            figma.currentPage.appendChild(node);
          })
          .catch(error => {
            figma.notify(`Error creating image: ${error.message}`);
          });
      }

      if (textContent) {
        figma.loadFontAsync({ family: 'Roboto', style: 'Regular' })
          .then(() => {
            const text = figma.createText();
            text.x = x;
            text.y = y + 160; // Position the text below the image
            text.characters = textContent;
            figma.currentPage.appendChild(text);
          })
          .catch(error => {
            figma.notify(`Error creating text: ${error.message}`);
          });
      }
    } catch (error) {
      figma.notify(`An unexpected error occurred: ${error.message}`);
    } finally {
      n8nData = null;
      figma.closePlugin();
    }
  }
}, 1000);

// This is a mock function to simulate receiving data from n8n
function receiveN8nData(data) {
  n8nData = data;
}

// Example of how the n8n node would send data to the plugin
setTimeout(() => {
  receiveN8nData({
    imageUrl: 'https://via.placeholder.com/150',
    textContent: 'This is a test',
    x: 100,
    y: 100,
  });
}, 5000);
