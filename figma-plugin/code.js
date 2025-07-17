figma.showUI(__html__, { visible: false });

const backendUrl = 'http://localhost:3000/data';

setInterval(() => {
  fetch(backendUrl)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      if (data) {
        const { imageUrl, textContent, x, y } = data;

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
      }
    })
    .catch(error => {
      console.error('Error polling backend:', error);
    });
}, 5000); // Poll every 5 seconds
