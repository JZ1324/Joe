window.addEventListener('DOMContentLoaded', init);

function init() {
    // Create a scene, camera, renderer, and geometry as before
    
    // ...

    // Create a variable to store the mouse coordinates
    var mouse = { x: 0, y: 0 };

    // Add event listeners for mouse movements
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Prevent scrolling on the website
    document.body.style.overflow = 'hidden';

    function handleMouseMove(event) {
        // Update the mouse coordinates based on the mouse movement
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }

    function handleMouseDown(event) {
        // Prevent default browser behavior to avoid text selection
        event.preventDefault();

        // Add event listener for mouse movement while dragging
        document.addEventListener('mousemove', handleDrag);
    }

    function handleMouseUp(event) {
        // Remove the event listener for mouse movement while dragging
        document.removeEventListener('mousemove', handleDrag);
    }

    function handleDrag(event) {
        // Calculate the distance moved by the mouse
        var deltaX = event.clientX - mouse.x;
        var deltaY = event.clientY - mouse.y;

        // Update the globe's rotation based on the mouse movement
        globe.rotation.y += deltaX * 0.01;
        globe.rotation.x += deltaY * 0.01;

        // Update the mouse coordinates
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }

    // Render the scene as before

    // ...
}
