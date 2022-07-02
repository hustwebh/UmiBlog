import styles from './index.less';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { useEffect, useRef } from 'react';
import Ammo from 'ammojs-typed';

import {
  createWorld,
  createLensFlare,
  scene,
  stats,
  clock,
  galaxyClock,
  manager,
  addParticles,
  glowingParticles,
  generateGalaxy,
  renderer,
  camera,
  galaxyMaterial,
} from '@/components/3DComponents/world.js';

import {
  setupEventHandlers,
  moveDirection,
} from '@/components/3DComponents/eventHandler.js'

import {
  rotateCamera
} from '@/components/3DComponents/utils.js'

import earthImg from '@/assets/earth.jpg'
// import FONTJSON from '@/assets/Roboto_Regular.json'

export default function IndexPage() {

  const _3DContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    Ammo().then((Ammo) => {
      let rigidBodies: any[] = [],
        physicsWorld: any;


      let ballObject: any = null;
      const STATE = { DISABLE_DEACTIVATION: 4 };

      let tmpTrans = new Ammo.btTransform();

      let objectsWithLinks = [];

      const createPhysicsWorld = () => {

        let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
          dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
          overlappingPairCache = new Ammo.btDbvtBroadphase(), 
          constraintSolver = new Ammo.btSequentialImpulseConstraintSolver();


        physicsWorld = new Ammo.btDiscreteDynamicsWorld(
          dispatcher,
          overlappingPairCache,
          constraintSolver,
          collisionConfiguration
        );


        physicsWorld.setGravity(new Ammo.btVector3(0, -50, 0));

      }

      const createGridPlane = () => {
        let pos = { x: 0, y: -0.25, z: 0 };
        let scale = { x: 175, y: 0.5, z: 175 };
        let quat = { x: 0, y: 0, z: 0, w: 1 };
        let mass = 0;


        let grid = new THREE.GridHelper(175, 20, 0xffffff, 0xffffff);
        grid.material.opacity = 0.5;
        grid.material.transparent = true;
        grid.position.y = 0.005;
        scene.add(grid);

        let blockPlane = new THREE.Mesh(
          new THREE.BoxBufferGeometry(),
          new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.25,
          })
        );
        blockPlane.position.set(pos.x, pos.y, pos.z);
        blockPlane.scale.set(scale.x, scale.y, scale.z);
        blockPlane.receiveShadow = true;
        scene.add(blockPlane);

        let transform = new Ammo.btTransform();
        transform.setIdentity(); 
        transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
        transform.setRotation(
          new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)
        );
        let motionState = new Ammo.btDefaultMotionState(transform);

        let colShape = new Ammo.btBoxShape(
          new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5)
        );
        colShape.setMargin(0.05);

        let localInertia = new Ammo.btVector3(0, 0, 0);
        colShape.calculateLocalInertia(mass, localInertia);

        let rigidBodyStruct = new Ammo.btRigidBodyConstructionInfo(
          mass,
          motionState,
          colShape,
          localInertia
        );
        let body = new Ammo.btRigidBody(rigidBodyStruct);
        body.setFriction(10);
        body.setRollingFriction(10);

        physicsWorld.addRigidBody(body);

      }

      const createWallX = (x: number, y: number, z: number) => {
        const wallScale = { x: 0.125, y: 4, z: 175 };

        const wall = new THREE.Mesh(
          new THREE.BoxBufferGeometry(wallScale.x, wallScale.y, wallScale.z),
          new THREE.MeshStandardMaterial({
            color: 0xffffff,
            opacity: 0.25,
            transparent: true,
          })
        );

        wall.position.x = x;
        wall.position.y = y;
        wall.position.z = z;

        wall.receiveShadow = true;

        scene.add(wall);

        addRigidPhysics(wall, wallScale);
      }
      const createWallZ = (x: number, y: number, z: number) => {
        const wallScale = { x: 175, y: 4, z: 0.125 };

        const wall = new THREE.Mesh(
          new THREE.BoxBufferGeometry(wallScale.x, wallScale.y, wallScale.z),
          new THREE.MeshStandardMaterial({
            color: 0xffffff,
            opacity: 0.25,
            transparent: true,
          })
        );

        wall.position.x = x;
        wall.position.y = y;
        wall.position.z = z;

        wall.receiveShadow = true;

        scene.add(wall);

        addRigidPhysics(wall, wallScale);
      }

      //为字体添加物理性质
      const PysicleWords = (x: number, y: number, z: number) => {
        const boxScale = { x: 46, y: 3, z: 2 };
        let quat = { x: 0, y: 0, z: 0, w: 1 };
        let mass = 0;

        const linkBox = new THREE.Mesh(
          new THREE.BoxBufferGeometry(boxScale.x, boxScale.y, boxScale.z),
          new THREE.MeshPhongMaterial({
            color: 0xff6600,
          })
        );

        linkBox.position.set(x, y, z);
        linkBox.castShadow = true;
        linkBox.receiveShadow = true;
        objectsWithLinks.push(linkBox.uuid);

        addRigidPhysics(linkBox, boxScale);
      }

      const loadNameText = () => {
        let text_loader = new FontLoader();
        console.log("loadtextStart");
        const fontUrl = './Roboto_Regular.json';
        text_loader.load(fontUrl, function (font: any) {
          console.log("loading!");
          let xMid, text;

          let textMaterials = [
            new THREE.MeshBasicMaterial({ color: 0xfffc00 }), // front
            new THREE.MeshPhongMaterial({ color: 0xfffc00 }), // side
          ];

          let geometry = new TextGeometry('ZHANG YUERAN', {
            font: font,
            size: 3,
            height: 0.5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.11,
            bevelOffset: 0,
            bevelSegments: 1,
          });

          geometry.computeBoundingBox();
          geometry.computeVertexNormals();


          xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

          geometry.translate(xMid, 0, 0);

          text = new THREE.Mesh(geometry, textMaterials);
          text.position.z = -20;
          text.position.y = 0.1;
          text.receiveShadow = true;
          text.castShadow = true;
          scene.add(text);
        });
      }

      const loadWorkerText = () => {
        let text_loader = new FontLoader();

        const fontUrl = './Roboto_Regular.json';
        text_loader.load(fontUrl, function (font: any) {
          let xMid, text;

          let textMaterials = [
            new THREE.MeshBasicMaterial({ color: 0x00ff08 }), // front
            new THREE.MeshPhongMaterial({ color: 0x00ff08 }), // side
          ];

          let geometry = new TextGeometry('HUST STUDENT', {
            font: font,
            size: 1.5,
            height: 0.5,
            curveSegments: 20,
            bevelEnabled: true,
            bevelThickness: 0.25,
            bevelSize: 0.1,
          });

          geometry.computeBoundingBox();
          geometry.computeVertexNormals();

          xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

          geometry.translate(xMid, 0, 0);

          // let textGeo = new THREE.BufferGeometry().fromGeometry(geometry);

          text = new THREE.Mesh(geometry, textMaterials);
          text.position.z = -20;
          text.position.y = 0.1;
          text.position.x = 24;
          text.receiveShadow = true;
          text.castShadow = true;
          scene.add(text);
        });
      }


      const createBall = () => {
        let pos = { x: 8.75, y: 0, z: 0 };
        let radius = 2;
        let quat = { x: 0, y: 0, z: 0, w: 1 };
        let mass = 3;

        let marble_loader = new THREE.TextureLoader(manager);
        let marbleTexture = marble_loader.load(earthImg);
        marbleTexture.wrapS = marbleTexture.wrapT = THREE.RepeatWrapping;
        marbleTexture.repeat.set(1, 1);
        marbleTexture.anisotropy = 1;
        marbleTexture.encoding = THREE.sRGBEncoding;

        //threeJS Section
        let ball = (ballObject = new THREE.Mesh(
          new THREE.SphereGeometry(radius, 32, 32),
          new THREE.MeshLambertMaterial({ map: marbleTexture })
        ));

        ball.geometry.computeBoundingSphere();
        ball.geometry.computeBoundingBox();

        ball.position.set(pos.x, pos.y, pos.z);

        ball.castShadow = true;
        ball.receiveShadow = true;

        scene.add(ball);

        //Ammojs Section
        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
        transform.setRotation(
          new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)
        );
        let motionState = new Ammo.btDefaultMotionState(transform);

        let colShape = new Ammo.btSphereShape(radius);
        colShape.setMargin(0.05);

        let localInertia = new Ammo.btVector3(0, 0, 0);
        colShape.calculateLocalInertia(mass, localInertia);

        let rbInfo = new Ammo.btRigidBodyConstructionInfo(
          mass,
          motionState,
          colShape,
          localInertia
        );
        let body = new Ammo.btRigidBody(rbInfo);
        //body.setFriction(4);
        body.setRollingFriction(10);

        //set ball friction

        //once state is set to disable, dynamic interaction no longer calculated
        body.setActivationState(STATE.DISABLE_DEACTIVATION);

        physicsWorld.addRigidBody(
          body //collisionGroupRedBall, collisionGroupGreenBall | collisionGroupPlane
        );

        ball.userData.physicsBody = body;
        ballObject.userData.physicsBody = body;

        rigidBodies.push(ball);
        rigidBodies.push(ballObject);
      }

      // function createBillboard(
      //   x:number,
      //   y:number,
      //   z:number,
      //   textureImage = billboardTextures.grassImage,
      //   urlLink:string,
      //   rotation = 0
      // ) {
      //   const billboardPoleScale = { x: 1, y: 5, z: 1 };
      //   const billboardSignScale = { x: 30, y: 15, z: 1 };
    
      //   /* default texture loading */
      //   const loader = new THREE.TextureLoader(manager);
    
      //   const billboardPole = new THREE.Mesh(
      //     new THREE.BoxBufferGeometry(
      //       billboardPoleScale.x,
      //       billboardPoleScale.y,
      //       billboardPoleScale.z
      //     ),
      //     new THREE.MeshStandardMaterial({
      //       map: loader.load(woodTexture),
      //     })
      //   );
    
      //   const texture = loader.load(textureImage);
      //   texture.magFilter = THREE.LinearFilter;
      //   texture.minFilter = THREE.LinearFilter;
      //   texture.encoding = THREE.sRGBEncoding;
      //   var borderMaterial = new THREE.MeshBasicMaterial({
      //     color: 0x000000,
      //   });
      //   const loadedTexture = new THREE.MeshBasicMaterial({
      //     map: texture,
      //   });
    
      //   var materials = [
      //     borderMaterial, // Left side
      //     borderMaterial, // Right side
      //     borderMaterial, // Top side   ---> THIS IS THE FRONT
      //     borderMaterial, // Bottom side --> THIS IS THE BACK
      //     loadedTexture, // Front side
      //     borderMaterial, // Back side
      //   ];
      //   // order to add materials: x+,x-,y+,y-,z+,z-
      //   const billboardSign = new THREE.Mesh(
      //     new THREE.BoxGeometry(
      //       billboardSignScale.x,
      //       billboardSignScale.y,
      //       billboardSignScale.z
      //     ),
      //     materials
      //   );
    
      //   billboardPole.position.x = x;
      //   billboardPole.position.y = y;
      //   billboardPole.position.z = z;
    
      //   billboardSign.position.x = x;
      //   billboardSign.position.y = y + 10;
      //   billboardSign.position.z = z;
    
      //   /* Rotate Billboard */
      //   billboardPole.rotation.y = rotation;
      //   billboardSign.rotation.y = rotation;
    
      //   billboardPole.castShadow = true;
      //   billboardPole.receiveShadow = true;
    
      //   billboardSign.castShadow = true;
      //   billboardSign.receiveShadow = true;
    
      //   billboardSign.userData = { URL: urlLink };
    
      //   scene.add(billboardPole);
      //   scene.add(billboardSign);
      //   addRigidPhysics(billboardPole, billboardPoleScale);
    
      //   cursorHoverObjects.push(billboardSign);
      // }

      const moveBall = () => {
        let scalingFactor = 20;
        let moveX = moveDirection.right - moveDirection.left;
        let moveZ = moveDirection.back - moveDirection.forward;
        let moveY = 0;

        if (ballObject.position.y < 2.01) {
          moveX = moveDirection.right - moveDirection.left;
          moveZ = moveDirection.back - moveDirection.forward;
          moveY = 0;
        } else {
          moveX = moveDirection.right - moveDirection.left;
          moveZ = moveDirection.back - moveDirection.forward;
          moveY = -0.25;
        }

        // no movement
        if (moveX == 0 && moveY == 0 && moveZ == 0) return;

        let resultantImpulse = new Ammo.btVector3(moveX, moveY, moveZ);
        resultantImpulse.op_mul(scalingFactor);
        let physicsBody = ballObject.userData.physicsBody;
        physicsBody.setLinearVelocity(resultantImpulse);
      }

      const updatePhysics = (deltaTime: any) => {
        // Step world
        physicsWorld.stepSimulation(deltaTime, 10);

        // Update rigid bodies
        for (let i = 0; i < rigidBodies.length; i++) {
          let objThree: any = rigidBodies[i];
          let objAmmo = objThree.userData.physicsBody;
          let ms = objAmmo.getMotionState();
          if (ms) {
            ms.getWorldTransform(tmpTrans);
            let p = tmpTrans.getOrigin();
            let q = tmpTrans.getRotation();
            objThree.position.set(p.x(), p.y(), p.z());
            objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
          }
        }

        //check to see if ball escaped the plane
        if (ballObject.position.y < -50) {
          scene.remove(ballObject);
          createBall();
        }

        //check to see if ball is on text to rotate camera

        rotateCamera(ballObject);
      }

      const addRigidPhysics = (item: any, itemScale: any) => {
        let pos = { x: item.position.x, y: item.position.y, z: item.position.z };
        let scale = { x: itemScale.x, y: itemScale.y, z: itemScale.z };
        let quat = { x: 0, y: 0, z: 0, w: 1 };
        let mass = 0;
        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
        transform.setRotation(
          new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)
        );

        let localInertia = new Ammo.btVector3(0, 0, 0);
        let motionState = new Ammo.btDefaultMotionState(transform);
        let colShape = new Ammo.btBoxShape(
          new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5)
        );
        colShape.setMargin(0.05);
        colShape.calculateLocalInertia(mass, localInertia);
        let rbInfo = new Ammo.btRigidBodyConstructionInfo(
          mass,
          motionState,
          colShape,
          localInertia
        );
        let body = new Ammo.btRigidBody(rbInfo);
        body.setActivationState(STATE.DISABLE_DEACTIVATION);
        body.setCollisionFlags(2);
        physicsWorld.addRigidBody(body);
      }

      function renderFrame() {
        // FPS stats module
        stats.begin();

        const elapsedTime = galaxyClock.getElapsedTime() + 150;

        let deltaTime = clock.getDelta();

        moveBall();

        updatePhysics(deltaTime);


        renderer.render(scene, camera);
        stats.end();

        galaxyMaterial.uniforms.uTime.value = elapsedTime * 5;
        //galaxyPoints.position.set(-50, -50, 0); 

        // tells browser theres animation, update before the next repaint
        requestAnimationFrame(renderFrame);


      }


      const start = () => {
        createWorld(_3DContainer);
        createPhysicsWorld();
        createGridPlane();
        createBall();

        createWallX(87.5, 1.75, 0);
        createWallX(-87.5, 1.75, 0);
        createWallZ(0, 1.75, 87.5);
        createWallZ(0, 1.75, -87.5);

        PysicleWords(11.2, 1, -20);
        loadNameText();
        loadWorkerText();

        addParticles();
        // glowingParticles();
        generateGalaxy();
        setupEventHandlers();
        renderFrame();
      }

      start();
    })
  }, [1])
  return (
    <div
      style={{
        height: '100%',
        widows: '100%',
      }}
      ref={_3DContainer}
    >
    </div>
  );
}
