import * as THREE from '/three/three.module.js'

const elCanvas = document.getElementById('canvas')

const renderer = new THREE.WebGLRenderer({ canvas: elCanvas })
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
camera.position.set(0, 50, 0)
camera.lookAt(0, 0, 0)

const light = new THREE.PointLight(0xFFFFFF, 1);
scene.add(light)

const objects = []

const sphereGeometry = new THREE.SphereGeometry(1, 8, 8)

const solarSystem = new THREE.Object3D()
scene.add(solarSystem)
objects.push(solarSystem)

const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 })
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
sunMesh.scale.set(5, 5, 5)
solarSystem.add(sunMesh)
objects.push(sunMesh)

const earthOrbit = new THREE.Object3D()
earthOrbit.position.x = 16
solarSystem.add(earthOrbit)
objects.push(earthOrbit)

const earthMaterial = new THREE.MeshPhongMaterial({ emissive: 0x000088, color: 0x4444FF })
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
earthMesh.scale.set(2, 2, 2)
earthOrbit.add(earthMesh)

const moonOrbit = new THREE.Object3D()
moonOrbit.position.x = 4
earthOrbit.add(moonOrbit)
objects.push(moonOrbit)

const moonMaterial = new THREE.MeshPhongMaterial({ emissive: 0x444444, color: 0xBBBBBB })
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
moonMesh.scale.set(0.5, 0.5, 0.5)
moonOrbit.add(moonMesh)

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
    for (const object of objects)
    {
        object.rotation.y = dt * 0.001
    }
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

requestAnimationFrame(render)