import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import "./MetaverseWorld.scss";
import FaIcon from "/src/components/generic/FaIcon.jsx";

export default function MetaverseWorld({ projects, onSelectProject }) {
  const containerRef = useRef(null);
  const [activeZone, setActiveZone] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isControlsHelpOpen, setIsControlsHelpOpen] = useState(true);
  const [viewMode, setViewMode] = useState("isometric"); // isometric, top, follow

  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [selectedProject]);

  // Three.js refs to avoid re-renders
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    avatar: null,
    avatarParts: {},
    keys: { w: false, a: false, s: false, d: false, space: false },
    avatarPos: new THREE.Vector3(0, 0, 5),
    avatarVelocity: new THREE.Vector3(0, 0, 0),
    avatarRotation: 0,
    targetRotation: 0,
    targetWalkPos: null,
    isJumping: false,
    jumpVelocity: 0,
    walkCycle: 0,
    booths: [],
    particles: null,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    plane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    animId: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // 1. Scene & Atmosphere (Cozy Pastel Toy World)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0fdf4);
    scene.fog = new THREE.FogExp2(0xf0fdf4, 0.012);
    stateRef.current.scene = scene;

    // 2. Camera
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(24, 28, 30);
    camera.lookAt(0, 0, 0);
    stateRef.current.camera = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 4. Lights (Warm Sunshine & Sky Ambient)
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0xdcfce7, 1.25);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
    dirLight.position.set(25, 45, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 140;
    dirLight.shadow.camera.left = -40;
    dirLight.shadow.camera.right = 40;
    dirLight.shadow.camera.top = 40;
    dirLight.shadow.camera.bottom = -40;
    scene.add(dirLight);

    // Warm soft accent lights
    const softLight1 = new THREE.PointLight(0xfbbf24, 1.8, 50);
    softLight1.position.set(-15, 8, -15);
    scene.add(softLight1);

    const softLight2 = new THREE.PointLight(0x38bdf8, 1.8, 50);
    softLight2.position.set(15, 8, 15);
    scene.add(softLight2);

    // 5. Floor: Soft Green Grass Island & Toy Cobblestone Paths
    const islandGeo = new THREE.CylinderGeometry(44, 46, 2.0, 36);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0x86efac,
      roughness: 0.85,
      metalness: 0.05,
    });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.y = -1.0;
    island.receiveShadow = true;
    scene.add(island);

    // Grid Guide
    const gridHelper = new THREE.GridHelper(80, 32, 0x4ade80, 0xbbf7d0);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // Central Cobblestone Circle
    const centerRingGeo = new THREE.CylinderGeometry(4.2, 4.6, 0.08, 24);
    const centerRingMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8 });
    const centerRing = new THREE.Mesh(centerRingGeo, centerRingMat);
    centerRing.position.y = 0.05;
    centerRing.receiveShadow = true;
    scene.add(centerRing);

    // Decorative Low-Poly Toy Trees
    const treeTrunkGeo = new THREE.CylinderGeometry(0.25, 0.35, 1.4, 8);
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.9 });
    const treeCrownGeo1 = new THREE.SphereGeometry(1.0, 8, 8);
    const treeCrownGeo2 = new THREE.SphereGeometry(0.7, 8, 8);
    const treeCrownMat1 = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.8 });
    const treeCrownMat2 = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.8 });

    const treePositions = [
      [-26, -18], [26, -18], [-28, 14], [28, 14],
      [-16, 26], [16, 26], [-18, -26], [18, -26]
    ];

    treePositions.forEach(([tx, tz]) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tx, 0, tz);

      const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
      trunk.position.y = 0.7;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const crown1 = new THREE.Mesh(treeCrownGeo1, treeCrownMat1);
      crown1.position.y = 1.8;
      crown1.castShadow = true;
      treeGroup.add(crown1);

      const crown2 = new THREE.Mesh(treeCrownGeo2, treeCrownMat2);
      crown2.position.y = 2.5;
      crown2.castShadow = true;
      treeGroup.add(crown2);

      scene.add(treeGroup);
    });

    // Floating Spring Petals
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 70;
      particlePositions[i + 1] = Math.random() * 18 + 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 70;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfb7185,
      size: 0.42,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    stateRef.current.particles = particles;

    // 6. Build Avatar (Cute Toy Mini-Figure)
    const avatar = new THREE.Group();
    avatar.position.set(0, 0, 5);

    // Shadow
    const shadowGeo = new THREE.CircleGeometry(0.75, 16);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x166534, transparent: true, opacity: 0.28 });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.03;
    avatar.add(shadow);

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.55, 0.65, 1.05, 12);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.4 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.15;
    body.castShadow = true;
    avatar.add(body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.3 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 2.05;
    head.castShadow = true;
    avatar.add(head);

    // Button Eyes
    const eyeGeo = new THREE.SphereGeometry(0.065, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.18, 2.1, 0.48);
    avatar.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.18, 2.1, 0.48);
    avatar.add(rightEye);

    // Blushing Cheeks
    const blushGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xfb7185, transparent: true, opacity: 0.75 });
    const leftBlush = new THREE.Mesh(blushGeo, blushMat);
    leftBlush.position.set(-0.28, 1.98, 0.42);
    avatar.add(leftBlush);

    const rightBlush = new THREE.Mesh(blushGeo, blushMat);
    rightBlush.position.set(0.28, 1.98, 0.42);
    avatar.add(rightBlush);

    // Beret Hat
    const hatGeo = new THREE.SphereGeometry(0.48, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const hatMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 });
    const hat = new THREE.Mesh(hatGeo, hatMat);
    hat.position.set(0, 2.4, 0);
    avatar.add(hat);

    const pompomGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const pompomMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.6 });
    const pompom = new THREE.Mesh(pompomGeo, pompomMat);
    pompom.position.set(0, 2.65, 0);
    avatar.add(pompom);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.75, 8);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 });
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-0.68, 1.15, 0);
    leftArm.castShadow = true;
    avatar.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(0.68, 1.15, 0);
    rightArm.castShadow = true;
    avatar.add(rightArm);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.65, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 });
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-0.25, 0.35, 0);
    leftLeg.castShadow = true;
    avatar.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLeg.position.set(0.25, 0.35, 0);
    rightLeg.castShadow = true;
    avatar.add(rightLeg);

    scene.add(avatar);
    stateRef.current.avatar = avatar;
    stateRef.current.avatarParts = { leftArm, rightArm, leftLeg, rightLeg, head, body, shadow };

    // 7. Build 11 Interactive Cute Project Toy Booths
    const booths = [];
    projects.forEach((proj) => {
      const zone = proj.metaverseZone || { x: 0, z: 0, color: "#10b981", tag: "PROJECT" };
      const boothGroup = new THREE.Group();
      boothGroup.position.set(zone.x, 0, zone.z);
      boothGroup.userData = { project: proj };

      // Base Pedestal (Cream Toy Base)
      const baseGeo = new THREE.CylinderGeometry(2.3, 2.7, 0.45, 16);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0xfef9c3,
        roughness: 0.7,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = 0.22;
      baseMesh.receiveShadow = true;
      boothGroup.add(baseMesh);

      // Colorful Soft Ring
      const ringGeo = new THREE.TorusGeometry(2.35, 0.08, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: zone.color });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 0.48;
      boothGroup.add(ringMesh);

      // Shop Counter Body
      const counterGeo = new THREE.BoxGeometry(1.6, 1.4, 1.2);
      const counterMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.4,
      });
      const counter = new THREE.Mesh(counterGeo, counterMat);
      counter.position.y = 1.0;
      counter.castShadow = true;
      boothGroup.add(counter);

      // Cute Canopy / Awning Roof
      const awningGeo = new THREE.ConeGeometry(1.6, 0.9, 4);
      const awningMat = new THREE.MeshStandardMaterial({ color: zone.color, roughness: 0.3 });
      const awning = new THREE.Mesh(awningGeo, awningMat);
      awning.rotation.y = Math.PI / 4;
      awning.position.y = 2.1;
      awning.castShadow = true;
      boothGroup.add(awning);

      // Rotating Cute Golden Star
      const starGeo = new THREE.OctahedronGeometry(0.75, 0);
      const starMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.55,
        roughness: 0.2,
      });
      const crystal = new THREE.Mesh(starGeo, starMat);
      crystal.position.y = 3.3;
      crystal.castShadow = true;
      boothGroup.add(crystal);

      // Floating Glow Halo around Star
      const haloGeo = new THREE.TorusGeometry(1.15, 0.035, 8, 24);
      const haloMat = new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.8 });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 3;
      halo.position.y = 3.3;
      boothGroup.add(halo);

      // Warm Point Light
      const pLight = new THREE.PointLight(zone.color, 1.4, 6);
      pLight.position.set(0, 3.2, 0);
      boothGroup.add(pLight);

      scene.add(boothGroup);
      booths.push({
        group: boothGroup,
        crystal,
        halo,
        project: proj,
        pos: new THREE.Vector3(zone.x, 0, zone.z),
      });
    });
    stateRef.current.booths = booths;

    // 8. Event Listeners (Keyboard)
    const handleKeyDown = (e) => {
      const k = e.key.toLowerCase();
      if (k === "w" || k === "arrowup") stateRef.current.keys.w = true;
      if (k === "a" || k === "arrowleft") stateRef.current.keys.a = true;
      if (k === "s" || k === "arrowdown") stateRef.current.keys.s = true;
      if (k === "d" || k === "arrowright") stateRef.current.keys.d = true;
      if (e.code === "Space") {
        if (!stateRef.current.isJumping) {
          stateRef.current.isJumping = true;
          stateRef.current.jumpVelocity = 0.28;
        }
      }
      if (k === "e" && activeZone) {
        setSelectedProject(activeZone);
      }
    };

    const handleKeyUp = (e) => {
      const k = e.key.toLowerCase();
      if (k === "w" || k === "arrowup") stateRef.current.keys.w = false;
      if (k === "a" || k === "arrowleft") stateRef.current.keys.a = false;
      if (k === "s" || k === "arrowdown") stateRef.current.keys.s = false;
      if (k === "d" || k === "arrowright") stateRef.current.keys.d = false;
    };

    // Click-to-move & Click Booth
    const handleClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      stateRef.current.mouse.set(x, y);
      stateRef.current.raycaster.setFromCamera(stateRef.current.mouse, camera);

      // Check booth click
      const allObjects = [];
      booths.forEach((b) => {
        b.group.traverse((child) => {
          if (child.isMesh) {
            child.userData = { project: b.project };
            allObjects.push(child);
          }
        });
      });

      const intersects = stateRef.current.raycaster.intersectObjects(allObjects);
      if (intersects.length > 0) {
        const hitProj = intersects[0].object.userData.project;
        if (hitProj) {
          setSelectedProject(hitProj);
          // Teleport near or walk toward booth
          stateRef.current.targetWalkPos = new THREE.Vector3(
            hitProj.metaverseZone.x + 2,
            0,
            hitProj.metaverseZone.z + 2
          );
          return;
        }
      }

      // Check ground click for moving
      const intersectPoint = new THREE.Vector3();
      stateRef.current.raycaster.ray.intersectPlane(stateRef.current.plane, intersectPoint);
      if (intersectPoint) {
        // Clamp to ground boundaries
        intersectPoint.x = Math.max(-36, Math.min(36, intersectPoint.x));
        intersectPoint.z = Math.max(-36, Math.min(36, intersectPoint.z));
        stateRef.current.targetWalkPos = intersectPoint;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    renderer.domElement.addEventListener("pointerdown", handleClick);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 9. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      stateRef.current.animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Rotate crystals and pulse halos
      booths.forEach((b, idx) => {
        b.crystal.rotation.y += 0.02;
        b.crystal.rotation.x = Math.sin(time * 2 + idx) * 0.15;
        b.crystal.position.y = 3.3 + Math.sin(time * 2.5 + idx) * 0.15;
        b.halo.rotation.z += 0.015;
      });

      // Slowly float particles
      if (particles) {
        particles.rotation.y = time * 0.03;
      }

      // Avatar Movement Logic
      const { keys, avatarPos, avatarParts, targetWalkPos } = stateRef.current;
      let moveX = 0;
      let moveZ = 0;

      // Keyboard input
      if (keys.w) moveZ -= 1;
      if (keys.s) moveZ += 1;
      if (keys.a) moveX -= 1;
      if (keys.d) moveX += 1;

      // Click-to-move override/input
      if (targetWalkPos && moveX === 0 && moveZ === 0) {
        const dx = targetWalkPos.x - avatarPos.x;
        const dz = targetWalkPos.z - avatarPos.z;
        const dist = Math.hypot(dx, dz);
        if (dist > 0.4) {
          moveX = dx / dist;
          moveZ = dz / dist;
        } else {
          stateRef.current.targetWalkPos = null;
        }
      }

      const isMoving = moveX !== 0 || moveZ !== 0;

      if (isMoving) {
        // Normalize
        const len = Math.hypot(moveX, moveZ);
        const speed = 12 * delta;
        const dirX = (moveX / len) * speed;
        const dirZ = (moveZ / len) * speed;

        avatarPos.x += dirX;
        avatarPos.z += dirZ;

        // Clamp inside metaverse bounds
        avatarPos.x = Math.max(-36, Math.min(36, avatarPos.x));
        avatarPos.z = Math.max(-36, Math.min(36, avatarPos.z));

        // Target rotation
        stateRef.current.targetRotation = Math.atan2(moveX, moveZ);

        // Walk cycle animation
        stateRef.current.walkCycle += delta * 14;
        const swing = Math.sin(stateRef.current.walkCycle) * 0.55;

        if (avatarParts.leftArm) avatarParts.leftArm.rotation.x = swing;
        if (avatarParts.rightArm) avatarParts.rightArm.rotation.x = -swing;
        if (avatarParts.leftLeg) avatarParts.leftLeg.rotation.x = -swing;
        if (avatarParts.rightLeg) avatarParts.rightLeg.rotation.x = swing;
        if (avatarParts.body) avatarParts.body.position.y = 1.2 + Math.abs(Math.sin(stateRef.current.walkCycle * 2)) * 0.12;
      } else {
        // Idle animation
        if (avatarParts.leftArm) avatarParts.leftArm.rotation.x *= 0.8;
        if (avatarParts.rightArm) avatarParts.rightArm.rotation.x *= 0.8;
        if (avatarParts.leftLeg) avatarParts.leftLeg.rotation.x *= 0.8;
        if (avatarParts.rightLeg) avatarParts.rightLeg.rotation.x *= 0.8;
        if (avatarParts.body) avatarParts.body.position.y = 1.2 + Math.sin(time * 3) * 0.04;
      }

      // Smooth Rotation
      let currentRot = avatar.rotation.y;
      let diff = stateRef.current.targetRotation - currentRot;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      avatar.rotation.y += diff * 0.2;

      // Jump Logic
      if (stateRef.current.isJumping) {
        avatarPos.y += stateRef.current.jumpVelocity;
        stateRef.current.jumpVelocity -= 0.016; // gravity
        if (avatarPos.y <= 0) {
          avatarPos.y = 0;
          stateRef.current.isJumping = false;
          stateRef.current.jumpVelocity = 0;
        }
      }

      // Apply Avatar Position
      avatar.position.x = avatarPos.x;
      avatar.position.y = avatarPos.y;
      avatar.position.z = avatarPos.z;

      // Shadow scale with jump
      if (avatarParts.shadow) {
        const shadowScale = Math.max(0.4, 1 - avatarPos.y * 0.3);
        avatarParts.shadow.scale.set(shadowScale, shadowScale, shadowScale);
      }

      // Check proximity to booths
      let nearestBooth = null;
      let minDistance = 4.2;
      booths.forEach((b) => {
        const dist = Math.hypot(avatarPos.x - b.pos.x, avatarPos.z - b.pos.z);
        if (dist < minDistance) {
          nearestBooth = b.project;
          minDistance = dist;
        }
      });
      setActiveZone(nearestBooth);

      // Camera follow behavior based on viewMode
      if (viewMode === "isometric") {
        camera.position.x += (avatarPos.x + 20 - camera.position.x) * 0.06;
        camera.position.y += (24 - camera.position.y) * 0.06;
        camera.position.z += (avatarPos.z + 24 - camera.position.z) * 0.06;
        camera.lookAt(avatarPos.x, 1.5, avatarPos.z);
      } else if (viewMode === "top") {
        camera.position.x += (avatarPos.x - camera.position.x) * 0.08;
        camera.position.y += (38 - camera.position.y) * 0.08;
        camera.position.z += (avatarPos.z + 0.1 - camera.position.z) * 0.08;
        camera.lookAt(avatarPos.x, 0, avatarPos.z);
      } else if (viewMode === "follow") {
        const camDist = 9;
        const camHeight = 4.5;
        const targetX = avatarPos.x - Math.sin(avatar.rotation.y) * camDist;
        const targetZ = avatarPos.z - Math.cos(avatar.rotation.y) * camDist;
        camera.position.x += (targetX - camera.position.x) * 0.08;
        camera.position.y += (avatarPos.y + camHeight - camera.position.y) * 0.08;
        camera.position.z += (targetZ - camera.position.z) * 0.08;
        camera.lookAt(avatarPos.x, avatarPos.y + 1.8, avatarPos.z);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(stateRef.current.animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [projects, viewMode]);

  // Teleport Avatar to specific booth
  const handleTeleport = (proj) => {
    if (!stateRef.current.avatar) return;
    const target = proj.metaverseZone;
    stateRef.current.avatarPos.set(target.x + 2.5, 0, target.z + 2.5);
    stateRef.current.targetWalkPos = null;
    setSelectedProject(proj);
  };

  // Virtual D-Pad for Mobile
  const handleVirtualMove = (dir) => {
    stateRef.current.keys.w = dir === "up";
    stateRef.current.keys.s = dir === "down";
    stateRef.current.keys.a = dir === "left";
    stateRef.current.keys.d = dir === "right";
  };

  const handleVirtualStop = () => {
    stateRef.current.keys.w = false;
    stateRef.current.keys.s = false;
    stateRef.current.keys.a = false;
    stateRef.current.keys.d = false;
  };

  return (
    <div className="metaverse-viewport">
      <div className="metaverse-canvas-container" ref={containerRef} />

      {/* Top HUD Bar */}
      <div className="metaverse-hud-top">
        <div className="hud-badge">
          <span className="live-dot" />
          <strong>3D METAVERSE EXPO</strong>
          <span className="hud-sub">총 11개 프로젝트 월드</span>
        </div>

        <div className="hud-view-controls">
          <button
            className={`btn-view-mode ${viewMode === "isometric" ? "active" : ""}`}
            onClick={() => setViewMode("isometric")}
            title="쿼터뷰"
          >
            <FaIcon iconName="fa-solid fa-cube" /> 쿼터뷰
          </button>
          <button
            className={`btn-view-mode ${viewMode === "follow" ? "active" : ""}`}
            onClick={() => setViewMode("follow")}
            title="캐릭터 시점"
          >
            <FaIcon iconName="fa-solid fa-person" /> 캐릭터 뷰
          </button>
          <button
            className={`btn-view-mode ${viewMode === "top" ? "active" : ""}`}
            onClick={() => setViewMode("top")}
            title="탑뷰 (지도)"
          >
            <FaIcon iconName="fa-solid fa-map" /> 탑뷰
          </button>
        </div>
      </div>

      {/* Teleport Quick Navigation Pills */}
      <div className="metaverse-teleport-bar">
        <span className="teleport-label">
          <FaIcon iconName="fa-solid fa-location-crosshairs" /> 텔레포트:
        </span>
        <div className="teleport-scroll">
          {projects.map((proj) => (
            <button
              key={proj.id}
              className={`teleport-pill ${activeZone?.id === proj.id ? "active" : ""}`}
              style={{ "--accent": proj.metaverseZone?.color || "#10b981" }}
              onClick={() => handleTeleport(proj)}
            >
              <span className="color-dot" />
              {proj.title.split("–")[0].replace("개발", "").trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Proximity Interaction Prompt */}
      {activeZone && (
        <div className="metaverse-interaction-prompt" style={{ "--zone-color": activeZone.metaverseZone?.color }}>
          <div className="prompt-content">
            <span className="prompt-badge">ZONE DISCOVERED</span>
            <h4>{activeZone.title}</h4>
            <p>{activeZone.summary}</p>
            <div className="prompt-actions">
              <button
                className="btn-inspect"
                onClick={() => {
                  setSelectedProject(activeZone);
                }}
              >
                <kbd>E</kbd> 또는 클릭하여 상세 분석 및 개선 차트 보기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Controls Guide Overlay */}
      {isControlsHelpOpen && (
        <div className="metaverse-guide-box">
          <div className="guide-header">
            <span>🎮 조작 가이드</span>
            <button className="btn-close-guide" onClick={() => setIsControlsHelpOpen(false)}>
              ×
            </button>
          </div>
          <ul>
            <li>
              <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> 또는 <kbd>화살표</kbd> 키로 3D 캐릭터 이동
            </li>
            <li>
              <kbd>Space</kbd> 점프, 바닥 <strong>클릭/터치</strong>로 이동
            </li>
            <li>
              프로젝트 기둥에 다가가면 <kbd>E</kbd> 키 또는 <strong>부스 클릭</strong> 시 상세 지표 확인
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Virtual Controls D-Pad */}
      <div className="metaverse-mobile-dpad">
        <button
          className="dpad-btn up"
          onPointerDown={() => handleVirtualMove("up")}
          onPointerUp={handleVirtualStop}
        >
          ▲
        </button>
        <div className="dpad-mid">
          <button
            className="dpad-btn left"
            onPointerDown={() => handleVirtualMove("left")}
            onPointerUp={handleVirtualStop}
          >
            ◀
          </button>
          <button
            className="dpad-btn jump"
            onClick={() => {
              if (stateRef.current) {
                stateRef.current.isJumping = true;
                stateRef.current.jumpVelocity = 0.28;
              }
            }}
          >
            점프
          </button>
          <button
            className="dpad-btn right"
            onPointerDown={() => handleVirtualMove("right")}
            onPointerUp={handleVirtualStop}
          >
            ▶
          </button>
        </div>
        <button
          className="dpad-btn down"
          onPointerDown={() => handleVirtualMove("down")}
          onPointerUp={handleVirtualStop}
        >
          ▼
        </button>
      </div>

      {/* Selected Project 3D Modal Preview via Portal to document.body */}
      {selectedProject &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="metaverse-project-modal" onClick={() => setSelectedProject(null)}>
            <div className="modal-dialog-3d" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-3d" style={{ "--border-color": selectedProject.metaverseZone?.color }}>
                <div>
                  <span className="modal-type">{selectedProject.type}</span>
                  <h3>{selectedProject.title}</h3>
                  <span className="modal-period">{selectedProject.period}</span>
                </div>
                <button className="btn-close-modal" onClick={() => setSelectedProject(null)}>
                  <FaIcon iconName="fa-solid fa-xmark" />
                </button>
              </div>

              <div className="modal-body-3d">
                <p className="modal-summary">{selectedProject.summary}</p>

                {/* Direct Links */}
                <div className="modal-links-bar">
                  {selectedProject.links?.map((link) => (
                    <a
                      key={link.label}
                      href={link.disabled ? undefined : link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`btn-modal-link ${link.disabled ? "disabled" : ""}`}
                    >
                      <FaIcon iconName={link.icon} /> {link.label}
                    </a>
                  ))}
                </div>

                {/* Quick Metrics */}
                <div className="modal-metrics-grid">
                  {selectedProject.metrics?.map((m) => (
                    <div className="metric-box" key={m.label}>
                      <span className="metric-label">{m.label}</span>
                      <div className="metric-values">
                        <span className="metric-before">{m.before}</span>
                        <FaIcon iconName="fa-solid fa-arrow-right" />
                        <span className="metric-after">{m.after}</span>
                      </div>
                      <span className="metric-badge">{m.change}</span>
                    </div>
                  ))}
                </div>

                <div className="modal-footer-nav">
                  <button
                    className="btn-scroll-to-card"
                    onClick={() => {
                      const targetId = selectedProject.id;
                      document.body.classList.remove("body-no-scroll");
                      setSelectedProject(null);
                      if (onSelectProject) {
                        setTimeout(() => {
                          onSelectProject(targetId);
                        }, 80);
                      }
                    }}
                  >
                    <FaIcon iconName="fa-solid fa-chart-simple" /> 아래 카드로 이동하여 전체 그래프 보기
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
