import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls.js'

const elCanvas = document.getElementById(`canvas`)

const renderer = new THREE.WebGLRenderer({ canvas: elCanvas })

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
camera.position.set(0, 10, 20)

const controls = new OrbitControls(camera, elCanvas)
controls.target.set(0, 5, 0)
controls.update()

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const meshes = []

///////////////////////////////////////////////////////////////////////////////
// TEXTURES, LOADING
///////////////////////////////////////////////////////////////////////////////

const loader = new THREE.TextureLoader();
const texture = loader.load(`../assets/texture-7.png`)
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.magFilter = THREE.NearestFilter
texture.repeat.set(20, 20)

const planeGeometry = new THREE.PlaneGeometry(40, 40)
const planeMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide })
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
planeMesh.rotation.x = Math.PI * -0.5
scene.add(planeMesh)

const cubeGeometry = new THREE.BoxGeometry(3, 3, 3)
const cubeMaterial = new THREE.MeshPhongMaterial({ color: `#8AC` })
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh.position.set(3, 5, 0)
scene.add(cubeMesh)
meshes.push(cubeMesh)

const sphereGeometry = new THREE.SphereGeometry(3, 16, 16)
const sphereMaterial = new THREE.MeshPhongMaterial({ color: `#CA8` })
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphereMesh.position.set(-3, 5, 0)
scene.add(sphereMesh)
meshes.push(sphereMesh)

const ambientLight = new THREE.AmbientLight(`#FFF`, 1)
scene.add(ambientLight)

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