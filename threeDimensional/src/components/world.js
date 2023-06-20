import * as THREE from 'three'
import Stats from 'stats.js'
import galaxyVertexShader from './vertex.js'
import galaxyFragmentShader from './fragment.js'

export let clock,
  scene,
  camera,
  renderer,
  stats,
  particleGroup,
  particleAttributes,
  particleSystemObject,
  lensFlareObject,
  galaxyClock

export let manager = new THREE.LoadingManager()

export function createWorld(_3DContainer) {
  clock = new THREE.Clock()
  galaxyClock = new THREE.Clock()

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  const axes = new THREE.AxesHelper(100)
  scene.add(axes)

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    5000,
  )
  camera.position.set(0, 30, 70)

  let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.9)
  hemiLight.color.setHSL(0.6, 0.6, 0.6)
  hemiLight.groundColor.setHSL(0.1, 1, 0.4)
  hemiLight.position.set(0, 30, 0)
  scene.add(hemiLight)

  let dirLight = new THREE.DirectionalLight(0xffffff, 0.7)
  dirLight.color.setHSL(0.1, 1, 0.95)
  dirLight.position.set(-10, 100, 50)
  dirLight.position.multiplyScalar(100)
  scene.add(dirLight)

  dirLight.castShadow = true

  dirLight.shadow.mapSize.width = 4096
  dirLight.shadow.mapSize.height = 4096

  let d = 200

  dirLight.shadow.camera.left = -d
  dirLight.shadow.camera.right = d
  dirLight.shadow.camera.top = d
  dirLight.shadow.camera.bottom = -d

  dirLight.shadow.camera.far = 15000

  renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  _3DContainer.current.appendChild(renderer.domElement)
  stats = new Stats()
  _3DContainer.current.appendChild(stats.dom)

  renderer.gammaInput = true
  renderer.gammaOutput = true

  renderer.shadowMap.enabled = true
}

export function addParticles() {
  const geometry = new THREE.BufferGeometry()
  const arr = new Array()

  for (let i = 0; i < 10000; i++) {
    const x = getRandomArbitrary(-1100, 1100)
    const y = getRandomArbitrary(-2500, 2500)
    const z = getRandomArbitrary(-1100, -500)
    arr.push(x, y, z)
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3))

  var material = new THREE.PointsMaterial({ size: 3 })
  particleSystemObject = new THREE.Points(geometry, material)

  scene.add(particleSystemObject)
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

export let galaxyMaterial = null
export let galaxyPoints = null

export const generateGalaxy = () => {
  const parameters = {
    count: 50000,
    size: 0.005,
    radius: 100,
    branches: 3,
    spin: 1,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
    randomness: 0.2,
  }

  let geometry = null
  galaxyMaterial = null
  galaxyPoints = null
  if (galaxyPoints !== null) {
    geometry.dispose()
    galaxyMaterial.dispose()
    scene.remove(galaxyPoints)
  }

  /**
   * Geometry
   */
  geometry = new THREE.BufferGeometry()

  const positions = new Float32Array(parameters.count * 3)
  const randomness = new Float32Array(parameters.count * 3)

  const colors = new Float32Array(parameters.count * 3)
  const scales = new Float32Array(parameters.count * 1)

  const insideColor = new THREE.Color(parameters.insideColor)
  const outsideColor = new THREE.Color(parameters.outsideColor)

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3

    // Position
    const radius = Math.random() * parameters.radius

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius -
      50

    positions[i3] = Math.cos(branchAngle) * radius
    positions[i3 + 1] = 0
    positions[i3 + 2] = Math.sin(branchAngle) * radius

    randomness[i3] = randomX
    randomness[i3 + 1] = randomY
    randomness[i3 + 2] = randomZ

    // Color
    const mixedColor = insideColor.clone()
    mixedColor.lerp(outsideColor, radius / parameters.radius)

    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b

    // Scale
    scales[i] = Math.random()
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
  geometry.setAttribute(
    'aRandomness',
    new THREE.BufferAttribute(randomness, 3),
  )

  /**
   * Material
   */
  galaxyMaterial = new THREE.ShaderMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: galaxyVertexShader,
    fragmentShader: galaxyFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 30 * renderer.getPixelRatio() },
    },
  })

  /**
   * Points
   */
  galaxyPoints = new THREE.Points(geometry, galaxyMaterial)
  galaxyPoints.position.y = -50
  scene.add(galaxyPoints)
}
