import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { scene, manager } from './world';

export function floatingLabel(x, y, z, inputMessage) {
  let text_loader = new FontLoader();

  const fontUrl = './Roboto_Regular.json';
  text_loader.load(fontUrl, function (font) {
    let xMid, text;

    let color = 0xffffff;

    let matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });

    let message = inputMessage;

    let shapes = font.generateShapes(message, 1);

    let geometry = new THREE.ShapeBufferGeometry(shapes);

    geometry.computeBoundingBox();

    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 0, 0);

    // make shape ( N.B. edge view not visible )

    text = new THREE.Mesh(geometry, matLite);
    text.position.z = z;
    text.position.y = y;
    text.position.x = x;
    scene.add(text);
  });
}
