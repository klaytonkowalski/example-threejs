import * as THREE from '/lib/three'
import { OrbitControls } from '/lib/orbit-controls'

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
cubeMesh.position.set(4, 5, 0)
scene.add(cubeMesh)
meshes.push(cubeMesh)

const sphereGeometry = new THREE.SphereGeometry(3, 16, 16)
const sphereMaterial = new THREE.MeshPhongMaterial({ color: `#CA8` })
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphereMesh.position.set(-4, 5, 0)
scene.add(sphereMesh)
meshes.push(sphereMesh)

///////////////////////////////////////////////////////////////////////////////
// LIGHTING
///////////////////////////////////////////////////////////////////////////////

const ambientLight = new THREE.AmbientLight(`#FFF`, 1)
// scene.add(ambientLight)

const hemisphereLight = new THREE.HemisphereLight(`#F00`, `#00F`, 1)
// scene.add(hemisphereLight)

const directionalLight = new THREE.DirectionalLight(`#FFF`, 1)
directionalLight.position.set(8, 5, 0)
// scene.add(directionalLight)
directionalLight.target.position.set(0, 4, 0)
// scene.add(directionalLight.target)

const pointLight = new THREE.PointLight(`#0F0`, 1)
pointLight.position.set(0, 2, 0)
pointLight.distance = 20
scene.add(pointLight)

const spotLight = new THREE.SpotLight(`#FF0`, 1)
spotLight.position.set(20, 10, 0)
spotLight.distance = 40
// scene.add(spotLight)
spotLight.target.position.set(2, 2, 2)
// scene.add(spotLight.target)

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