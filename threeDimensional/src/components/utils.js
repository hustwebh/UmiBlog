import * as THREE from 'three'
import { camera, renderer, scene } from './world'
// import { cursorHoverObjects } from '../pages'

export const pickPosition = { x: 0, y: 0 }

export function rotateCamera(ballPosition) {
  // current camera position
  let camPos = new THREE.Vector3(
    camera.position.x,
    camera.position.y,
    camera.position.z,
  )

  // target camera position
  let targetPos

  //1
  if (
    (ballPosition.position.x < 77 &&
      ballPosition.position.x > 42 &&
      ballPosition.position.z > -20 &&
      ballPosition.position.z < 40) ||
    (ballPosition.position.x < -2 && ballPosition.position.z < -28) ||
    (ballPosition.position.x < -25 &&
      ballPosition.position.x > -70 &&
      ballPosition.position.z > -10 &&
      ballPosition.position.z < 40)
  ) {
    targetPos = new THREE.Vector3(
      ballPosition.position.x,
      ballPosition.position.y + 50,
      ballPosition.position.z + 40,
    )
  }

  //2
  else if (
    ballPosition.position.x > -3 &&
    ballPosition.position.x < 22 &&
    ballPosition.position.z > 31 &&
    ballPosition.position.z < 58
  ) {
    targetPos = new THREE.Vector3(
      ballPosition.position.x,
      ballPosition.position.y + 50,
      ballPosition.position.z + 40,
    )
  }

  //3
  else if (ballPosition.position.z > 50) {
    targetPos = new THREE.Vector3(
      ballPosition.position.x,
      ballPosition.position.y + 10,
      ballPosition.position.z + 40,
    )
  }

  // revert back to original angle
  else {
    targetPos = new THREE.Vector3(
      ballPosition.position.x,
      ballPosition.position.y + 30,
      ballPosition.position.z + 60,
    )
  }

  camPos.lerp(targetPos, 0.033)
  camera.position.copy(camPos)
  camera.lookAt(ballPosition.position)
}

export function getCanvasRelativePosition(event) {
  const rect = renderer.domElement.getBoundingClientRect()
  return {
    x: ((event.clientX - rect.left) * renderer.domElement.width) / rect.width,
    y: ((event.clientY - rect.top) * renderer.domElement.height) / rect.height,
  }
}

export function launchClickPosition(event) {
  const pos = getCanvasRelativePosition(event)
  pickPosition.x = (pos.x / renderer.domElement.width) * 2 - 1
  pickPosition.y = (pos.y / renderer.domElement.height) * -2 + 1 // note we flip Y

  // cast a ray through the frustum
  const myRaycaster = new THREE.Raycaster()
  myRaycaster.setFromCamera(pickPosition, camera)
  // get the list of objects the ray intersected
  const intersectedObjects = myRaycaster.intersectObjects(scene.children)
  if (intersectedObjects.length) {
    // pick the first object. It's the closest one
    const pickedObject = intersectedObjects[0].object
    if (intersectedObjects[0].object.userData.URL) {
      // window.open(intersectedObjects[0].object.userData.URL)
      console.log(intersectedObjects[0].object.userData.URL)
      let newWindow = window.open(' ', '_blank')
      newWindow.location.href = intersectedObjects[0].object.userData.URL
    }
  }
  else {
    return
  }
}
