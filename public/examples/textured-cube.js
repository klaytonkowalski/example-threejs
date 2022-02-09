import * as THREE from '/build/three.module.js'

const elCanvas = document.getElementById(`canvas`)

const renderer = new THREE.WebGLRenderer({ canvas: elCanvas })

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
camera.position.z = 3

const light = new THREE.DirectionalLight(0xFFFFFF, 1)
light.position.set(0, 2, 2)
scene.add(light)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const meshes = []

///////////////////////////////////////////////////////////////////////////////
// TEXTURES, LOADING
///////////////////////////////////////////////////////////////////////////////

const loadingManager = new THREE.LoadingManager()

loadingManager.onLoad = () =>
{
    const mesh = new THREE.Mesh(boxGeometry, materials)
    scene.add(mesh)
    meshes.push(mesh)
}

loadingManager.onProgress = (url, count, total) =>
{
    console.log(url, count, total)
}

const loader = new THREE.TextureLoader(loadingManager)

const textures = []
const materials = []

for (let i = 0; i < 6; ++i)
{
    const texture = loader.load(`../assets/texture-${i + 1}.png`)
    texture.magFilter = THREE.NearestFilter
    textures.push(texture)
    materials.push(new THREE.MeshBasicMaterial({ map: texture }))
}

///////////////////////////////////////////////////////////////////////////////

function checkResize()
{
    return elCanvas.width != elCanvas.clientWidth || elCanvas.height != elCanvas.clientHeight
}

function render(dt)
{
    if (checkResize())
    {
        renderer.setSize(elCanvas.clientWidth, elCanvas.clientHeight, false)
        camera.aspect = elCanvas.clientWidth / elCanvas.clientHeight
        camera.updateProjectionMatrix();
    }
    for (const mesh of meshes)
    {
        mesh.rotation.x = dt * 0.001
        mesh.rotation.y = dt * 0.001
    }
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

requestAnimationFrame(render)