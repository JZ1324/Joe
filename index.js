window.addEventListener('DOMContentLoaded', init);

function init() {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('globe').appendChild(renderer.domElement);

    // Create a sphere geometry
    const geometry = new THREE.SphereGeometry(2, 32, 32);

    // Load a texture for the globe
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('earth_texture.jpg');

    // Create a material with the texture
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Create a mesh with the geometry and material
    const globe = new THREE.Mesh(geometry, material);

    // Add the mesh to the scene
    scene.add(globe);

    // Render the scene
    function render() {
        requestAnimationFrame(render);
        globe.rotation.y += 0.005;
        renderer.render(scene, camera);
    }

    render();
}
