window.addEventListener('DOMContentLoaded', init);

function init() {
    // Create a scene, camera, and renderer as before
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create the geometry for the globe
    var geometry = new THREE.SphereGeometry(5, 32, 32);

    // Create a variable to store the mouse coordinates
    var mouse = { x: 0, y: 0 };

    // Create a variable to store the previous mouse position
    var prevMouse = { x: 0, y: 0 };

    // Create a variable to store the rotation speed
    var rotationSpeed = 0.005;

    // Create a variable to track if the mouse is being dragged
    var isDragging = false;

    // Start the idle rotation
    var idleRotation = {
        x: rotationSpeed,
        y: rotationSpeed
    };

    // Load the Earth texture
    var texture = new THREE.TextureLoader().load('https://jz1324.github.io/Earth/earth_texture.jpg');

    // Create a material with the Earth texture
    var material = new THREE.MeshBasicMaterial({ map: texture });

    // Create a mesh with the geometry and material
    var globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add event listeners for mouse movements
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    function handleMouseMove(event) {
        // Update the mouse coordinates based on the mouse movement
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }

    function handleMouseDown(event) {
        // Prevent default browser behavior to avoid text selection
        event.preventDefault();

        // Start dragging
        isDragging = true;

        // Store the initial mouse position
        prevMouse.x = event.clientX;
        prevMouse.y = event.clientY;
    }

    function handleMouseUp(event) {
        // Stop dragging
        isDragging = false;
    }

    // Create an animation loop to continuously render the scene
    function animate() {
        requestAnimationFrame(animate);

        // Calculate the distance moved by the mouse
        var deltaX = mouse.x - prevMouse.x;
        var deltaY = mouse.y - prevMouse.y;

        // Update the globe's rotation based on the mouse movement when dragging
        if (isDragging) {
            globe.rotation.y += deltaX * rotationSpeed;
            globe.rotation.x += deltaY * rotationSpeed;
        } else {
            // Apply idle rotation when not dragging
            globe.rotation.y += idleRotation.x;
            globe.rotation.x += idleRotation.y;
        }

        // Update the previous mouse position
        prevMouse.x = mouse.x;
        prevMouse.y = mouse.y;

        // Render the scene
        renderer.render(scene, camera);
    }

    // Start the animation loop
    animate();
}
