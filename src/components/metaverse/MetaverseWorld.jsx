import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./MetaverseWorld.scss";
import FaIcon from "/src/components/generic/FaIcon.jsx";

export default function MetaverseWorld({ projects, onSelectProject }) {
  const containerRef = useRef(null);
  const [activeZone, setActiveZone] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isControlsHelpOpen, setIsControlsHelpOpen] = useState(true);
  const [viewMode, setViewMode] = useState("isometric"); // isometric, top, follow

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

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e17);
    scene.fog = new THREE.FogExp2(0x0a0e17, 0.015);
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

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x6ee7b7, 1.2);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 120;
    dirLight.shadow.camera.left = -35;
    dirLight.shadow.camera.right = 35;
    dirLight.shadow.camera.top = 35;
    dirLight.shadow.camera.bottom = -35;
    scene.add(dirLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 60);
    purpleLight.position.set(-15, 8, -15);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 2.5, 60);
    blueLight.position.set(15, 8, 15);
    scene.add(blueLight);

    // 5. Floor & Grid (Metaverse Cyber Grid)
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(80, 40, 0x10b981, 0x1e293b);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // Center Stage Ring
    const centerRingGeo = new THREE.RingGeometry(2.5, 3.2, 32);
    const centerRingMat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide });
    const centerRing = new THREE.Mesh(centerRingGeo, centerRingMat);
    centerRing.rotation.x = -Math.PI / 2;
    centerRing.position.y = 0.05;
    scene.add(centerRing);

    // Floating Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 70;
      particlePositions[i + 1] = Math.random() * 20 + 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 70;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.35,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    stateRef.current.particles = particles;

    // 6. Build Avatar (Stylized 3D Developer Robot)
    const avatar = new THREE.Group();
    avatar.position.set(0, 0, 5);

    // Shadow blob
    const shadowGeo = new THREE.CircleGeometry(0.7, 16);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45 });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.03;
    avatar.add(shadow);

    // Body
    const bodyGeo = new THREE.BoxGeometry(0.9, 1.1, 0.6);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3, metalness: 0.4 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.2;
    body.castShadow = true;
    avatar.add(body);

    // Head
    const headGeo = new THREE.BoxGeometry(0.75, 0.75, 0.75);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 2.15;
    head.castShadow = true;
    avatar.add(head);

    // Visor/Eyes (Cyan Glow)
    const visorGeo = new THREE.BoxGeometry(0.6, 0.22, 0.1);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 2.2, 0.38);
    avatar.add(visor);

    // Headset
    const headsetGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.85, 12);
    const headsetMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.5 });
    const headsetL = new THREE.Mesh(headsetGeo, headsetMat);
    headsetL.rotation.z = Math.PI / 2;
    headsetL.position.set(-0.42, 2.15, 0);
    avatar.add(headsetL);
    const headsetR = headsetL.clone();
    headsetR.position.set(0.42, 2.15, 0);
    avatar.add(headsetR);

    // Antenna
    const antGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8);
    const antMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const ant = new THREE.Mesh(antGeo, antMat);
    ant.position.set(0, 2.7, 0);
    avatar.add(ant);
    const antBulbGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const antBulb = new THREE.Mesh(antBulbGeo, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    antBulb.position.set(0, 2.9, 0);
    avatar.add(antBulb);

    // Left Arm & Right Arm
    const armGeo = new THREE.BoxGeometry(0.25, 0.8, 0.25);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-0.62, 1.2, 0);
    leftArm.castShadow = true;
    avatar.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(0.62, 1.2, 0);
    rightArm.castShadow = true;
    avatar.add(rightArm);

    // Left Leg & Right Leg
    const legGeo = new THREE.BoxGeometry(0.3, 0.7, 0.3);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
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

    // 7. Build 11 Interactive Project Booths
    const booths = [];
    projects.forEach((proj) => {
      const zone = proj.metaverseZone || { x: 0, z: 0, color: "#10b981", tag: "PROJECT" };
      const boothGroup = new THREE.Group();
      boothGroup.position.set(zone.x, 0, zone.z);
      boothGroup.userData = { project: proj };

      // Base Pedestal
      const baseGeo = new THREE.CylinderGeometry(2.4, 2.8, 0.5, 8);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.5,
        roughness: 0.3,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = 0.25;
      baseMesh.receiveShadow = true;
      boothGroup.add(baseMesh);

      // Glowing Neon Base Ring
      const ringGeo = new THREE.TorusGeometry(2.5, 0.09, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: zone.color });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 0.52;
      boothGroup.add(ringMesh);

      // Pillar Column
      const pillarGeo = new THREE.BoxGeometry(0.8, 2.2, 0.8);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.8,
        roughness: 0.2,
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.y = 1.4;
      pillar.castShadow = true;
      boothGroup.add(pillar);

      // Floating Rotating Hologram Crystal
      const crystalGeo = new THREE.OctahedronGeometry(0.9, 0);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: zone.color,
        emissive: zone.color,
        emissiveIntensity: 0.45,
        roughness: 0.1,
        metalness: 0.8,
        wireframe: false,
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.position.y = 3.6;
      crystal.castShadow = true;
      boothGroup.add(crystal);

      // Floating Glow Ring around Crystal
      const haloGeo = new THREE.TorusGeometry(1.3, 0.04, 8, 24);
      const haloMat = new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.7 });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 3;
      halo.position.y = 3.6;
      boothGroup.add(halo);

      // Local Point Light
      const pLight = new THREE.PointLight(zone.color, 1.8, 7);
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
        if (onSelectProject) onSelectProject(activeZone.id);
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
          if (onSelectProject) onSelectProject(hitProj.id);
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
        b.crystal.position.y = 3.6 + Math.sin(time * 2.5 + idx) * 0.2;
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
    if (onSelectProject) onSelectProject(proj.id);
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
                  if (onSelectProject) onSelectProject(activeZone.id);
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

      {/* Selected Project 3D Modal Preview */}
      {selectedProject && (
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
                    setSelectedProject(null);
                    const el = document.getElementById(`project-${selectedProject.id}`);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      el.classList.add("highlight-3d");
                      setTimeout(() => el.classList.remove("highlight-3d"), 2500);
                    }
                  }}
                >
                  <FaIcon iconName="fa-solid fa-chart-simple" /> 아래 카드로 이동하여 전체 그래프 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
