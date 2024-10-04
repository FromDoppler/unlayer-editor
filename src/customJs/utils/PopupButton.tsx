import { useEffect } from 'react';

const PopupButton = () => {
  useEffect(() => {
    console.log('PopupButton');
    // Function to add the button
    const addButton = () => {
      // Step 1: Select the container
      const popupContainer = document.querySelector('u-popup-container');
      console.log("popupContainer: ", popupContainer)
      // Check if the container exists
      if (popupContainer) {
        // Step 2: Create a new button element
        const button = document.createElement('button');

        // Step 3: Set attributes and content for the button
        button.type = 'button';
        button.className = 'my-custom-button';
        button.innerText = 'My Custom Button';

        // Optionally, add an onclick event to the button
        button.onclick = function() {
          alert('Button clicked!');
        };

        // Step 4: Append the button to the container
        popupContainer.appendChild(button);
      }
    };

    // Call the function to add the button
    addButton();
  }, []); // Empty dependency array ensures this runs once after the initial render

  return null; // This component does not render anything by itself
};

export default PopupButton;
