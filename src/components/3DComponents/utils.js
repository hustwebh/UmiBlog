import * as THREE from 'three';
import { camera, renderer, scene } from './world';
// import { cursorHoverObjects } from '../app';

export const pickPosition = { x: 0, y: 0 };

export function rotateCamera(ballPosition) {
  // current camera position
  let camPos = new THREE.Vector3(
    camera.position.x,
    camera.position.y,
    camera.position.z
  );

  // target camera position
  let targetPos;

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
      ballPosition.position.z + 40
    );
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
      ballPosition.position.z + 40
    );
  }

  //3
  else if (ballPosition.position.z > 50) {
    targetPos = new THREE.Vector3(
      ballPosition.position.x,
      ballPosition.position.y + 10,
      ballPosition.position.z + 40
    );
  }

  // revert back to original angle
  else {
    targetPos = new THREE.Vector3(
      ballPosition.position.x,
      ballPosition.position.y + 30,
      ballPosition.position.z + 60
    );
  }

  camPos.lerp(targetPos, 0.033);
  camera.position.copy(camPos);
  camera.lookAt(ballPosition.position);
}