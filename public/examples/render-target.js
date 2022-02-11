import * as THREE from '/lib/three'

const elCanvas = document.getElementById(`canvas`)

const renderer = new THREE.WebGLRenderer({ canvas: elCanvas })
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
camera.position.z = 3

const light = new THREE.DirectionalLight(0xFFFFFF, 1)
light.position.set(0, 2, 2)
scene.add(light)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

///////////////////////////////////////////////////////////////////////////////
// RENDER TARGET
///////////////////////////////////////////////////////////////////////////////

const renderTarget = new THREE.WebGLRenderTarget(512, 512)

const targetCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
targetCamera.position.z = 2

const targetScene = new THREE.Scene()
targetScene.background = new THREE.Color(`#0F0`)

const targetLight = new THREE.DirectionalLight(0xFFFFFF, 1)
targetLight.position.set(0, 2, 0)
targetScene.add(targetLight)

function addMesh(color, x)
{
    const material = new THREE.MeshPhongMaterial({ map: renderTarget.texture })
    const mesh = new THREE.Mesh(boxGeometry, material)
    mesh.position.x = x
    scene.add(mesh)
    return mesh
}

function addTargetMesh(color, x)
{
    const material = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(boxGeometry, material)
    mesh.position.x = x
    targetScene.add(mesh)
    return mesh
}

const meshes =
[
    addMesh(0x00FF00, 0),
    addTargetMesh(0xFFFF00, 2),
    addTargetMesh(0x00FFFF, 0),
    addTargetMesh(0xFF00FF, -2)
]

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
    renderer.setRenderTarget(renderTarget)
    renderer.render(targetScene, targetCamera)
    renderer.setRenderTarget(null)
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

requestAnimationFrame(render)