import * as THREE from '/three/three.module.js'

const elCanvas = document.getElementById('canvas')

const renderer = new THREE.WebGLRenderer({ canvas: elCanvas })
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
camera.position.z = 3

const light = new THREE.DirectionalLight(0xFFFFFF, 1)
light.position.set(0, 2, 2)
scene.add(light)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

function addMesh(color, x)
{
    const material = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(boxGeometry, material)
    mesh.position.x = x
    scene.add(mesh)
    return mesh
}

const meshes =
[
    addMesh(0xFF0000, -2),
    addMesh(0x00FF00, 0),
    addMesh(0x0000FF, 2)
]

function render(dt)
{
    for (const mesh of meshes)
    {
        mesh.rotation.x = dt * 0.001
        mesh.rotation.y = dt * 0.001
    }
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

requestAnimationFrame(render)

console.log(scene);