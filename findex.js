window.addEventListener('DOMContentLoaded', init);

function init() {
    // Create a scene
    var scene = new THREE.Scene();

    // Create a camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a globe geometry
    var geometry = new THREE.SphereGeometry(1, 32, 32);

    // Create a material with a texture
    var texture = new THREE.TextureLoader().load('https://jz1324.github.io/Earth/earth_texture.jpg');
    var material = new THREE.MeshBasicMaterial({ map: texture });

    // Create a mesh with the geometry and material
    var globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Create a variable to store the mouse coordinates
    var mouse = { x: 0, y: 0 };

    // Create a variable to store the previous mouse position
    var prevMouse = { x: 0, y: 0 };

    // Add event listeners for mouse movements
    document.addEventListener('mousemove', handleMouseMove);

    function handleMouseMove(event) {
        // Update the mouse coordinates based on the mouse movement
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }

    // Create a variable to store the rotation speed
    var rotationSpeed = 0.005;

    // Create a variable to store the idle rotation
    var idleRotation = { x: 0, y: 0 };

    // Create an animation loop to continuously render the scene
    function animate() {
        requestAnimationFrame(animate);

        // Calculate the distance moved by the mouse
        var deltaX = mouse.x - prevMouse.x;
        var deltaY = mouse.y - prevMouse.y;

        // Update the globe's rotation based on the mouse movement
        globe.rotation.y += deltaX * rotationSpeed;
        globe.rotation.x += deltaY * rotationSpeed;

        // Update the previous mouse position
        prevMouse.x = mouse.x;
        prevMouse.y = mouse.y;

        // If the mouse is not moving, apply idle rotation
        if (deltaX === 0 && deltaY === 0) {
            globe.rotation.y += idleRotation.x;
            globe.rotation.x += idleRotation.y;
        } else {
            // Store the idle rotation based on the last mouse movement
            idleRotation.x = deltaX * rotationSpeed;
            idleRotation.y = deltaY * rotationSpeed;
        }

        // Render the scene
        renderer.render(scene, camera);
    }

    // Start the animation loop
    animate();
}
