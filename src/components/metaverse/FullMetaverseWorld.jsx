import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { Bar } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import "./FullMetaverseWorld.scss";
import FaIcon from "/src/components/generic/FaIcon.jsx";
import {
  capabilities,
  metaverseZones,
  optimizationChart,
  projects,
} from "/src/data/metaverseWorldData.js";
import { useGlobalState } from "/src/providers/GlobalStateProvider.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

export default function FullMetaverseWorld({ onToggleMode }) {
  const containerRef = useRef(null);
  const { toggleMetaverseMode, setActiveSection, setTargetProjectId } = useGlobalState();

  const [activeZone, setActiveZone] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null); // 'about', 'experience', 'skills', 'contact'
  const [selectedProject, setSelectedProject] = useState(null);
  const [isControlsHelpOpen, setIsControlsHelpOpen] = useState(true);
  const [viewMode, setViewMode] = useState("isometric"); // isometric, top, follow

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedZone || selectedProject) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [selectedZone, selectedProject]);

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
    zoneObjects: [],
    particles: null,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    plane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    animId: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);
    scene.fog = new THREE.FogExp2(0x070b14, 0.012);
    stateRef.current.scene = scene;

    // 2. Camera
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1200);
    camera.position.set(24, 28, 30);
    camera.lookAt(0, 0, 0);
    stateRef.current.camera = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x6ee7b7, 1.25);
    dirLight.position.set(30, 50, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 160;
    dirLight.shadow.camera.left = -55;
    dirLight.shadow.camera.right = 55;
    dirLight.shadow.camera.top = 55;
    dirLight.shadow.camera.bottom = -55;
    scene.add(dirLight);

    // Colored accent point lights for the 5 zones
    const centerLight = new THREE.PointLight(0x10b981, 2.5, 40);
    centerLight.position.set(0, 7, 0);
    scene.add(centerLight);

    const westLight = new THREE.PointLight(0x38bdf8, 3.2, 50);
    westLight.position.set(-28, 9, 0);
    scene.add(westLight);

    const eastLight = new THREE.PointLight(0xa855f7, 3.2, 50);
    eastLight.position.set(28, 9, 0);
    scene.add(eastLight);

    const northLight = new THREE.PointLight(0xf59e0b, 3.2, 50);
    northLight.position.set(0, 9, -26);
    scene.add(northLight);

    const southLight = new THREE.PointLight(0xec4899, 3.2, 50);
    southLight.position.set(0, 9, 26);
    scene.add(southLight);

    // 5. Floor & Cyber Grid
    const floorGeo = new THREE.PlaneGeometry(120, 120);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090e1a,
      roughness: 0.7,
      metalness: 0.3,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const gridHelper = new THREE.GridHelper(120, 60, 0x10b981, 0x1e293b);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // Glowing Neon Crossroads connecting the 5 zones
    const createPathway = (x1, z1, x2, z2, colorHex) => {
      const length = Math.hypot(x2 - x1, z2 - z1);
      const pathGeo = new THREE.PlaneGeometry(3.6, length);
      const pathMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      });
      const path = new THREE.Mesh(pathGeo, pathMat);
      path.rotation.x = -Math.PI / 2;
      path.position.set((x1 + x2) / 2, 0.04, (z1 + z2) / 2);
      path.rotation.z = Math.atan2(x2 - x1, z2 - z1);
      scene.add(path);
    };

    createPathway(0, 0, -28, 0, 0x38bdf8); // West
    createPathway(0, 0, 28, 0, 0xa855f7);  // East
    createPathway(0, 0, 0, -26, 0xf59e0b); // North
    createPathway(0, 0, 0, 26, 0xec4899);  // South

    // Central Stage Ring
    const centerRingGeo = new THREE.RingGeometry(3.2, 4.2, 36);
    const centerRingMat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide });
    const centerRing = new THREE.Mesh(centerRingGeo, centerRingMat);
    centerRing.rotation.x = -Math.PI / 2;
    centerRing.position.y = 0.05;
    scene.add(centerRing);

    // Floating Ambient Particles
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 110;
      particlePositions[i + 1] = Math.random() * 25 + 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 110;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.38,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    stateRef.current.particles = particles;

    // 6. Build Avatar (3D Developer Robot)
    const avatar = new THREE.Group();
    avatar.position.set(0, 0, 5);

    const shadowGeo = new THREE.CircleGeometry(0.75, 16);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.03;
    avatar.add(shadow);

    const bodyGeo = new THREE.BoxGeometry(0.9, 1.1, 0.6);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3, metalness: 0.4 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.2;
    body.castShadow = true;
    avatar.add(body);

    const headGeo = new THREE.BoxGeometry(0.75, 0.75, 0.75);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 2.15;
    head.castShadow = true;
    avatar.add(head);

    const visorGeo = new THREE.BoxGeometry(0.6, 0.22, 0.1);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 2.2, 0.38);
    avatar.add(visor);

    const headsetGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.85, 12);
    const headsetMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.5 });
    const headsetL = new THREE.Mesh(headsetGeo, headsetMat);
    headsetL.rotation.z = Math.PI / 2;
    headsetL.position.set(-0.42, 2.15, 0);
    avatar.add(headsetL);
    const headsetR = headsetL.clone();
    headsetR.position.set(0.42, 2.15, 0);
    avatar.add(headsetR);

    const antGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8);
    const antMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const ant = new THREE.Mesh(antGeo, antMat);
    ant.position.set(0, 2.7, 0);
    avatar.add(ant);
    const antBulbGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const antBulb = new THREE.Mesh(antBulbGeo, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    antBulb.position.set(0, 2.9, 0);
    avatar.add(antBulb);

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

    // 7. Build Zone Landmark Objects
    const zoneObjects = [];

    // 7.1 Center: About Me Hologram Tower (0, 0, -4)
    const aboutGroup = new THREE.Group();
    aboutGroup.position.set(0, 0, -4);
    aboutGroup.userData = { zoneType: "about", title: metaverseZones.about.name };

    const aboutBaseGeo = new THREE.CylinderGeometry(3.5, 4.2, 0.6, 12);
    const aboutBaseMesh = new THREE.Mesh(aboutBaseGeo, new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 }));
    aboutBaseMesh.position.y = 0.3;
    aboutGroup.add(aboutBaseMesh);

    const aboutTowerGeo = new THREE.CylinderGeometry(1.2, 1.6, 5.5, 6);
    const aboutTowerMesh = new THREE.Mesh(aboutTowerGeo, new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 }));
    aboutTowerMesh.position.y = 3.2;
    aboutGroup.add(aboutTowerMesh);

    const aboutCrystalGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const aboutCrystalMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.5, metalness: 0.8 });
    const aboutCrystal = new THREE.Mesh(aboutCrystalGeo, aboutCrystalMat);
    aboutCrystal.position.y = 7.2;
    aboutGroup.add(aboutCrystal);

    scene.add(aboutGroup);
    zoneObjects.push({ group: aboutGroup, rotator: aboutCrystal, zone: metaverseZones.about });

    // 7.2 West: Career & Education Archive Monoliths (-28, 0, 0)
    const expGroup = new THREE.Group();
    expGroup.position.set(-28, 0, 0);
    expGroup.userData = { zoneType: "experience", title: metaverseZones.experience.name };

    const expBaseGeo = new THREE.CylinderGeometry(4.2, 4.8, 0.6, 8);
    const expBaseMesh = new THREE.Mesh(expBaseGeo, new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 }));
    expBaseMesh.position.y = 0.3;
    expGroup.add(expBaseMesh);

    const expPillarGeo = new THREE.BoxGeometry(1.6, 6.5, 1.6);
    const expPillarMesh = new THREE.Mesh(expPillarGeo, new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 }));
    expPillarMesh.position.y = 3.5;
    expGroup.add(expPillarMesh);

    const expHaloGeo = new THREE.TorusGeometry(2.4, 0.1, 8, 32);
    const expHalo = new THREE.Mesh(expHaloGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    expHalo.rotation.x = Math.PI / 2;
    expHalo.position.y = 5.5;
    expGroup.add(expHalo);

    scene.add(expGroup);
    zoneObjects.push({ group: expGroup, rotator: expHalo, zone: metaverseZones.experience });

    // 7.3 East: Skills & Capabilities Tech Core (28, 0, 0)
    const skillGroup = new THREE.Group();
    skillGroup.position.set(28, 0, 0);
    skillGroup.userData = { zoneType: "skills", title: metaverseZones.skills.name };

    const skillBaseGeo = new THREE.CylinderGeometry(4.2, 4.8, 0.6, 8);
    const skillBaseMesh = new THREE.Mesh(skillBaseGeo, new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 }));
    skillBaseMesh.position.y = 0.3;
    skillGroup.add(skillBaseMesh);

    const skillCoreGeo = new THREE.OctahedronGeometry(1.6, 0);
    const skillCore = new THREE.Mesh(skillCoreGeo, new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0xa855f7, emissiveIntensity: 0.55 }));
    skillCore.position.y = 5.2;
    skillGroup.add(skillCore);

    const skillRingGeo = new THREE.TorusGeometry(2.8, 0.08, 8, 32);
    const skillRing = new THREE.Mesh(skillRingGeo, new THREE.MeshBasicMaterial({ color: 0xa855f7 }));
    skillRing.rotation.x = Math.PI / 3;
    skillRing.position.y = 5.2;
    skillGroup.add(skillRing);

    scene.add(skillGroup);
    zoneObjects.push({ group: skillGroup, rotator: skillCore, rotator2: skillRing, zone: metaverseZones.skills });

    // 7.4 South: Contact & Warp Portal (0, 0, 26)
    const contactGroup = new THREE.Group();
    contactGroup.position.set(0, 0, 26);
    contactGroup.userData = { zoneType: "contact", title: metaverseZones.contact.name };

    const portalRingGeo = new THREE.TorusGeometry(3.6, 0.22, 16, 48);
    const portalRingMat = new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.7 });
    const portalRing = new THREE.Mesh(portalRingGeo, portalRingMat);
    portalRing.position.y = 4.2;
    contactGroup.add(portalRing);

    const portalBaseGeo = new THREE.CylinderGeometry(4.2, 4.8, 0.5, 12);
    const portalBaseMesh = new THREE.Mesh(portalBaseGeo, new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    portalBaseMesh.position.y = 0.25;
    contactGroup.add(portalBaseMesh);

    scene.add(contactGroup);
    zoneObjects.push({ group: contactGroup, rotator: portalRing, zone: metaverseZones.contact });

    stateRef.current.zoneObjects = zoneObjects;

    // 7.5 North: 11 Project Booths
    const booths = [];
    projects.forEach((proj) => {
      const zone = proj.metaverseZone || { x: 0, z: -24, color: "#10b981", tag: "PROJECT" };
      const boothGroup = new THREE.Group();
      boothGroup.position.set(zone.x, 0, zone.z);
      boothGroup.userData = { project: proj };

      const baseGeo = new THREE.CylinderGeometry(2.3, 2.7, 0.5, 8);
      const baseMesh = new THREE.Mesh(baseGeo, new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5 }));
      baseMesh.position.y = 0.25;
      baseMesh.receiveShadow = true;
      boothGroup.add(baseMesh);

      const ringGeo = new THREE.TorusGeometry(2.4, 0.08, 8, 24);
      const ringMesh = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: zone.color }));
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 0.52;
      boothGroup.add(ringMesh);

      const pillarGeo = new THREE.BoxGeometry(0.8, 2.2, 0.8);
      const pillarMesh = new THREE.Mesh(pillarGeo, new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 }));
      pillarMesh.position.y = 1.4;
      pillarMesh.castShadow = true;
      boothGroup.add(pillarMesh);

      const crystalGeo = new THREE.OctahedronGeometry(0.9, 0);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: zone.color,
        emissive: zone.color,
        emissiveIntensity: 0.5,
        roughness: 0.1,
        metalness: 0.8,
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.position.y = 3.6;
      crystal.castShadow = true;
      boothGroup.add(crystal);

      const haloGeo = new THREE.TorusGeometry(1.3, 0.04, 8, 24);
      const halo = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.7 }));
      halo.rotation.x = Math.PI / 3;
      halo.position.y = 3.6;
      boothGroup.add(halo);

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

    // 8. Event Listeners
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
        if (activeZone.type === "project") {
          setSelectedProject(activeZone.data);
        } else if (activeZone.type === "zone") {
          setSelectedZone(activeZone.data);
        }
      }
    };

    const handleKeyUp = (e) => {
      const k = e.key.toLowerCase();
      if (k === "w" || k === "arrowup") stateRef.current.keys.w = false;
      if (k === "a" || k === "arrowleft") stateRef.current.keys.a = false;
      if (k === "s" || k === "arrowdown") stateRef.current.keys.s = false;
      if (k === "d" || k === "arrowright") stateRef.current.keys.d = false;
    };

    // Click-to-move & Click object
    const handleClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      stateRef.current.mouse.set(x, y);
      stateRef.current.raycaster.setFromCamera(stateRef.current.mouse, camera);

      // Check project booth click
      const allBoothMeshes = [];
      booths.forEach((b) => {
        b.group.traverse((child) => {
          if (child.isMesh) {
            child.userData = { project: b.project };
            allBoothMeshes.push(child);
          }
        });
      });

      const boothHits = stateRef.current.raycaster.intersectObjects(allBoothMeshes);
      if (boothHits.length > 0) {
        const hitProj = boothHits[0].object.userData.project;
        if (hitProj) {
          setSelectedProject(hitProj);
          stateRef.current.targetWalkPos = new THREE.Vector3(
            hitProj.metaverseZone.x + 2,
            0,
            hitProj.metaverseZone.z + 2
          );
          return;
        }
      }

      // Check zone landmarks click
      const allZoneMeshes = [];
      zoneObjects.forEach((z) => {
        z.group.traverse((child) => {
          if (child.isMesh) {
            child.userData = { zone: z.zone };
            allZoneMeshes.push(child);
          }
        });
      });

      const zoneHits = stateRef.current.raycaster.intersectObjects(allZoneMeshes);
      if (zoneHits.length > 0) {
        const hitZone = zoneHits[0].object.userData.zone;
        if (hitZone) {
          setSelectedZone(hitZone);
          stateRef.current.targetWalkPos = new THREE.Vector3(
            hitZone.position.x,
            0,
            hitZone.position.z + 4
          );
          return;
        }
      }

      // Check floor click for click-to-move
      const intersectPoint = new THREE.Vector3();
      stateRef.current.raycaster.ray.intersectPlane(stateRef.current.plane, intersectPoint);
      if (intersectPoint) {
        intersectPoint.x = Math.max(-50, Math.min(50, intersectPoint.x));
        intersectPoint.z = Math.max(-50, Math.min(50, intersectPoint.z));
        stateRef.current.targetWalkPos = intersectPoint;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    renderer.domElement.addEventListener("pointerdown", handleClick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
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

      // Rotate crystals, halos and portal
      booths.forEach((b, idx) => {
        b.crystal.rotation.y += 0.02;
        b.crystal.rotation.x = Math.sin(time * 2 + idx) * 0.15;
        b.crystal.position.y = 3.6 + Math.sin(time * 2.5 + idx) * 0.2;
        b.halo.rotation.z += 0.015;
      });

      zoneObjects.forEach((z) => {
        if (z.rotator) z.rotator.rotation.y += 0.015;
        if (z.rotator2) z.rotator2.rotation.z += 0.012;
      });

      if (particles) {
        particles.rotation.y = time * 0.02;
      }

      // Avatar Movement
      const { keys, avatarPos, avatarParts, targetWalkPos } = stateRef.current;
      let moveX = 0;
      let moveZ = 0;

      if (keys.w) moveZ -= 1;
      if (keys.s) moveZ += 1;
      if (keys.a) moveX -= 1;
      if (keys.d) moveX += 1;

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
        const len = Math.hypot(moveX, moveZ);
        const speed = 14 * delta;
        const dirX = (moveX / len) * speed;
        const dirZ = (moveZ / len) * speed;

        avatarPos.x += dirX;
        avatarPos.z += dirZ;

        avatarPos.x = Math.max(-52, Math.min(52, avatarPos.x));
        avatarPos.z = Math.max(-52, Math.min(52, avatarPos.z));

        stateRef.current.targetRotation = Math.atan2(moveX, moveZ);
        stateRef.current.walkCycle += delta * 14;
        const swing = Math.sin(stateRef.current.walkCycle) * 0.55;

        if (avatarParts.leftArm) avatarParts.leftArm.rotation.x = swing;
        if (avatarParts.rightArm) avatarParts.rightArm.rotation.x = -swing;
        if (avatarParts.leftLeg) avatarParts.leftLeg.rotation.x = -swing;
        if (avatarParts.rightLeg) avatarParts.rightLeg.rotation.x = swing;
        if (avatarParts.body) avatarParts.body.position.y = 1.2 + Math.abs(Math.sin(stateRef.current.walkCycle * 2)) * 0.12;
      } else {
        if (avatarParts.leftArm) avatarParts.leftArm.rotation.x *= 0.8;
        if (avatarParts.rightArm) avatarParts.rightArm.rotation.x *= 0.8;
        if (avatarParts.leftLeg) avatarParts.leftLeg.rotation.x *= 0.8;
        if (avatarParts.rightLeg) avatarParts.rightLeg.rotation.x *= 0.8;
        if (avatarParts.body) avatarParts.body.position.y = 1.2 + Math.sin(time * 3) * 0.04;
      }

      let currentRot = avatar.rotation.y;
      let diff = stateRef.current.targetRotation - currentRot;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      avatar.rotation.y += diff * 0.2;

      if (stateRef.current.isJumping) {
        avatarPos.y += stateRef.current.jumpVelocity;
        stateRef.current.jumpVelocity -= 0.016;
        if (avatarPos.y <= 0) {
          avatarPos.y = 0;
          stateRef.current.isJumping = false;
          stateRef.current.jumpVelocity = 0;
        }
      }

      avatar.position.x = avatarPos.x;
      avatar.position.y = avatarPos.y;
      avatar.position.z = avatarPos.z;

      if (avatarParts.shadow) {
        const shadowScale = Math.max(0.4, 1 - avatarPos.y * 0.3);
        avatarParts.shadow.scale.set(shadowScale, shadowScale, shadowScale);
      }

      // Proximity detection
      let detected = null;
      let minDistance = 5.2;

      // Check projects
      booths.forEach((b) => {
        const dist = Math.hypot(avatarPos.x - b.pos.x, avatarPos.z - b.pos.z);
        if (dist < minDistance) {
          detected = { type: "project", data: b.project, title: b.project.title, color: b.project.metaverseZone?.color };
          minDistance = dist;
        }
      });

      // Check zones
      zoneObjects.forEach((z) => {
        const dist = Math.hypot(avatarPos.x - z.zone.position.x, avatarPos.z - z.zone.position.z);
        if (dist < minDistance) {
          detected = { type: "zone", data: z.zone, title: z.zone.name, color: z.zone.color };
          minDistance = dist;
        }
      });

      setActiveZone(detected);

      // Camera Follow
      if (viewMode === "isometric") {
        camera.position.x += (avatarPos.x + 22 - camera.position.x) * 0.06;
        camera.position.y += (26 - camera.position.y) * 0.06;
        camera.position.z += (avatarPos.z + 26 - camera.position.z) * 0.06;
        camera.lookAt(avatarPos.x, 1.6, avatarPos.z);
      } else if (viewMode === "top") {
        camera.position.x += (avatarPos.x - camera.position.x) * 0.08;
        camera.position.y += (48 - camera.position.y) * 0.08;
        camera.position.z += (avatarPos.z + 0.1 - camera.position.z) * 0.08;
        camera.lookAt(avatarPos.x, 0, avatarPos.z);
      } else if (viewMode === "follow") {
        const camDist = 10;
        const camHeight = 4.8;
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
  }, [viewMode]);

  // Teleport helper
  const handleTeleportZone = (zoneKey) => {
    const zone = metaverseZones[zoneKey];
    if (!zone || !stateRef.current.avatar) return;
    stateRef.current.avatarPos.set(zone.position.x, 0, zone.position.z + 5);
    stateRef.current.targetWalkPos = null;
    setSelectedZone(zone);
  };

  const handleTeleportProject = (proj) => {
    if (!stateRef.current.avatar) return;
    const target = proj.metaverseZone || { x: 0, z: -24 };
    stateRef.current.avatarPos.set(target.x + 2.5, 0, target.z + 2.5);
    stateRef.current.targetWalkPos = null;
    setSelectedProject(proj);
  };

  // Virtual D-Pad
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

  const handleSwitchToClassicDoc = (targetSectionId = "portfolio", projectId = null) => {
    document.body.classList.remove("body-no-scroll");
    setSelectedZone(null);
    setSelectedProject(null);
    if (projectId && setTargetProjectId) {
      setTargetProjectId(projectId);
    }
    setActiveSection(targetSectionId);
    toggleMetaverseMode(false);
  };

  return (
    <div className="full-metaverse-container">
      <div className="metaverse-canvas-viewport" ref={containerRef} />

      {/* Top Header HUD */}
      <header className="full-metaverse-header">
        <div className="hud-brand">
          <span className="live-orb" />
          <div className="brand-text">
            <strong>3D METAVERSE EXPO</strong>
            <small>조영호 • FRONTEND & METAVERSE ARCHITECT</small>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="hud-view-modes">
          <button
            className={`btn-mode ${viewMode === "isometric" ? "active" : ""}`}
            onClick={() => setViewMode("isometric")}
            title="쿼터뷰"
          >
            <FaIcon iconName="fa-solid fa-cube" /> 쿼터뷰
          </button>
          <button
            className={`btn-mode ${viewMode === "follow" ? "active" : ""}`}
            onClick={() => setViewMode("follow")}
            title="캐릭터 시점"
          >
            <FaIcon iconName="fa-solid fa-person" /> 캐릭터 뷰
          </button>
          <button
            className={`btn-mode ${viewMode === "top" ? "active" : ""}`}
            onClick={() => setViewMode("top")}
            title="탑뷰 (지도)"
          >
            <FaIcon iconName="fa-solid fa-map" /> 탑뷰
          </button>
        </div>

        {/* Mode Switch Toggle Button: Switch to Classic Document Mode */}
        <div className="hud-actions">
          <button
            className="btn-switch-doc-mode"
            onClick={() => handleSwitchToClassicDoc("portfolio")}
            title="빠른 스캔을 위한 클래식 문서 이력서 모드로 전환합니다"
          >
            <FaIcon iconName="fa-solid fa-file-lines" />
            <span>📄 문서 모드(Classic View)</span>
          </button>
        </div>
      </header>

      {/* 5-Zone Quick Teleport Navigation Bar */}
      <nav className="full-metaverse-teleport-bar" aria-label="메타버스 구역 순간이동">
        <span className="teleport-title">
          <FaIcon iconName="fa-solid fa-location-dot" /> 구역 이동:
        </span>
        <div className="teleport-pills-row">
          <button
            className={`zone-pill ${activeZone?.data?.id === "about" ? "active" : ""}`}
            style={{ "--accent": "#10b981" }}
            onClick={() => handleTeleportZone("about")}
          >
            <FaIcon iconName="fa-solid fa-address-card" /> 소개 (About)
          </button>
          <button
            className={`zone-pill ${activeZone?.data?.id === "experience" ? "active" : ""}`}
            style={{ "--accent": "#38bdf8" }}
            onClick={() => handleTeleportZone("experience")}
          >
            <FaIcon iconName="fa-solid fa-briefcase" /> 경력·학력 (Career)
          </button>
          <button
            className={`zone-pill ${activeZone?.data?.id === "skills" ? "active" : ""}`}
            style={{ "--accent": "#a855f7" }}
            onClick={() => handleTeleportZone("skills")}
          >
            <FaIcon iconName="fa-solid fa-code" /> 기술스택 (Skills)
          </button>
          <button
            className={`zone-pill ${activeZone?.data?.id === "projects" ? "active" : ""}`}
            style={{ "--accent": "#f59e0b" }}
            onClick={() => handleTeleportZone("projects")}
          >
            <FaIcon iconName="fa-solid fa-folder-open" /> 프로젝트 (11 Projects)
          </button>
          <button
            className={`zone-pill ${activeZone?.data?.id === "contact" ? "active" : ""}`}
            style={{ "--accent": "#ec4899" }}
            onClick={() => handleTeleportZone("contact")}
          >
            <FaIcon iconName="fa-solid fa-paper-plane" /> 연락처 (Contact)
          </button>
        </div>
      </nav>

      {/* Proximity Interaction Prompt */}
      {activeZone && (
        <div className="metaverse-proximity-card" style={{ "--zone-color": activeZone.color || "#10b981" }}>
          <div className="prompt-badge">ZONE DISCOVERED</div>
          <h4>{activeZone.title}</h4>
          <button
            className="btn-zone-inspect"
            onClick={() => {
              if (activeZone.type === "project") {
                setSelectedProject(activeZone.data);
              } else if (activeZone.type === "zone") {
                setSelectedZone(activeZone.data);
              }
            }}
          >
            <kbd>E</kbd> 또는 터치하여 상세 정보 확인하기
          </button>
        </div>
      )}

      {/* Controls Guide Overlay */}
      {isControlsHelpOpen && (
        <div className="full-metaverse-guide">
          <div className="guide-header">
            <span>🎮 탐험 조작 가이드</span>
            <button className="btn-close-help" onClick={() => setIsControlsHelpOpen(false)}>
              ×
            </button>
          </div>
          <ul>
            <li>
              <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> / <kbd>화살표</kbd> 키로 3D 캐릭터 조작
            </li>
            <li>
              <kbd>Space</kbd> 점프, 바닥 <strong>클릭/터치</strong>로 원하는 위치 자동 이동
            </li>
            <li>
              구역 또는 프로젝트 부스에 다가가면 <kbd>E</kbd> 키나 <strong>클릭</strong>으로 상세 정보 열람
            </li>
            <li>
              우측 상단 <strong>[📄 문서 모드]</strong> 버튼을 누르면 언제든 클래식 이력서 화면으로 전환 가능
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Virtual D-Pad */}
      <div className="metaverse-virtual-dpad">
        <button
          className="dpad-key up"
          onPointerDown={() => handleVirtualMove("up")}
          onPointerUp={handleVirtualStop}
        >
          ▲
        </button>
        <div className="dpad-middle">
          <button
            className="dpad-key left"
            onPointerDown={() => handleVirtualMove("left")}
            onPointerUp={handleVirtualStop}
          >
            ◀
          </button>
          <button
            className="dpad-key jump"
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
            className="dpad-key right"
            onPointerDown={() => handleVirtualMove("right")}
            onPointerUp={handleVirtualStop}
          >
            ▶
          </button>
        </div>
        <button
          className="dpad-key down"
          onPointerDown={() => handleVirtualMove("down")}
          onPointerUp={handleVirtualStop}
        >
          ▼
        </button>
      </div>

      {/* ---------------- ZONE MODALS (Portal to document.body) ---------------- */}

      {/* 1. About Me Modal */}
      {selectedZone?.id === "about" &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="full-metaverse-modal" onClick={() => setSelectedZone(null)}>
            <div className="modal-dialog-metaverse" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-metaverse" style={{ "--border-color": "#10b981" }}>
                <div>
                  <span className="modal-tag">ABOUT ME</span>
                  <h3>조영호 (Youngho Cho)</h3>
                  <span className="modal-sub">FRONTEND & METAVERSE ARCHITECT</span>
                </div>
                <button className="btn-close-metaverse" onClick={() => setSelectedZone(null)}>
                  <FaIcon iconName="fa-solid fa-xmark" />
                </button>
              </div>

              <div className="modal-body-metaverse">
                <p className="modal-bio">{metaverseZones.about.summary}</p>

                <div className="highlights-box">
                  <h5>핵심 강점 및 역량</h5>
                  <ul>
                    {metaverseZones.about.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="links-row">
                  {metaverseZones.about.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-metaverse-link"
                    >
                      <FaIcon iconName={link.icon} /> {link.label}
                    </a>
                  ))}
                </div>

                <div className="modal-footer-action">
                  <button
                    className="btn-doc-transition"
                    onClick={() => handleSwitchToClassicDoc("about")}
                  >
                    <FaIcon iconName="fa-solid fa-file-lines" /> 클래식 소개 문서 보기
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* 2. Experience & Education Modal */}
      {selectedZone?.id === "experience" &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="full-metaverse-modal" onClick={() => setSelectedZone(null)}>
            <div className="modal-dialog-metaverse" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-metaverse" style={{ "--border-color": "#38bdf8" }}>
                <div>
                  <span className="modal-tag">CAREER & EDUCATION</span>
                  <h3>직무 경력 및 학력 아카이브</h3>
                  <span className="modal-sub">실무 프로젝트 및 융합 학력 여정</span>
                </div>
                <button className="btn-close-metaverse" onClick={() => setSelectedZone(null)}>
                  <FaIcon iconName="fa-solid fa-xmark" />
                </button>
              </div>

              <div className="modal-body-metaverse">
                {metaverseZones.experience.items.map((exp, idx) => (
                  <div className="experience-card-item" key={idx}>
                    <div className="item-header">
                      <div>
                        <h4>{exp.company}</h4>
                        <span className="item-role">{exp.role}</span>
                      </div>
                      <span className="item-period">{exp.period}</span>
                    </div>

                    <div className="item-projects">
                      {exp.projects.map((p, pIdx) => (
                        <div className="proj-block" key={pIdx}>
                          <strong>• {p.title || p}</strong>
                          {p.desc && <p>{p.desc}</p>}
                        </div>
                      ))}
                    </div>

                    <div className="stack-chips-row">
                      {exp.stack.map((s) => (
                        <span key={s} className="stack-chip">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="modal-footer-action">
                  <button
                    className="btn-doc-transition"
                    onClick={() => handleSwitchToClassicDoc("experience")}
                  >
                    <FaIcon iconName="fa-solid fa-timeline" /> 클래식 경력 타임라인 보기
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* 3. Skills & Capabilities Modal */}
      {selectedZone?.id === "skills" &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="full-metaverse-modal" onClick={() => setSelectedZone(null)}>
            <div className="modal-dialog-metaverse" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-metaverse" style={{ "--border-color": "#a855f7" }}>
                <div>
                  <span className="modal-tag">ENGINEERING SKILLS</span>
                  <h3>핵심 기술 역량 & 최적화</h3>
                  <span className="modal-sub">프로덕트 중심의 엔지니어링 역량과 최적화 패턴</span>
                </div>
                <button className="btn-close-metaverse" onClick={() => setSelectedZone(null)}>
                  <FaIcon iconName="fa-solid fa-xmark" />
                </button>
              </div>

              <div className="modal-body-metaverse">
                <div className="skills-grid-dialog">
                  {capabilities.map((c) => (
                    <div className="skill-box-dialog" key={c.title}>
                      <div className="box-top">
                        <FaIcon iconName={c.icon} />
                        <h4>{c.title}</h4>
                      </div>
                      <span className="stack-label">{c.stack}</span>
                      <ul>
                        {c.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="optimization-preview-box">
                  <h5>프로젝트 전반의 최적화 패턴</h5>
                  <div className="mini-chart-wrap">
                    <Bar
                      data={{
                        labels: optimizationChart.labels,
                        datasets: [
                          {
                            label: "적용 프로젝트 수",
                            data: optimizationChart.values,
                            backgroundColor: "rgba(168, 85, 247, 0.75)",
                            borderColor: "#a855f7",
                            borderWidth: 1.5,
                            borderRadius: 6,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: "y",
                        scales: {
                          x: { beginAtZero: true, ticks: { precision: 0, color: "#94a3b8" } },
                          y: { ticks: { color: "#cbd5e1" } },
                        },
                        plugins: { legend: { display: false } },
                      }}
                    />
                  </div>
                </div>

                <div className="modal-footer-action">
                  <button
                    className="btn-doc-transition"
                    onClick={() => handleSwitchToClassicDoc("skills")}
                  >
                    <FaIcon iconName="fa-solid fa-chart-line" /> 클래식 기술 문서 보기
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* 4. Projects Directory Modal */}
      {selectedZone?.id === "projects" &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="full-metaverse-modal" onClick={() => setSelectedZone(null)}>
            <div className="modal-dialog-metaverse" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-metaverse" style={{ "--border-color": "#f59e0b" }}>
                <div>
                  <span className="modal-tag">PROJECT EXPO</span>
                  <h3>11개 프로젝트 엑스포 디렉터리</h3>
                  <span className="modal-sub">부스를 클릭하면 해당 프로젝트로 텔레포트합니다</span>
                </div>
                <button className="btn-close-metaverse" onClick={() => setSelectedZone(null)}>
                  <FaIcon iconName="fa-solid fa-xmark" />
                </button>
              </div>

              <div className="modal-body-metaverse">
                <div className="project-expo-list">
                  {projects.map((proj, idx) => (
                    <div
                      className="expo-item-card"
                      key={proj.id}
                      onClick={() => {
                        setSelectedZone(null);
                        handleTeleportProject(proj);
                      }}
                    >
                      <div className="expo-item-left">
                        <span className="expo-index">{String(idx + 1).padStart(2, "0")}</span>
                        <div>
                          <strong>{proj.title}</strong>
                          <span className="expo-type">{proj.type}</span>
                        </div>
                      </div>
                      <button className="btn-visit-booth">
                        부스 방문 <FaIcon iconName="fa-solid fa-arrow-right" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="modal-footer-action">
                  <button
                    className="btn-doc-transition"
                    onClick={() => handleSwitchToClassicDoc("portfolio")}
                  >
                    <FaIcon iconName="fa-solid fa-folder-open" /> 클래식 프로젝트 전체 목록 보기
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* 5. Contact & Portal Modal */}
      {selectedZone?.id === "contact" &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="full-metaverse-modal" onClick={() => setSelectedZone(null)}>
            <div className="modal-dialog-metaverse" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-metaverse" style={{ "--border-color": "#ec4899" }}>
                <div>
                  <span className="modal-tag">CONTACT PORTAL</span>
                  <h3>연락처 및 소셜 네트워크</h3>
                  <span className="modal-sub">언제든 편하게 연락해 주세요</span>
                </div>
                <button className="btn-close-metaverse" onClick={() => setSelectedZone(null)}>
                  <FaIcon iconName="fa-solid fa-xmark" />
                </button>
              </div>

              <div className="modal-body-metaverse">
                <div className="contact-methods-grid">
                  <a href={`tel:${metaverseZones.contact.phone.replace(/-/g, "")}`} className="contact-card">
                    <FaIcon iconName="fa-solid fa-phone" />
                    <div>
                      <small>전화번호</small>
                      <strong>{metaverseZones.contact.phone}</strong>
                    </div>
                  </a>

                  <a href={`mailto:${metaverseZones.contact.email}`} className="contact-card">
                    <FaIcon iconName="fa-solid fa-envelope" />
                    <div>
                      <small>이메일</small>
                      <strong>{metaverseZones.contact.email}</strong>
                    </div>
                  </a>

                  <a href={metaverseZones.contact.github} target="_blank" rel="noreferrer" className="contact-card">
                    <FaIcon iconName="fa-brands fa-github" />
                    <div>
                      <small>GitHub</small>
                      <strong>github.com/ohofront</strong>
                    </div>
                  </a>

                  <a href={metaverseZones.contact.blog} target="_blank" rel="noreferrer" className="contact-card">
                    <FaIcon iconName="fa-solid fa-pen-nib" />
                    <div>
                      <small>기술 블로그</small>
                      <strong>medium.com/@youngho7482</strong>
                    </div>
                  </a>
                </div>

                <div className="modal-footer-action">
                  <button
                    className="btn-doc-transition"
                    onClick={() => handleSwitchToClassicDoc("contact")}
                  >
                    <FaIcon iconName="fa-solid fa-paper-plane" /> 클래식 문의 폼 보기
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* 6. Selected Project Detail Modal */}
      {selectedProject &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="full-metaverse-modal" onClick={() => setSelectedProject(null)}>
            <div className="modal-dialog-metaverse" onClick={(e) => e.stopPropagation()}>
              <div
                className="modal-header-metaverse"
                style={{ "--border-color": selectedProject.metaverseZone?.color || "#10b981" }}
              >
                <div>
                  <span className="modal-tag">{selectedProject.type}</span>
                  <h3>{selectedProject.title}</h3>
                  <span className="modal-sub">{selectedProject.period}</span>
                </div>
                <button className="btn-close-metaverse" onClick={() => setSelectedProject(null)}>
                  <FaIcon iconName="fa-solid fa-xmark" />
                </button>
              </div>

              <div className="modal-body-metaverse">
                <p className="modal-bio">{selectedProject.summary}</p>
                <p className="project-role-text">
                  <b>담당 역할:</b> {selectedProject.role}
                </p>

                {/* Direct Links */}
                <div className="links-row">
                  {selectedProject.links?.map((link) => (
                    <a
                      key={link.label}
                      href={link.disabled ? undefined : link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`btn-metaverse-link ${link.disabled ? "disabled" : ""}`}
                    >
                      <FaIcon iconName={link.icon} /> {link.label}
                    </a>
                  ))}
                </div>

                {/* Quick Metrics */}
                {selectedProject.metrics && (
                  <div className="metrics-box-grid">
                    {selectedProject.metrics.map((m) => (
                      <div className="metric-cell" key={m.label}>
                        <span className="cell-label">{m.label}</span>
                        <div className="cell-values">
                          <span className="val-before">{m.before}</span>
                          <FaIcon iconName="fa-solid fa-arrow-right" />
                          <span className="val-after">{m.after}</span>
                        </div>
                        <span className="cell-change">{m.change}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Stack Chips */}
                <div className="stack-chips-row">
                  {selectedProject.stack?.map((tech) => (
                    <span key={tech} className="stack-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="modal-footer-action">
                  <button
                    className="btn-doc-transition"
                    onClick={() => handleSwitchToClassicDoc("portfolio", selectedProject.id)}
                  >
                    <FaIcon iconName="fa-solid fa-chart-simple" /> 클래식 문서에서 전체 그래프 및 상세 분석 보기
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
